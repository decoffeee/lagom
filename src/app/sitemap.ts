import type { MetadataRoute } from "next";
import { SITE_URL, rooms } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1, freq: "monthly" },
    ...rooms.map((r) => ({ path: `/rooms/${r.slug}/`, priority: 0.9, freq: "monthly" as const })),
    { path: "/experiences/", priority: 0.7, freq: "monthly" },
    { path: "/reviews/", priority: 0.6, freq: "monthly" },
    { path: "/book/", priority: 0.8, freq: "yearly" },
    { path: "/contact/", priority: 0.6, freq: "yearly" },
    { path: "/privacy-policy/", priority: 0.2, freq: "yearly" },
  ];
  return entries.map((e) => ({ url: `${SITE_URL}${e.path}`, lastModified: now, changeFrequency: e.freq, priority: e.priority }));
}
