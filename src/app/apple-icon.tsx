import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const manrope = await readFile(join(process.cwd(), "src/fonts/Manrope-Bold.ttf"));
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#000" }}>
        <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 116, letterSpacing: -5, color: "#e8e4d9", lineHeight: 1, marginTop: -14 }}>l.</div>
      </div>
    ),
    { ...size, fonts: [{ name: "Manrope", data: manrope, weight: 700, style: "normal" }] },
  );
}
