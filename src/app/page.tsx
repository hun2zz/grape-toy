import HeroSection from "@/components/HeroSection";
import PremiumSection from "@/components/PremiumSection";
import FloorPlanSection from "@/components/FloorPlanSection";
import CommunitySection from "@/components/CommunitySection";
import ContactSection from "@/components/ContactSection";
import FloatingActionBar from "@/components/FloatingActionBar";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <PremiumSection />
      <FloorPlanSection />
      <CommunitySection />
      <ContactSection />
      <FloatingActionBar />

      {/* 푸터 */}
      <footer className="bg-[#0D1520] text-white/60 py-12">
        <div className="container-custom text-center">
          <div className="text-2xl font-bold text-white mb-4">
            남악 <span className="text-[#D4AF37]">센트레빌 리버파크</span>
          </div>
          <p className="text-sm mb-6">
            전남 목포시 남악신도시 | 30개동 1,258세대
          </p>
          <div className="flex justify-center gap-6 text-sm">
            <span>시행: 한국토지신탁</span>
            <span>|</span>
            <span>분양문의: 1588-0000</span>
          </div>
          <p className="text-xs mt-8 text-white/40">
            본 홍보물의 내용은 개발계획 변경 등으로 실제와 다를 수 있으니 계약 시 반드시 확인하시기 바랍니다.
          </p>
        </div>
      </footer>
    </main>
  );
}
