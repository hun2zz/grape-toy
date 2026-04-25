import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "상담 예약",
  description:
    "남악 센트레빌 리버파크 방문 상담 예약. 원하는 평형과 입주 시기를 남기시면 담당 분양 상담사가 연락드립니다.",
  alternates: {
    canonical: "/consultation",
  },
  openGraph: {
    title: "상담 예약 | 남악 센트레빌 리버파크",
    description:
      "남악 센트레빌 리버파크 방문 상담 예약. 담당 분양 상담사가 직접 안내합니다.",
    url: "/consultation",
  },
};

export default function ConsultationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
