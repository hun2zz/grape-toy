'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const facilities = [
    {
        image: '/images/kids-station.webp',
        title: '센트레가든 · 키즈스테이션',
        description: '놀이와 자연이 어우러진 단지 중심 공간. 아이들의 건강한 성장을 위한 특별한 놀이터.',
        highlights: ['키즈스테이션', '센트레가든', '워터플레이'],
    },
    {
        image: '/images/back1.webp',
        title: '영산강 리버뷰',
        description: '강변이 파노라마뷰로 펼쳐지는 특별한 조망. 수변공원과 연결된 산책로에서 여유로운 일상을 즐기세요.',
        highlights: ['강변 파노라마뷰', '수변공원 연결', '자전거도로'],
    },
    {
        image: '/images/frairy-station.webp',
        title: '요정마을 놀이터',
        description: '동화 속 세상을 구현한 테마형 어린이 놀이터.',
        highlights: ['테마 놀이터', '안전 설계'],
    },
    {
        image: '/images/bike-station.webp',
        title: '바이크스테이션',
        description: '입주민 전용 자전거 보관 및 정비 공간.',
        highlights: ['자전거 보관', '정비 공간'],
    },
    {
        image: '/images/buddigue-garden.webp',
        title: '부띠끄가든',
        description: '아름다운 조경과 놀이가 함께하는 프리미엄 야외 커뮤니티 공간.',
        highlights: ['테마 정원', '야외 놀이', '조경 특화'],
    },
];

function FacilityCard({ facility, className }: { facility: typeof facilities[0]; className?: string }) {
    return (
        <div className={`relative overflow-hidden rounded-2xl group cursor-pointer ${className || ''}`}>
            <Image
                src={facility.image}
                alt={`${facility.title} - ${facility.description}`}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C2536]/90 via-[#1C2536]/30 to-transparent" />
            <div className="relative z-10 flex flex-col justify-end h-full p-5 md:p-6">
                <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                    {facility.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed mb-3 line-clamp-2">
                    {facility.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                    {facility.highlights.map((h, i) => (
                        <span
                            key={i}
                            className="text-xs px-2.5 py-1 rounded-full bg-white/15 text-white/90 backdrop-blur-sm"
                        >
                            {h}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function PremiumSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
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

            if (gridRef.current) {
                const cards = gridRef.current.querySelectorAll('[data-card]');
                gsap.fromTo(
                    cards,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.7,
                        stagger: 0.12,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: gridRef.current,
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
            id="premium"
            aria-label="프리미엄 커뮤니티 시설"
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

                {/* 특별혜택 배너 */}
                <div className="mb-12 relative overflow-hidden rounded-3xl shadow-[0_24px_70px_-15px_rgba(212,175,55,0.55)]">
                    {/* 골드 배경 */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#E8CD7A] via-[#D4AF37] to-[#B8960C]" />
                    {/* 광택 장식 */}
                    <div className="absolute -top-24 -right-16 w-80 h-80 rounded-full bg-white/25 blur-3xl" />
                    <div className="absolute -bottom-32 -left-10 w-72 h-72 rounded-full bg-[#1C2536]/15 blur-3xl" />

                    <div className="relative z-10 p-7 md:p-12">
                        {/* 헤드라인 */}
                        <div className="text-center mb-7 md:mb-9">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-[#1C2536] text-[#E8CD7A] text-[11px] md:text-xs font-bold tracking-[0.25em] mb-3 shadow-md">
                                SPECIAL BENEFIT
                            </span>
                            <h3 className="text-2xl md:text-4xl font-extrabold text-[#1C2536] leading-tight">
                                입주지원금 <span className="whitespace-nowrap">3대 특별혜택</span>
                            </h3>
                            <p className="mt-2.5 text-[#1C2536]/75 text-sm md:text-lg font-semibold">
                                계약 고객님께 드리는 단지 한정 혜택
                            </p>
                        </div>

                        {/* 혜택 3종 카드 */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 md:gap-5">
                            {[
                                { icon: '🔨', title: '리모델링 지원', desc: '입주 전 인테리어 비용 지원' },
                                { icon: '🏛️', title: '취득세 지원', desc: '취득세 부담을 덜어드립니다' },
                                { icon: '🚚', title: '이사비 지원', desc: '이사 비용 지원 혜택' },
                            ].map((benefit, idx) => (
                                <div
                                    key={idx}
                                    className="group relative bg-[#1C2536] rounded-2xl px-5 py-6 md:py-7 text-center shadow-lg transition-transform duration-300 hover:-translate-y-1.5"
                                >
                                    <div className="flex items-center justify-center w-14 h-14 mx-auto mb-3 rounded-full bg-[#D4AF37]/15 text-3xl">
                                        {benefit.icon}
                                    </div>
                                    <h4 className="text-lg md:text-xl font-bold text-white mb-1.5">
                                        {benefit.title}
                                    </h4>
                                    <p className="text-[#E8CD7A] text-xs md:text-sm leading-relaxed">
                                        {benefit.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 벤토 그리드 */}
                <div ref={gridRef} className="flex flex-col gap-4">
                    {/* 상단: 히어로(kids-station) + 우측 2단 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {/* 좌: kids-station — 세로형(~4:5) 이미지라 세로로 크게 */}
                        <div data-card>
                            <FacilityCard
                                facility={facilities[0]}
                                className="h-[300px] lg:h-full"
                            />
                        </div>

                        {/* 우: 2단 구성 */}
                        <div className="flex flex-col gap-4">
                            {/* 상: 영산강 리버뷰 — 가로형(~3:2) */}
                            <div data-card>
                                <FacilityCard
                                    facility={facilities[1]}
                                    className="h-[220px] lg:h-[240px]"
                                />
                            </div>
                            {/* 하: 요정마을 + 바이크 — 둘 다 가로형(~3:2) */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div data-card>
                                    <FacilityCard
                                        facility={facilities[2]}
                                        className="h-[200px]"
                                    />
                                </div>
                                <div data-card>
                                    <FacilityCard
                                        facility={facilities[3]}
                                        className="h-[200px]"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 하단: 부띠끄가든 — 파노라마(~3:1) 이미지라 풀와이드 배너 */}
                    <div data-card>
                        <FacilityCard
                            facility={facilities[4]}
                            className="h-[200px] lg:h-[240px]"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
