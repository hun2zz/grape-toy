'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function HeroSection() {
    const heroRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!heroRef.current) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            // 배지 애니메이션
            tl.fromTo(
                badgeRef.current,
                { opacity: 0, y: -30, scale: 0.8 },
                { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.7)' }
            );

            // 타이틀 애니메이션
            tl.fromTo(
                titleRef.current,
                { opacity: 0, y: 80 },
                { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out' },
                '-=0.4'
            );

            // 서브타이틀
            tl.fromTo(
                subtitleRef.current,
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 0.8 },
                '-=0.6'
            );

            // 스탯
            if (statsRef.current) {
                const statItems = statsRef.current.children;
                tl.fromTo(
                    statItems,
                    { opacity: 0, y: 30, scale: 0.9 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.6,
                        stagger: 0.1,
                        ease: 'back.out(1.5)'
                    },
                    '-=0.4'
                );
            }

            // CTA 버튼들
            tl.fromTo(
                ctaRef.current?.children || [],
                { opacity: 0, y: 30, scale: 0.9 },
                { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15, ease: 'back.out(1.5)' },
                '-=0.3'
            );
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={heroRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* 배경 이미지 */}
            <div className="absolute inset-0">
                {/* 실제 배경 이미지 */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: 'url(/images/background.png)',
                    }}
                />
                {/* 어두운 오버레이 - 글씨 가독성을 위해 더 진하게 */}
                <div className="absolute inset-0 bg-black/70" />
                {/* 컬러 그라데이션 오버레이 */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0F1C2E]/50 via-transparent to-[#0F1C2E]/80" />
            </div>

            {/* 사이드 장식 */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden lg:block">
                <div className="flex flex-col items-center gap-4 px-6">
                    <div className="w-px h-20 bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent" />
                    <span className="text-xs tracking-widest text-white/50 rotate-90 origin-center whitespace-nowrap">
                        CENTREVILLE RIVERPARK
                    </span>
                    <div className="w-px h-20 bg-gradient-to-b from-[#D4AF37] via-transparent to-transparent" />
                </div>
            </div>

            {/* 콘텐츠 */}
            <div className="container-custom relative z-10 text-center text-white px-6 py-20">
                {/* 배지 */}
                <div
                    ref={badgeRef}
                    className="inline-flex items-center gap-3 px-6 py-3 rounded-full mb-8"
                    style={{
                        opacity: 0,
                        background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.3) 0%, rgba(255, 255, 255, 0.15) 100%)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(212, 175, 55, 0.4)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                    }}
                >
                    <span className="flex items-center gap-2">
                        <span className="relative w-2.5 h-2.5">
                            <span className="absolute inset-0 rounded-full bg-[#D4AF37] animate-ping opacity-75" />
                            <span className="absolute inset-0 rounded-full bg-[#D4AF37]" />
                        </span>
                        <span className="text-sm font-bold tracking-wide text-[#D4AF37]">
                            30개동 1,258세대 대단지
                        </span>
                    </span>
                    <span className="w-px h-4 bg-white/40" />
                    <span className="text-sm font-semibold text-white">
                        🎉 선착순 동호지정
                    </span>
                </div>

                {/* 메인 타이틀 */}
                <h1
                    ref={titleRef}
                    className="mb-6"
                    style={{ opacity: 0 }}
                >
                    <span className="block text-lg md:text-xl font-medium text-white/80 mb-3 tracking-widest">
                        영산강이 흐르는 남악의 중심
                    </span>
                    <span className="block text-4xl md:text-6xl lg:text-7xl font-bold mb-3 text-white drop-shadow-lg">
                        남악
                    </span>
                    <span
                        className="block text-5xl md:text-7xl lg:text-8xl font-bold"
                        style={{
                            background: 'linear-gradient(135deg, #D4AF37 0%, #F5E6C8 25%, #D4AF37 50%, #B8960C 75%, #D4AF37 100%)',
                            backgroundSize: '200% auto',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            animation: 'shimmerText 3s linear infinite',
                            filter: 'drop-shadow(0 4px 20px rgba(212, 175, 55, 0.5))'
                        }}
                    >
                        센트레빌 리버파크
                    </span>
                </h1>

                {/* 서브타이틀 */}
                <p
                    ref={subtitleRef}
                    className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-12 leading-relaxed"
                    style={{ opacity: 0, textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
                >
                    전남 목포시 남악신도시, 강변조망과 수변공원을 품은
                    <br className="hidden md:block" />
                    <span className="text-white font-semibold">프리미엄 주거의 새로운 기준</span>
                </p>

                {/* 스탯 바 */}
                <div
                    ref={statsRef}
                    className="flex flex-wrap justify-center gap-8 md:gap-12 mb-14"
                >
                    {[
                        { value: '30', unit: '개동', accent: true },
                        { value: '1,258', unit: '세대', accent: true },
                        { value: '59~84', unit: '㎡', accent: false },
                        { value: '4', unit: '평형 타입', accent: false },
                    ].map((stat, idx) => (
                        <div
                            key={idx}
                            className="text-center group"
                            style={{ opacity: 0 }}
                        >
                            <div
                                className={`text-4xl md:text-5xl font-bold mb-1 transition-transform group-hover:scale-110 ${stat.accent ? 'text-[#D4AF37]' : 'text-white'
                                    }`}
                                style={{
                                    textShadow: stat.accent
                                        ? '0 0 30px rgba(212, 175, 55, 0.6)'
                                        : '0 2px 10px rgba(0,0,0,0.5)'
                                }}
                            >
                                {stat.value}
                            </div>
                            <div className="text-sm text-white/70 tracking-wide font-medium">{stat.unit}</div>
                        </div>
                    ))}
                </div>

                {/* CTA 버튼 */}
                <div
                    ref={ctaRef}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <button
                        className="group relative min-w-[220px] px-8 py-4 rounded-full font-bold text-white overflow-hidden transition-all hover:scale-105"
                        style={{
                            opacity: 0,
                            background: 'linear-gradient(135deg, #D4AF37 0%, #B8960C 100%)',
                            boxShadow: '0 10px 40px rgba(212, 175, 55, 0.5)'
                        }}
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            상담 예약하기
                        </span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </button>
                    <button
                        className="group min-w-[220px] px-8 py-4 rounded-full font-bold text-white transition-all hover:scale-105 hover:bg-white/20"
                        style={{
                            opacity: 0,
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            border: '2px solid rgba(255, 255, 255, 0.3)',
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
                        }}
                    >
                        <span className="flex items-center justify-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            홍보관 안내
                        </span>
                    </button>
                </div>
            </div>

            {/* 스크롤 인디케이터 */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10">
                <div className="flex flex-col items-center gap-3">
                    <span className="text-xs tracking-[0.3em] uppercase text-white/60 font-medium">Scroll</span>
                    <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2 backdrop-blur-sm">
                        <div className="w-1.5 h-3 bg-[#D4AF37] rounded-full animate-bounce" />
                    </div>
                </div>
            </div>

            {/* 하단 그라데이션 페이드 */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FDFCFA] to-transparent pointer-events-none" />

            {/* CSS 애니메이션 */}
            <style jsx>{`
                @keyframes shimmerText {
                    0% { background-position: 0% center; }
                    100% { background-position: 200% center; }
                }
            `}</style>
        </section>
    );
}
