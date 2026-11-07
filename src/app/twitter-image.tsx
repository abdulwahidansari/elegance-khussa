import { ImageResponse } from "next/og";

export const alt = "The Elegance Khussa: handmade Pakistani khussa for women";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 80, background: "linear-gradient(135deg, #e8d9bc, #faf6ef)", color: "#3b2a20" }}>
        <div style={{ display: "flex", fontSize: 32, marginBottom: 24, color: "#6b564a" }}>The Elegance Khussa</div>
        <div style={{ display: "flex", fontSize: 88, lineHeight: 1.05 }}>Pakistani Khussa for Brides and Beyond</div>
      </div>
    ),
    { ...size },
  );
}
