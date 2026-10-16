import type { Metadata } from "next";
import { book } from "@/lib/site";
import { breadcrumbs, webPage } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { BookForm } from "@/components/forms/BookForm";

export const metadata: Metadata = {
  title: "Book",
  description: book.metaDescription,
  alternates: { canonical: "/book/" },
  openGraph: { url: "/book/", title: "Book • Lagom", description: book.metaDescription },
};

export default function BookPage() {
  return (
    <div className="body-div">
      <PageHero title={book.title} text={book.intro} variant="contact">
        <BookForm />
      </PageHero>
      <JsonLd data={[webPage("WebPage", "Book • Lagom", "/book/", book.metaDescription), breadcrumbs([{ name: "Book", path: "/book/" }])]} />
    </div>
  );
}
