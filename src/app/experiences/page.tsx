import type { Metadata } from "next";
import { experiences } from "@/lib/site";
import { breadcrumbs, webPage } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Parallax } from "@/components/Parallax";

export const metadata: Metadata = {
  title: "Experiences",
  description: experiences.metaDescription,
  alternates: { canonical: "/experiences/" },
  openGraph: { url: "/experiences/", title: "Experiences • Lagom", description: experiences.metaDescription },
};

function Info({ s }: { s: (typeof experiences.sections)[number] }) {
  return (
    <div className="block exp-info">
      <h2 className="exp-title">{s.title}</h2>
      {s.paragraphs.map((p, i) => (
        <div className="exp-text rich" key={i}>
          <p>{p}</p>
        </div>
      ))}
    </div>
  );
}

export default function ExperiencesPage() {
  const [first, second, third] = experiences.sections;
  return (
    <div className="body-div">
      <PageHero title={experiences.title} text={experiences.intro} />

      <section className="section exp-section">
        <div className="container exp-ct">
          <div className="block exp-imgs">
            <Parallax image={first.images[0]} orientation="down" className="exp-img" priority />
            <Parallax image={first.images[1]} orientation="up" className="exp-img is-offset" />
          </div>
          <Info s={first} />
        </div>
      </section>

      <section className="section exp-banner-sc">
        <Parallax image={experiences.banner} orientation="up" className="exp-banner" sizes="100vw" />
      </section>

      <section className="section exp-section is-video-sc">
        <div className="container exp-ct">
          <Info s={second} />
          <div className="block exp-imgs">
            <Parallax image={second.images[0]} orientation="down" className="exp-img" />
            <Parallax image={second.images[1]} orientation="up" className="exp-img is-offset" />
          </div>
        </div>
      </section>

      <section className="section exp-section is-last">
        <div className="container exp-ct">
          <div className="block exp-imgs">
            <Parallax image={third.images[0]} orientation="down" className="exp-img" />
            <Parallax image={third.images[1]} orientation="up" className="exp-img is-offset" />
          </div>
          <Info s={third} />
        </div>
      </section>

      <JsonLd data={[webPage("WebPage", "Experiences • Lagom", "/experiences/", experiences.metaDescription), breadcrumbs([{ name: "Experiences", path: "/experiences/" }])]} />
    </div>
  );
}
