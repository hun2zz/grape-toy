'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const features = [
    {
        icon: (
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        title: '영산강 리버뷰',
        description: '강변이 파노라마뷰로 펼쳐지는 특별한 조망. 수변공원과 연결된 산책로에서 여유로운 일상을 즐기세요.',
        highlights: ['강변 파노라마뷰', '수변공원 연결', '자전거도로'],
    },
    {
        icon: (
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
        ),
        title: '프리미엄 커뮤니티',
        description: '휘트니스, 골프연습장, 도서관까지. 명품 커뮤니티로 입주민의 행복지수를 높입니다.',
        highlights: ['휘트니스 & GX룸', '스크린골프', '작은도서관'],
    },
    {
        icon: (
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        title: '어린이 특화 시설',
        description: '100명 규모 단지 내 어린이집과 키즈그라운드. 아이들의 건강한 성장을 위한 특별한 공간.',
        highlights: ['단지 내 어린이집', '키즈그라운드', '키즈팜'],
    },
    {
        icon: (
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
        title: '스마트홈 시스템',
        description: '전라도 최초 KT 인공지능 홈서비스. IoT 기반 첨단 스마트홈으로 편리한 생활.',
        highlights: ['AI 홈서비스', '원격검침', '전기차충전소'],
    },
];

export default function PremiumSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // 타이틀 애니메이션
            gsap.fromTo(
                titleRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );

            // 카드 stagger 애니메이션
            if (cardsRef.current) {
                gsap.fromTo(
                    cardsRef.current.children,
                    { opacity: 0, y: 60 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.7,
                        stagger: 0.15,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: cardsRef.current,
                            start: 'top 80%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="py-24 md:py-32 bg-[#FDFCFA]"
        >
            <div className="container-custom">
                {/* 섹션 타이틀 */}
                <div ref={titleRef} className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[#D4AF37]/10 text-[#B8960C] text-sm font-semibold mb-4">
                        PREMIUM
                    </span>
                    <h2 className="section-title text-[#1C2536]">
                        센트레빌만의 <span className="text-gradient-gold">특별함</span>
                    </h2>
                    <p className="section-subtitle mx-auto mt-4">
                        남악을 대표하는 프리미엄 라이프스타일을 경험하세요
                    </p>
                </div>

                {/* 특장점 카드 */}
                <div
                    ref={cardsRef}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group card bg-white hover:bg-gradient-to-br hover:from-[#1C2536] hover:to-[#2C3E50] transition-all duration-500"
                        >
                            {/* 아이콘 */}
                            <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] mb-5 group-hover:bg-[#D4AF37]/20 transition-colors">
                                {feature.icon}
                            </div>

                            {/* 타이틀 */}
                            <h3 className="text-xl font-bold text-[#1C2536] mb-3 group-hover:text-white transition-colors">
                                {feature.title}
                            </h3>

                            {/* 설명 */}
                            <p className="text-[#6B7280] text-sm leading-relaxed mb-5 group-hover:text-white/80 transition-colors">
                                {feature.description}
                            </p>

                            {/* 하이라이트 태그 */}
                            <div className="flex flex-wrap gap-2">
                                {feature.highlights.map((highlight, idx) => (
                                    <span
                                        key={idx}
                                        className="text-xs px-3 py-1 rounded-full bg-[#F3F4F6] text-[#4B5563] group-hover:bg-white/10 group-hover:text-white/90 transition-colors"
                                    >
                                        {highlight}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
