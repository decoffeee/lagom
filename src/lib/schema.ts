import { SITE_URL, site, type Room } from "./site";

const org = {
  "@type": ["Organization", "LodgingBusiness"],
  "@id": `${SITE_URL}/#organization`,
  name: site.name,
  url: SITE_URL,
  logo: `${SITE_URL}/icon`,
  image: `${SITE_URL}/opengraph-image`,
  email: site.email,
  telephone: site.phone,
  sameAs: [site.instagram, site.facebook, ...site.platforms.map((p) => p.href)].filter(Boolean),
  areaServed: "Kathmandu, Nepal",
  knowsLanguage: site.languages,
  ...(site.address.city
    ? {
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address.street,
          addressLocality: site.address.city,
          addressRegion: site.address.region,
          postalCode: site.address.postalCode,
          addressCountry: site.address.country,
        },
      }
    : {}),
};

export const siteGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: site.name,
      alternateName: `${site.name} Airbnb`,
      description: site.description,
      url: SITE_URL,
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    org,
  ],
};

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}

export function vacationRental(room: Room, images: string[]) {
  const num = (label: string) => Number(room.specs.find((s) => s.label.startsWith(label))?.value.replace(/[^0-9]/g, "") ?? 0);
  const path = `/rooms/${room.slug}/`;
  return {
    "@context": "https://schema.org",
    "@type": "VacationRental",
    "@id": `${SITE_URL}${path}#rental`,
    name: `${site.name} ${room.kind}`,
    url: `${SITE_URL}${path}`,
    description: room.metaDescription,
    image: images,
    brand: { "@id": `${SITE_URL}/#organization` },
    address: { "@type": "PostalAddress", addressLocality: site.address.city, addressRegion: site.address.region, addressCountry: site.address.country },
    containsPlace: {
      "@type": "Accommodation",
      name: room.kind,
      occupancy: { "@type": "QuantitativeValue", minValue: 1, maxValue: room.maxGuests },
      ...(num("bedroom") ? { numberOfBedrooms: num("bedroom") } : {}),
      ...(num("bathroom") ? { numberOfBathroomsTotal: num("bathroom") } : {}),
      amenityFeature: room.amenities.map((a) => ({ "@type": "LocationFeatureSpecification", name: a.label, value: true })),
    },
  };
}

export function webPage(type: string, name: string, path: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${SITE_URL}${path}#webpage`,
    name,
    url: `${SITE_URL}${path}`,
    description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    inLanguage: "en",
  };
}
