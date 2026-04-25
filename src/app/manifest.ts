import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "남악 센트레빌 리버파크",
    short_name: "센트레빌 리버파크",
    description:
      "전남 목포시 남악신도시 프리미엄 아파트. 30개동 1,258세대, 59·84㎡ 분양 안내.",
    start_url: "/",
    display: "standalone",
    background_color: "#0D1520",
    theme_color: "#0D1520",
    lang: "ko-KR",
    orientation: "portrait",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
