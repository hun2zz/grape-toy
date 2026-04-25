import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #0D1520 0%, #1a2332 50%, #2a3547 100%)",
          color: "#D4AF37",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontWeight: 900,
            letterSpacing: -4,
            lineHeight: 1,
            background:
              "linear-gradient(135deg, #D4AF37 0%, #F5E6C8 50%, #B8960C 100%)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          센
        </div>
        <div
          style={{
            fontSize: 14,
            letterSpacing: 3,
            color: "rgba(212, 175, 55, 0.8)",
            marginTop: 8,
          }}
        >
          RIVERPARK
        </div>
      </div>
    ),
    { ...size }
  );
}
