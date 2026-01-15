import type { Metadata } from "next";
import localFont from "next/font/local";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

// Pretendard 가변 폰트 (로컬)
const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

// Playfair Display (Google Fonts - 영문 타이틀용)
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "남악 센트레빌 아스테리움 | 분양 안내",
  description:
    "전남 목포시 남악신도시 프리미엄 아파트. 59㎡, 84㎡ 다양한 평형, 합리적인 분양가. 상담 예약 및 모델하우스 안내.",
  keywords:
    "남악 센트레빌, 남악신도시 분양, 목포 아파트, 센트레빌 아스테리움, 남악 분양",
  openGraph: {
    title: "남악 센트레빌 아스테리움 | 2026년 입주",
    description: "남악신도시의 새로운 랜드마크. 프리미엄 주거의 새로운 기준.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable} ${playfair.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
