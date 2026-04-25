import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "남악 센트레빌 리버파크 분양 안내";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background:
            "linear-gradient(135deg, #0D1520 0%, #1a2332 55%, #2a3547 100%)",
          color: "#ffffff",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: 8,
            color: "#D4AF37",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          CENTREVILLE RIVERPARK
        </div>
        <div
          style={{
            fontSize: 96,
            fontWeight: 800,
            lineHeight: 1.1,
            textAlign: "center",
            marginBottom: 32,
          }}
        >
          남악 <span style={{ color: "#D4AF37" }}>센트레빌</span> 리버파크
        </div>
        <div
          style={{
            fontSize: 36,
            color: "rgba(255,255,255,0.85)",
            textAlign: "center",
            marginBottom: 48,
          }}
        >
          남악신도시의 새로운 랜드마크
        </div>
        <div
          style={{
            display: "flex",
            gap: 40,
            fontSize: 28,
            color: "rgba(255,255,255,0.7)",
          }}
        >
          <span>30개동 1,258세대</span>
          <span style={{ color: "#D4AF37" }}>|</span>
          <span>59㎡ · 84㎡</span>
          <span style={{ color: "#D4AF37" }}>|</span>
          <span>2026년 입주</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
