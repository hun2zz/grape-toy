'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function LifestyleSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                titleRef.current,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );

            gsap.fromTo(
                imageRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: 0.2,
                    scrollTrigger: {
                        trigger: imageRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="lifestyle" aria-label="입주민 라이프스타일" className="py-24 md:py-32 bg-white">
            <div className="container-custom">
                <div ref={titleRef} className="text-center mb-12">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[#D4AF37]/10 text-[#B8960C] text-sm font-semibold mb-4">
                        LIFESTYLE
                    </span>
                    <h2 className="section-title text-[#1C2536]">
                        센트레빌의 <span className="text-gradient-gold">하루</span>
                    </h2>
                    <p className="section-subtitle mx-auto mt-4">
                        아침 산책부터 저녁 여가까지, 일상이 특별해지는 프리미엄 라이프
                    </p>
                </div>

                <div ref={imageRef}>
                    <Image
                        src="/images/ribier-fiction.webp"
                        alt="남악 센트레빌 리버파크 입주민 하루 라이프스타일"
                        width={1400}
                        height={400}
                        sizes="(min-width: 768px) 90vw, 100vw"
                        className="w-full h-auto"
                    />
                </div>
            </div>
        </section>
    );
}
