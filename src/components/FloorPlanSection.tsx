'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const floorPlans = [
    {
        type: '59㎡A',
        units: 140,
        exclusive: '59.71㎡',
        supply: '84.42㎡',
        contract: '114.67㎡',
        description: '효율적인 공간설계, 품격있는 디자인',
        features: ['3Bay 구조', '팬트리 공간', '드레스룸'],
    },
    {
        type: '59㎡B',
        units: 10,
        exclusive: '59.71㎡',
        supply: '84.00㎡',
        contract: '114.25㎡',
        description: '짜임새 있는 활용도, 실속과 품격',
        features: ['효율적 동선', '넓은 거실', '수납공간'],
    },
    {
        type: '84㎡A',
        units: 880,
        exclusive: '84.72㎡',
        supply: '110.84㎡',
        contract: '153.77㎡',
        description: '자연의 감성과 도시의 감각이 깃든 공간',
        features: ['4Bay 구조', '침실 통합형 가능', '알파룸'],
        popular: true,
    },
    {
        type: '84㎡B',
        units: 228,
        exclusive: '84.98㎡',
        supply: '111.46㎡',
        contract: '154.51㎡',
        description: '가족의 편의를 고려한 스마트한 공간',
        features: ['4Bay 구조', '침실 통합형 가능', '넓은 주방'],
    },
];

export default function FloorPlanSection() {
    const [activeTab, setActiveTab] = useState(2); // 84A가 기본
    const sectionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                sectionRef.current,
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        if (!contentRef.current) return;
        gsap.fromTo(
            contentRef.current,
            { opacity: 0, x: 20 },
            { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }
        );
    }, [activeTab]);

    const activePlan = floorPlans[activeTab];

    return (
        <section
            ref={sectionRef}
            className="py-24 md:py-32 bg-gradient-to-b from-[#1C2536] to-[#0F1C2E]"
        >
            <div className="container-custom">
                {/* 섹션 타이틀 */}
                <div className="text-center mb-12">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-sm font-semibold mb-4">
                        FLOOR PLAN
                    </span>
                    <h2 className="section-title text-white">
                        다양한 <span className="text-gradient-gold">평형 안내</span>
                    </h2>
                    <p className="section-subtitle mx-auto mt-4 text-white/60">
                        59㎡부터 84㎡까지, 라이프스타일에 맞는 평형을 선택하세요
                    </p>
                </div>

                {/* 탭 버튼 */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {floorPlans.map((plan, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveTab(index)}
                            className={`relative px-6 py-3 rounded-full font-semibold transition-all duration-300 ${activeTab === index
                                    ? 'bg-[#D4AF37] text-[#1C2536]'
                                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                                }`}
                        >
                            {plan.type}
                            {plan.popular && (
                                <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-red-500 text-white text-[10px] rounded-full">
                                    BEST
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* 평형 정보 카드 */}
                <div
                    ref={contentRef}
                    className="max-w-4xl mx-auto bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10"
                >
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* 왼쪽: 정보 */}
                        <div>
                            <div className="flex items-center gap-4 mb-6">
                                <span className="text-4xl md:text-5xl font-bold text-[#D4AF37]">
                                    {activePlan.type}
                                </span>
                                <span className="px-3 py-1 bg-white/10 text-white/80 rounded-full text-sm">
                                    {activePlan.units}세대
                                </span>
                            </div>

                            <p className="text-white/80 text-lg mb-8">
                                {activePlan.description}
                            </p>

                            {/* 면적 정보 */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-3 border-b border-white/10">
                                    <span className="text-white/60">전용면적</span>
                                    <span className="text-white font-semibold">{activePlan.exclusive}</span>
                                </div>
                                <div className="flex justify-between items-center py-3 border-b border-white/10">
                                    <span className="text-white/60">공급면적</span>
                                    <span className="text-white font-semibold">{activePlan.supply}</span>
                                </div>
                                <div className="flex justify-between items-center py-3 border-b border-white/10">
                                    <span className="text-white/60">계약면적</span>
                                    <span className="text-white font-semibold">{activePlan.contract}</span>
                                </div>
                            </div>
                        </div>

                        {/* 오른쪽: 특징 & CTA */}
                        <div className="flex flex-col justify-between">
                            <div>
                                <h4 className="text-white font-semibold mb-4">주요 특징</h4>
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {activePlan.features.map((feature, idx) => (
                                        <span
                                            key={idx}
                                            className="px-4 py-2 bg-[#D4AF37]/20 text-[#D4AF37] rounded-full text-sm font-medium"
                                        >
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <button className="btn-primary w-full">
                                {activePlan.type} 상담 신청하기
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
