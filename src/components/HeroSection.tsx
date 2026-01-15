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
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 0.6 }
            );

            // 타이틀 애니메이션
            tl.fromTo(
                titleRef.current,
                { opacity: 0, y: 60 },
                { opacity: 1, y: 0, duration: 1 },
                '-=0.3'
            );

            // 서브타이틀
            tl.fromTo(
                subtitleRef.current,
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 0.8 },
                '-=0.5'
            );

            // 스탯
            tl.fromTo(
                statsRef.current?.children || [],
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
                '-=0.4'
            );

            // CTA 버튼들
            tl.fromTo(
                ctaRef.current?.children || [],
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 },
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
            {/* 배경 - 영산강 느낌의 블루/그린 그라데이션 */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0F1C2E] via-[#1A3A4A] to-[#0D2818]">
                {/* 물결 패턴 오버레이 */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23D4AF37' fill-opacity='0.3' d='M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,186.7C960,213,1056,235,1152,218.7C1248,203,1344,149,1392,122.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E")`,
                        backgroundRepeat: 'repeat-x',
                        backgroundPosition: 'bottom',
                        backgroundSize: '100% 200px',
                    }}
                />
                {/* 골드 그라데이션 악센트 */}
                <div className="absolute top-0 right-0 w-1/2 h-1/2 opacity-20 bg-gradient-to-bl from-[#D4AF37] to-transparent" />
            </div>

            {/* 콘텐츠 */}
            <div className="container-custom relative z-10 text-center text-white px-6 py-20">
                {/* 배지 */}
                <div
                    ref={badgeRef}
                    className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass mb-8"
                    style={{ opacity: 0 }}
                >
                    <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                        <span className="text-sm font-semibold tracking-wide text-[#D4AF37]">
                            30개동 1,258세대 대단지
                        </span>
                    </span>
                    <span className="w-px h-4 bg-white/30" />
                    <span className="text-sm font-medium">
                        청약 접수 중
                    </span>
                </div>

                {/* 메인 타이틀 */}
                <h1
                    ref={titleRef}
                    className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
                    style={{ opacity: 0 }}
                >
                    <span className="block text-xl md:text-2xl font-normal text-white/70 mb-4">
                        영산강이 흐르는 남악의 중심
                    </span>
                    <span className="block mb-2">남악</span>
                    <span className="display-title text-gradient-gold text-5xl md:text-7xl lg:text-8xl">
                        센트레빌 리버파크
                    </span>
                </h1>

                {/* 서브타이틀 */}
                <p
                    ref={subtitleRef}
                    className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed"
                    style={{ opacity: 0 }}
                >
                    전남 목포시 남악신도시, 강변조망과 수변공원을 품은
                    <br className="hidden md:block" />
                    프리미엄 주거의 새로운 기준
                </p>

                {/* 스탯 바 */}
                <div
                    ref={statsRef}
                    className="flex flex-wrap justify-center gap-6 md:gap-10 mb-12"
                >
                    <div className="text-center" style={{ opacity: 0 }}>
                        <div className="text-3xl md:text-4xl font-bold text-[#D4AF37]">30</div>
                        <div className="text-sm text-white/60">개동</div>
                    </div>
                    <div className="text-center" style={{ opacity: 0 }}>
                        <div className="text-3xl md:text-4xl font-bold text-[#D4AF37]">1,258</div>
                        <div className="text-sm text-white/60">세대</div>
                    </div>
                    <div className="text-center" style={{ opacity: 0 }}>
                        <div className="text-3xl md:text-4xl font-bold text-white">59~84</div>
                        <div className="text-sm text-white/60">㎡</div>
                    </div>
                    <div className="text-center" style={{ opacity: 0 }}>
                        <div className="text-3xl md:text-4xl font-bold text-white">4</div>
                        <div className="text-sm text-white/60">평형 타입</div>
                    </div>
                </div>

                {/* CTA 버튼 */}
                <div
                    ref={ctaRef}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <button className="btn-primary min-w-[200px]" style={{ opacity: 0 }}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        상담 예약하기
                    </button>
                    <button
                        className="min-w-[200px] inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full border-2 border-white/30 text-white font-semibold transition-all hover:bg-white/10 hover:border-white/50"
                        style={{ opacity: 0 }}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        모델하우스 안내
                    </button>
                </div>

                {/* 스크롤 인디케이터 */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                    <div className="flex flex-col items-center gap-2 text-white/50">
                        <span className="text-xs tracking-widest uppercase">Scroll</span>
                        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
                            <div className="w-1 h-3 bg-white/50 rounded-full animate-bounce" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
