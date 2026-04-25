import type { Metadata, Viewport } from "next";
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

const SITE_URL = "https://xn--q20bo4d2xe81gg3a43jswic52a.kr";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "남악 센트레빌 리버파크 | 분양 안내",
    template: "%s | 남악 센트레빌 리버파크",
  },
  description:
    "전남 목포시 남악신도시 프리미엄 아파트. 59㎡, 84㎡ 다양한 평형, 합리적인 분양가. 상담 예약 및 홍보관 안내.",
  keywords: [
    "남악 센트레빌",
    "남악 센트레빌 리버파크",
    "남악신도시 분양",
    "목포 아파트",
    "남악 분양",
    "목포 신축 아파트",
    "센트레빌 리버파크",
    "남악 아파트 분양",
  ],
  applicationName: "남악 센트레빌 리버파크",
  authors: [{ name: "한국토지신탁" }],
  creator: "한국토지신탁",
  publisher: "한국토지신탁",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    siteName: "남악 센트레빌 리버파크",
    title: "남악 센트레빌 리버파크 | 2026년 입주",
    description:
      "남악신도시의 새로운 랜드마크. 30개동 1,258세대, 59·84㎡ 프리미엄 주거의 새로운 기준.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "남악 센트레빌 리버파크 분양 안내",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "남악 센트레빌 리버파크 | 2026년 입주",
    description:
      "남악신도시의 새로운 랜드마크. 30개동 1,258세대, 프리미엄 주거의 새로운 기준.",
    images: ["/opengraph-image"],
  },
  category: "real estate",
  formatDetection: {
    telephone: true,
    address: true,
    email: false,
  },
  // verification: {
  //   google: "여기에 Search Console 인증 코드 입력",
  //   other: { "naver-site-verification": "여기에 네이버 인증 코드 입력" },
  // },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0D1520" },
    { media: "(prefers-color-scheme: dark)", color: "#0D1520" },
  ],
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "남악 센트레빌 리버파크",
      inLanguage: "ko-KR",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "한국토지신탁",
      url: SITE_URL,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+82-61-982-1538",
        contactType: "sales",
        areaServed: "KR",
        availableLanguage: ["Korean"],
      },
    },
    {
      "@type": "ApartmentComplex",
      "@id": `${SITE_URL}/#apartment`,
      name: "남악 센트레빌 리버파크",
      url: SITE_URL,
      description:
        "전남 목포시 남악신도시 프리미엄 아파트. 30개동 1,258세대, 59·84㎡ 다양한 평형.",
      numberOfAccommodationUnits: 1258,
      address: {
        "@type": "PostalAddress",
        addressCountry: "KR",
        addressRegion: "전라남도",
        addressLocality: "목포시",
        streetAddress: "남악신도시",
      },
      telephone: "+82-61-982-1538",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable} ${playfair.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
