import HeroSection from "@/components/HeroSection";
import PremiumSection from "@/components/PremiumSection";
import LifestyleSection from "@/components/LifestyleSection";
import FloorPlanSection from "@/components/FloorPlanSection";
import CommunitySection from "@/components/CommunitySection";
import FaqSection from "@/components/FaqSection";
import { faqs } from "@/lib/faqs";
import ContactSection from "@/components/ContactSection";
import FloatingActionBar from "@/components/FloatingActionBar";
import ConsultationModal from "@/components/ConsultationModal";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.answer,
    },
  })),
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <HeroSection />
      <PremiumSection />
      <LifestyleSection />
      <FloorPlanSection />
      <CommunitySection />
      <FaqSection />
      <ContactSection />
      <FloatingActionBar />
      <ConsultationModal />

      {/* 푸터 */}
      <footer className="bg-[#0D1520] text-white/60 py-14">
        <div className="container-custom text-center">
          <div className="text-2xl font-bold text-white mb-3">
            남악 <span className="text-[#D4AF37]">센트레빌 리버파크</span>
          </div>
          <p className="text-sm mb-8">
            전남 목포시 남악신도시 | 30개동 1,258세대
          </p>

          {/* 분양문의 전화번호 - 큰 CTA */}
          <a
            href="tel:061-982-3033"
            aria-label="분양문의 전화: 061-982-3033"
            className="group inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-5 px-8 py-5 mb-8 rounded-2xl transition-transform hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.18) 0%, rgba(255, 255, 255, 0.05) 100%)',
              border: '1.5px solid rgba(212, 175, 55, 0.45)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35)',
            }}
          >
            <span className="flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[#D4AF37] font-semibold">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              분양문의
            </span>
            <span
              className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-wider tabular-nums"
              style={{ textShadow: '0 0 18px rgba(212, 175, 55, 0.4)' }}
            >
              061-982-3033
            </span>
          </a>

          <div className="text-sm text-white/50 mb-4">
            시행: 한국토지신탁
          </div>
          <p className="text-xs text-white/40 leading-relaxed">
            본 홍보물의 내용은 개발계획 변경 등으로 실제와 다를 수 있으니 계약 시 반드시 확인하시기 바랍니다.
          </p>
        </div>
      </footer>
    </main>
  );
}
