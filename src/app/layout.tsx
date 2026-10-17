import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SITE_URL, site } from "@/lib/site";
import { siteGraph } from "@/lib/schema";
import { Loader } from "@/components/Loader";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Cursor } from "@/components/Cursor";
import { SmoothScroll } from "@/components/SmoothScroll";
import { JsonLd } from "@/components/JsonLd";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

const manrope = localFont({
  variable: "--font-manrope",
  display: "swap",
  src: [
    { path: "../fonts/Manrope-ExtraLight.ttf", weight: "100 200", style: "normal" },
    { path: "../fonts/Manrope-Light.ttf", weight: "300", style: "normal" },
    { path: "../fonts/Manrope-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/Manrope-Medium.ttf", weight: "500", style: "normal" },
    { path: "../fonts/Manrope-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../fonts/Manrope-Bold.ttf", weight: "700", style: "normal" },
    { path: "../fonts/Manrope-ExtraBold.ttf", weight: "800 900", style: "normal" },
  ],
});

const melodrama = localFont({
  variable: "--font-melodrama",
  display: "swap",
  src: [
    { path: "../fonts/Melodrama-Light.woff2", weight: "100 300", style: "normal" },
    { path: "../fonts/Melodrama-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/Melodrama-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/Melodrama-Semibold.woff2", weight: "600", style: "normal" },
    { path: "../fonts/Melodrama-Bold.woff2", weight: "700 900", style: "normal" },
  ],
});

/** Used only by the "Lagom Airbnb" title in the centre of the header. */
const plantagenet = localFont({
  variable: "--font-plantagenet",
  display: "swap",
  src: [{ path: "../fonts/PlantagenetCherokee.ttf", weight: "400", style: "normal" }],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${site.name} • ${site.tagline}`, template: `%s • ${site.name}` },
  description: site.description,
  applicationName: site.name,
  keywords: site.keywords,
  authors: [{ name: site.name, url: SITE_URL }],
  creator: site.name,
  publisher: site.name,
  category: "travel",
  alternates: { canonical: "/", languages: { en: "/" } },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    url: "/",
    title: `${site.name} • ${site.tagline}`,
    description: site.description,
  },
  twitter: { card: "summary_large_image", title: `${site.name} • ${site.tagline}`, description: site.description },
  other: { "dc.title": `${site.name} • ${site.tagline}`, "dc.language": "en", "geo.region": "NP-BA", "geo.placename": "Kathmandu" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#e8e4d9",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${manrope.variable} ${melodrama.variable} ${plantagenet.variable}`}>
      <body>
        <a className="skip-link" href="#content">
          Skip to main content
        </a>
        <a className="skip-link" href="#site-footer">
          Skip to footer
        </a>
        <Loader />
        <Header />
        <main id="content">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <Cursor />
        <SmoothScroll />
        <JsonLd data={siteGraph} />
      </body>
    </html>
  );
}
