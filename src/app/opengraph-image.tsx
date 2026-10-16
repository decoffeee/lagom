import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/lib/site";

export const alt = `${site.name} • ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const [manrope, plantagenet] = await Promise.all([
    readFile(join(process.cwd(), "src/fonts/Manrope-Bold.ttf")),
    readFile(join(process.cwd(), "src/fonts/PlantagenetCherokee.ttf")),
  ]);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#e8e4d9", padding: 64, color: "#000" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
          <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 56, letterSpacing: -3, lineHeight: 1 }}>{site.logo}</div>
          <div style={{ fontFamily: "Manrope", fontSize: 16, lineHeight: 1 }}>{site.mark}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 88, letterSpacing: -5, lineHeight: 1 }}>there is no place like</div>
          <div style={{ fontFamily: "Plantagenet", fontWeight: 400, fontSize: 190, lineHeight: 0.95, marginTop: 10, fontStyle: "italic" }}>home.</div>
        </div>
        <div style={{ fontFamily: "Manrope", fontSize: 24, opacity: 0.7 }}>{site.tagline}</div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Manrope", data: manrope, weight: 700, style: "normal" },
        { name: "Plantagenet", data: plantagenet, weight: 400, style: "normal" },
      ],
    },
  );
}
