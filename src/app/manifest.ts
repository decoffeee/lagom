import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} • ${site.tagline}`,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#e8e4d9",
    theme_color: "#e8e4d9",
    icons: [
      { src: "/icon", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
