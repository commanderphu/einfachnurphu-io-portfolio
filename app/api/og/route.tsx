import { ImageResponse } from "next/og";

// ✅ Umstellen auf nodejs oder Zeile ganz entfernen
export const runtime = "nodejs";  

async function loadFontFromPublic(req: Request) {
  try {
    const origin = new URL(req.url).origin;
    const fontUrl = `${origin}/fonts/JetBrainsMono-Bold.ttf`;
    const res = await fetch(fontUrl, { cache: "force-cache" });
    if (!res.ok) return null;
    const ct = res.headers.get("content-type") || "";
    if (!/font|octet-stream/.test(ct)) return null;
    return await res.arrayBuffer();
  } catch {
    return null;
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "einfachnurphu.io";
  const subtitle = searchParams.get("subtitle") || "";

  const fontData = await loadFontFromPublic(req);

  return new ImageResponse(
    (
      <div style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0e0e0f",
        padding: 48,
        position: "relative",
      }}>
        <div style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(800px 300px at 10% -10%, rgba(255,145,0,0.25), transparent 60%), radial-gradient(700px 260px at 90% 0%, rgba(255,145,0,0.12), transparent 60%)",
        }} />
        <div style={{ fontSize: 64, fontWeight: 800, color: "white" }}>{title}</div>
        {subtitle && (
          <div style={{ fontSize: 36, color: "rgba(255,255,255,.8)" }}>{subtitle}</div>
        )}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          color: "white",
          fontSize: 28,
          opacity: 0.85,
        }}>
          <span>Joshua Phu Bein</span>
          <span style={{ color: "#ff9100" }}>einfachnurphu.io</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: fontData
        ? [{ name: "JetBrains Mono", data: fontData, style: "normal", weight: 700 }]
        : [],
    }
  );
}
