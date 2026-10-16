import type { Metadata } from "next";
import { home, site } from "@/lib/site";
import { webPage } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { HomeScroll } from "@/components/home/HomeScroll";
import { HomeHero } from "@/components/home/HomeHero";
import { Deco } from "@/components/home/Deco";
import { Gallery } from "@/components/home/Gallery";
import { Amenities } from "@/components/home/Amenities";

export const metadata: Metadata = {
  title: { absolute: home.title },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: { url: "/", title: home.title, description: site.description },
};

export default function HomePage() {
  return (
    <HomeScroll>
      <HomeHero />
      <Deco />
      <Gallery />
      <Amenities />
      <JsonLd data={webPage("WebPage", home.title, "/", site.description)} />
    </HomeScroll>
  );
}
