// app/api/og/route.tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Font laden wie vorher – dein Originalstil
async function loadFont() {
  try {
    const fontUrl = new URL(
      "../../../public/fonts/JetBrainsMono-Bold.ttf",
      import.meta.url
    );
    const res = await fetch(fontUrl);
    if (!res.ok) throw new Error("Font not found");
    return await res.arrayBuffer();
  } catch {
    return null;
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "einfachnurphu.io";
  const subtitle = searchParams.get("subtitle") || "";
  const icon = searchParams.get("icon") || "🦊";

  const fontData = await loadFont();

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0e0e0f",
          padding: "64px 72px",
          fontFamily: "JetBrains Mono, monospace",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(800px 300px at 10% -10%, rgba(255,145,0,0.22), transparent 70%), radial-gradient(900px 360px at 90% 20%, rgba(255,145,0,0.10), transparent 70%)",
          }}
        />

        <div
          style={{
            fontSize: 80,
            color: "#ff9100",
            marginBottom: 16,
            zIndex: 10,
            textShadow: "0 0 25px rgba(255,145,0,0.25)",
          }}
        >
          {icon}
        </div>

        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            lineHeight: 1.1,
            color: "#f0f0f0",
            zIndex: 10,
            maxWidth: "90%",
            textShadow: "0 0 25px rgba(255,145,0,0.15)",
          }}
        >
          {title}
        </div>

        {subtitle ? (
          <div
            style={{
              fontSize: 40,
              color: "rgba(255,255,255,0.75)",
              marginTop: 8,
              zIndex: 10,
              maxWidth: "80%",
            }}
          >
            {subtitle}
          </div>
        ) : null}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#e6e6e6",
            fontSize: 28,
            letterSpacing: 0.5,
            opacity: 0.85,
            zIndex: 10,
            marginTop: "auto",
            borderTop: "2px solid rgba(255,255,255,0.05)",
            paddingTop: 24,
          }}
        >
          <span style={{ fontWeight: 500 }}>Joshua Phu</span>
          <span style={{ color: "#ff9100", fontWeight: 700 }}>
            einfachnurphu.io
          </span>
        </div>
      </div>
    ),
    {
      width: size.width,
      height: size.height,
      fonts: fontData
        ? [
            {
              name: "JetBrains Mono",
              data: fontData,
              style: "normal",
              weight: 700,
            },
          ]
        : [],
    }
  );
}
