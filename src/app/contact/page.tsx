import type { Metadata } from "next";
import { contact } from "@/lib/site";
import { breadcrumbs, webPage } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: contact.metaDescription,
  alternates: { canonical: "/contact/" },
  openGraph: { url: "/contact/", title: "Contact • Lagom", description: contact.metaDescription },
};

export default function ContactPage() {
  return (
    <div className="body-div">
      <PageHero title={contact.title} text={contact.intro} variant="contact">
        <ContactForm />
      </PageHero>
      <JsonLd data={[webPage("ContactPage", "Contact • Lagom", "/contact/", contact.metaDescription), breadcrumbs([{ name: "Contact", path: "/contact/" }])]} />
    </div>
  );
}
