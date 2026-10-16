import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE_URL, roomBySlug, rooms, site } from "@/lib/site";
import { IMAGES } from "@/lib/images";
import { breadcrumbs, vacationRental } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { RoomHero } from "@/components/room/RoomHero";
import { GalleryPreview } from "@/components/room/GalleryPreview";
import { AmenitiesCard } from "@/components/room/AmenitiesCard";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return rooms.map((r) => ({ slug: r.slug }));
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const room = roomBySlug(slug);
  if (!room) return {};
  const title = `${room.kind} • ${site.name}`;
  return {
    title: { absolute: title },
    description: room.metaDescription,
    alternates: { canonical: `/rooms/${room.slug}/` },
    openGraph: { url: `/rooms/${room.slug}/`, title, description: room.metaDescription },
  };
}

export default async function RoomPage({ params }: Props) {
  const { slug } = await params;
  const room = roomBySlug(slug);
  if (!room) notFound();
  const images = [room.images.hero, room.images.main, ...room.images.grid].map((k) => `${SITE_URL}${IMAGES[k].src.src}`);
  return (
    <div className="body-div">
      <RoomHero room={room} />

      <section className="section apart-spec-sc">
        <div className="container apart-spec-ct" role="list" aria-label="Key facts">
          {room.specs.map((s) => (
            <div className="apart-spec-bl" key={s.label} role="listitem">
              <div className="apart-spec-nb">{s.value}</div>
              <div className="apart-spec-title">{s.label}</div>
            </div>
          ))}
        </div>
        <GalleryPreview room={room} />
      </section>

      <section className="section apart-text-sc">
        <div className="container">
          <h2 className="apart-text-title">{room.storyTitle}</h2>
        </div>
        <div className="container two-col">
          <div className="block">
            <div className="apart-text-info rich">
              {room.story.left.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <div className="block spaced">
            <div className="apart-text-info rich">
              {room.story.right.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section apart-text-sc">
        <div className="container two-col">
          <AmenitiesCard room={room} />
          <div className="block apart-map-col">
            <div className="apart-map">
              <iframe
                title={`Map showing the location of ${site.legalName}`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&z=16&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section reg-sc">
        <div className="container reg-ct">
          <div className="reg-pill">
            Officially registered as <strong>{site.legalName}</strong>
          </div>
        </div>
      </section>

      <JsonLd data={[vacationRental(room, images), breadcrumbs([{ name: room.kind, path: `/rooms/${room.slug}/` }])]} />
    </div>
  );
}
