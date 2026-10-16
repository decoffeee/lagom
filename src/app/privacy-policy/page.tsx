import type { Metadata } from "next";
import { privacy, site } from "@/lib/site";
import { breadcrumbs, webPage } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: privacy.metaDescription,
  alternates: { canonical: "/privacy-policy/" },
  openGraph: { url: "/privacy-policy/", title: "Privacy Policy • Lagom", description: privacy.metaDescription },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <div className="body-div">
      <PageHero title={privacy.title} text={privacy.intro} />
      <section className="section prose-sc">
        <div className="container">
          <div className="prose">
            <h2>What we collect</h2>
            <p>
              When you contact us or send a reservation request, we collect the details you type into the form: your name, email address, phone number, your
              message and, for reservations, your preferred dates and number of guests.
            </p>
            <h2>How we use it</h2>
            <p>We use these details only to reply to you, to confirm availability and to manage your stay. We do not sell or share them with third parties for marketing.</p>
            <h2>How long we keep it</h2>
            <p>Messages are kept for as long as needed to handle your request and for a reasonable period afterwards for bookkeeping, then deleted.</p>
            <h2 id="cookies">Cookies</h2>
            <p>
              This site does not use advertising or tracking cookies. Only technically necessary storage is used to make the site work. Embedded maps may set
              their own cookies according to Google&apos;s policies.
            </p>
            <h2>Your rights</h2>
            <p>
              You can ask us at any time to see, correct or delete the personal information we hold about you. Write to{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
          </div>
        </div>
      </section>
      <JsonLd data={[webPage("WebPage", "Privacy Policy • Lagom", "/privacy-policy/", privacy.metaDescription), breadcrumbs([{ name: "Privacy Policy", path: "/privacy-policy/" }])]} />
    </div>
  );
}
