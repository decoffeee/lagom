# Deploying the Lagom website

This is a Next.js 16 app. It needs a host that runs **Node.js**. A plain static host (GitHub Pages, S3, shared
Apache hosting) will not work, because these features need a server:

- **Booking form** (`/book/`): a server action that emails each request (see [Email](#email-for-booking-requests)).
- **Image optimization**: photos are resized and converted to AVIF or WebP on demand.
- **Generated files**: `sitemap.xml`, the Open Graph and Twitter share images, and the favicon.

The contact form does not need the server. It opens WhatsApp in the visitor's browser.

## Requirements

| | |
| --- | --- |
| Node.js | 20.9 or newer (22 LTS or 24 recommended; built and tested on 24) |
| Package manager | npm (use the committed `package-lock.json`) |
| Memory | 1 GB RAM is enough to build; the server itself needs about 200–300 MB |
| Disk | about 500 MB for `node_modules` and the build, plus the image cache |

## Environment variables

Copy `.env.example` to `.env.local` on a server, or enter the same keys in your host's dashboard.

| Variable | Required | What it does |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | **Yes** | The public address with `https://` and no trailing slash, e.g. `https://lagom-stay.com`. Used for canonical links, the sitemap, robots.txt and share previews. |
| `RESEND_API_KEY` | **Yes, for bookings** | API key from [resend.com](https://resend.com). Without it, booking requests are **only written to the server log and nobody is emailed**. |
| `CONTACT_TO` | No | Inbox that receives booking requests. Defaults to `lagomairbnb@gmail.com`. |
| `CONTACT_FROM` | Recommended | Sender address, e.g. `Lagom <bookings@lagom-stay.com>`. Its domain must be verified in Resend. |

> **`NEXT_PUBLIC_SITE_URL` is fixed at build time.** If you change it, run the build again. Restarting is not enough.

## Option A: Vercel (easiest)

1. Sign in at [vercel.com](https://vercel.com) and choose **Add New → Project**.
2. Import the GitHub repository `decoffeee/lagom`. Vercel detects Next.js, so leave the build settings at their defaults.
3. Under **Environment Variables**, add the variables listed above for the *Production* environment.
4. Click **Deploy**.
5. In **Settings → Domains**, add the real domain. Then create the DNS records Vercel shows you at your domain
   registrar.
6. If the domain differs from what you entered for `NEXT_PUBLIC_SITE_URL`, correct the variable and redeploy.

From then on, every push to `main` deploys automatically.

## Option B: your own server (VPS)

These steps are for Ubuntu or Debian with Nginx in front of the app. Run them as a normal user with `sudo` rights.

### 1. Install Node.js and get the code

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs git nginx

git clone https://github.com/decoffeee/lagom.git ~/lagom
cd ~/lagom
cp .env.example .env.local
nano .env.local            # fill in the values from the table above
```

### 2. Build

```bash
npm ci                     # installs dependencies, including sharp for images
npm run build
```

Always run `npm ci` **on the server itself**. Do not copy `node_modules` from a Mac or Windows machine: the image
library (`sharp`) is platform-specific and image requests will fail. Do not pass `--omit=optional`, which also
leaves out `sharp`.

### 3. Keep it running with systemd

Create `/etc/systemd/system/lagom.service`. Replace `deploy` with your Linux user name:

```ini
[Unit]
Description=Lagom website
After=network.target

[Service]
User=deploy
WorkingDirectory=/home/deploy/lagom
Environment=NODE_ENV=production
Environment=PORT=3000
ExecStart=/usr/bin/npm start
Restart=always

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now lagom
curl -I http://localhost:3000/      # expect HTTP/1.1 200 OK
```

### 4. Nginx and HTTPS

Create `/etc/nginx/sites-available/lagom`:

```nginx
server {
    server_name lagom-stay.com www.lagom-stay.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_buffering off;    # pages stream; buffering slows the first paint
    }

    client_max_body_size 2m;
}
```

```bash
sudo ln -s /etc/nginx/sites-available/lagom /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d lagom-stay.com -d www.lagom-stay.com
```

### 5. Updating later

```bash
cd ~/lagom
git pull
npm ci
npm run build
sudo systemctl restart lagom
```

The site keeps serving the old version until the restart, so the downtime is a few seconds.

## Option C: Docker (Render, Fly.io, Railway, Google Cloud Run, …)

The repository has no Dockerfile yet. This one works as is. Save it as `Dockerfile` in the project root:

```dockerfile
FROM node:22-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
RUN npm run build

FROM node:22-slim
WORKDIR /app
ENV NODE_ENV=production PORT=3000
COPY --from=build /app ./
EXPOSE 3000
CMD ["npm", "start"]
```

```bash
docker build --build-arg NEXT_PUBLIC_SITE_URL=https://lagom-stay.com -t lagom .
docker run -d -p 3000:3000 \
  -e RESEND_API_KEY=... -e CONTACT_FROM="Lagom <bookings@lagom-stay.com>" \
  --restart unless-stopped lagom
```

`NEXT_PUBLIC_SITE_URL` must be passed as a **build argument**, because it is fixed at build time. The other
variables are read at runtime.

## Email for booking requests

1. Create a free account at [resend.com](https://resend.com).
2. Under **Domains**, add the site's domain and create the DNS records Resend shows you. Wait until the domain is
   shown as *Verified*.
3. Create an API key and set it as `RESEND_API_KEY`.
4. Set `CONTACT_FROM` to an address on the verified domain, e.g. `Lagom <bookings@lagom-stay.com>`.

Until a domain is verified, Resend only delivers to the email address of the Resend account owner.

## Check after every deploy

- [ ] The home page, all five room pages (`/rooms/deluxe/`, `/rooms/studio/`, `/rooms/1bk/`, `/rooms/2bhk/`,
      `/rooms/presidential-suite/`), `/experiences/`, `/reviews/`, `/book/` and `/contact/` load.
- [ ] Room photos appear, and the walkthrough video plays on a room page, including on an iPhone.
- [ ] Send a test request from `/book/` and confirm it arrives in the `CONTACT_TO` inbox.
- [ ] The contact form and the green WhatsApp button open a chat with +977 9708097322.
- [ ] `https://<domain>/sitemap.xml` lists URLs on the real domain, not `localhost` or a preview address.
- [ ] Pasting the domain into WhatsApp or Facebook shows the share preview image.

First launch only: add the domain to [Google Search Console](https://search.google.com/search-console) and submit
`https://<domain>/sitemap.xml`.

## Troubleshooting

| Problem | Cause and fix |
| --- | --- |
| Booking form says "sent" but no email arrives | `RESEND_API_KEY` is missing (requests are only logged; check with `journalctl -u lagom`), or the `CONTACT_FROM` domain is not verified in Resend. |
| Photos don't load (errors on `/_next/image`) | `sharp` is missing or was installed for another platform. Delete `node_modules` and run `npm ci` on the server. |
| Sitemap or share previews show the wrong domain | `NEXT_PUBLIC_SITE_URL` was wrong when the site was built. Fix it, then build again and restart. |
| Pages appear only after a long blank pause behind Nginx | Response buffering is on. Make sure `proxy_buffering off;` is in the Nginx config. |
| Build stops with "JavaScript heap out of memory" | The server has too little RAM. Add swap, or build with `NODE_OPTIONS=--max-old-space-size=2048 npm run build`. |

## Good to know

- **Photos in the repo:** the `src/images/rooms/` and `public/rooms/` folders hold compressed copies of the room
  photos and videos. The full-size originals are deliberately not in git and are not needed to deploy.
- **Image cache:** optimized images are cached in `.next/cache/images`. On Docker or other hosts with a
  temporary disk, the cache starts empty after each redeploy. The site still works; the first visitors after a
  deploy just wait slightly longer for each photo.
- **One server is enough:** for this site's traffic, one instance is plenty. If you run several instances behind a
  load balancer, each keeps its own cache, which is fine for this site.
