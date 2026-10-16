import type { Metadata } from "next";
import { experiences, type Place, type Section } from "@/lib/experiences";
import { breadcrumbs, webPage } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Parallax } from "@/components/Parallax";
import { YouTube } from "@/components/YouTube";
import { Lightbox } from "@/components/Lightbox";
import { IMAGES } from "@/lib/images";
import Image from "next/image";
import { AnysideButton } from "@/components/AnysideButton";

export const metadata: Metadata = {
  title: "Experiences",
  description: experiences.metaDescription,
  alternates: { canonical: "/experiences/" },
  openGraph: { url: "/experiences/", title: "Experiences • Lagom", description: experiences.metaDescription },
};

function Info({ s }: { s: Section }) {
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

function Images({ s, priority = false }: { s: Section; priority?: boolean }) {
  const credits = s.images.map((k) => IMAGES[k].credit).filter((c): c is NonNullable<typeof c> => !!c);
  return (
    <div className="block exp-imgs-wrap">
      <div className="block exp-imgs">
        <Parallax image={s.images[0]} orientation="down" className="exp-img" priority={priority} />
        <Parallax image={s.images[1]} orientation="up" className="exp-img is-offset" />
      </div>
      {credits.length > 0 && (
        <p className="exp-credits">
          Photos:{" "}
          {credits.map((c, i) => (
            <span key={c.page}>
              <a href={c.page} target="_blank" rel="noopener noreferrer">
                {c.artist}
              </a>{" "}
              (
              <a href={c.licenseUrl} target="_blank" rel="noopener noreferrer">
                {c.license}
              </a>
              ){i < credits.length - 1 ? ", " : ""}
            </span>
          ))}
        </p>
      )}
    </div>
  );
}

function PlaceList({ title, items, columns = 2 }: { title?: string; items: Place[]; columns?: 2 | 3 }) {
  return (
    <div className="block exp-list-wrap">
      {title && <h3 className="exp-list-title">{title}</h3>}
      <ul className={`exp-list cols-${columns}`}>
        {items.map((p) => (
          <li className="exp-item" key={p.name}>
            <div className="exp-item-head">
              <h4 className="exp-item-name">{p.name}</h4>
              {p.meta && <span className="exp-item-meta">{p.meta}</span>}
            </div>
            <p className="exp-item-text">
              {p.text}
              {p.link && (
                <>
                  {" "}
                  <a href={p.link.href} target="_blank" rel="noopener noreferrer" className="exp-link">
                    {p.link.label}
                  </a>
                </>
              )}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Videos({ videos }: { videos: NonNullable<Section["videos"]> }) {
  return (
    <div className={`block exp-videos count-${videos.length}`}>
      {videos.map((v) => (
        <YouTube key={v.id} video={v} />
      ))}
    </div>
  );
}

/** Captioned photo grid that opens in the PhotoSwipe lightbox, with Creative Commons credits. */
function Gallery({ id, items }: { id: string; items: NonNullable<Section["gallery"]> }) {
  const credits = items.map((g) => ({ key: g.image, ...IMAGES[g.image].credit })).filter((c) => c.artist);
  return (
    <div className="block exp-gallery-wrap">
      <ul id={id} className="exp-gallery">
        {items.map((g) => {
          const im = IMAGES[g.image];
          return (
            <li key={g.image}>
              <figure>
                <a href={im.src.src} data-pswp-width={im.src.width} data-pswp-height={im.src.height} target="_blank" rel="noreferrer" aria-label={`Open photo: ${im.alt}`} className="exp-gallery-link">
                  <span className="exp-gallery-img">
                    <Image src={im.src} alt={im.alt} sizes="(max-width: 767px) 50vw, 33vw" placeholder="blur" />
                  </span>
                </a>
                <figcaption className="exp-gallery-cap">{g.caption}</figcaption>
              </figure>
            </li>
          );
        })}
      </ul>
      <Lightbox gallery={`#${id}`} />
      {credits.length > 0 && (
        <p className="exp-credits">
          Photos:{" "}
          {credits.map((c, i) => (
            <span key={c.key}>
              <a href={c.page} target="_blank" rel="noopener noreferrer">
                {c.artist}
              </a>{" "}
              (
              <a href={c.licenseUrl} target="_blank" rel="noopener noreferrer">
                {c.license}
              </a>
              ){i < credits.length - 1 ? ", " : ""}
            </span>
          ))}{" "}
          via Wikimedia Commons.
        </p>
      )}
    </div>
  );
}

/** One themed chapter: images + copy, then the detail list and videos below. */
function Chapter({ s, flip = false, priority = false, last = false }: { s: Section; flip?: boolean; priority?: boolean; last?: boolean }) {
  return (
    <section className={`section exp-section ${last ? "is-last" : ""}`.trim()} id={s.id}>
      <div className={`container exp-ct ${flip ? "is-flip" : ""}`.trim()}>
        <Images s={s} priority={priority} />
        <Info s={s} />
      </div>
      {s.list && (
        <div className="container exp-detail">
          <PlaceList title={s.listTitle} items={s.list} />
        </div>
      )}
      {s.gallery && (
        <div className="container exp-detail">
          <Gallery id={`${s.id}-gallery`} items={s.gallery} />
        </div>
      )}
      {s.videos && (
        <div className="container exp-detail">
          <Videos videos={s.videos} />
        </div>
      )}
    </section>
  );
}

export default function ExperiencesPage() {
  const [stupa, hill, trails, city, food] = experiences.sections;
  const { facts, eat, calendar, tips, sources } = experiences;
  return (
    <div className="body-div">
      <PageHero title={experiences.title} text={experiences.intro}>
        <div className="container exp-facts exp-intro-anim flicker">
          {facts.map((f) => (
            <div className="block exp-fact" key={f.label}>
              <div className="exp-fact-value">{f.value}</div>
              <div className="exp-fact-label">{f.label}</div>
            </div>
          ))}
        </div>
      </PageHero>

      <Chapter s={stupa} priority />

      <section className="section exp-banner-sc">
        <Parallax image={experiences.banner} orientation="up" className="exp-banner" sizes="100vw" />
      </section>

      <Chapter s={hill} flip />
      <Chapter s={trails} />
      <Chapter s={city} flip />

      <Chapter s={food} />
      <section className="section exp-section exp-eat-sc" id="eat">
        <div className="container exp-detail">
          <h3 className="exp-list-title">{eat.title}</h3>
          <div className="block exp-eat">
            {eat.groups.map((g) => (
              <div className="block exp-eat-group" key={g.title}>
                <div className="exp-eat-head">{g.title}</div>
                <PlaceList items={g.places} columns={3} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section exp-section exp-cal-sc" id="calendar">
        <div className="container exp-cal-ct">
          <div className="block exp-info">
            <h2 className="exp-title">{calendar.title}</h2>
            <div className="exp-text rich">
              <p>{calendar.intro}</p>
            </div>
          </div>
          <ol className="exp-cal">
            {calendar.items.map((c) => (
              <li className="exp-cal-item" key={c.name}>
                <span className="exp-cal-when">{c.when}</span>
                <div className="block">
                  <span className="exp-item-name">{c.name}</span>
                  <p className="exp-item-text">{c.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section exp-section is-last" id="tips">
        <div className="container exp-cal-ct">
          <div className="block exp-info">
            <h2 className="exp-title">{tips.title}</h2>
          </div>
          <PlaceList items={tips.items} />
        </div>
        <div className="container exp-detail">
          <div className="block exp-sources">
            <div className="exp-eat-head">{sources.title}</div>
            <ul className="exp-sources-list">
              {sources.items.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="container cta-ct exp-cta">
          <div className="block" style={{ alignItems: "center" }}>
            <AnysideButton href="/book/">Book Now</AnysideButton>
          </div>
        </div>
      </section>

      <JsonLd data={[webPage("WebPage", "Experiences • Lagom", "/experiences/", experiences.metaDescription), breadcrumbs([{ name: "Experiences", path: "/experiences/" }])]} />
    </div>
  );
}
