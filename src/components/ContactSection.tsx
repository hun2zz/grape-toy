'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { openConsultationModal } from './ConsultationModal';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function ContactSection() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                sectionRef.current,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 85%',
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="contact"
            className="py-24 md:py-32 bg-gradient-to-br from-[#0F1C2E] via-[#1C2536] to-[#1A3A4A]"
        >
            <div className="container-custom">
                <div className="max-w-2xl mx-auto text-center">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-sm font-semibold mb-4">
                        CONTACT
                    </span>
                    <h2 className="section-title text-white">
                        상담 <span className="text-gradient-gold">신청하기</span>
                    </h2>
                    <p className="text-white/60 mt-4 mb-10">
                        전화 또는 온라인으로 편하게 상담 신청하세요
                    </p>

                    <button
                        onClick={openConsultationModal}
                        className="btn-primary px-12 py-5 text-lg"
                    >
                        상담 신청하기
                    </button>

                    <p className="text-white/30 text-xs mt-8">
                        개인정보 수집 및 이용에 동의하며, 상담 목적으로만 사용됩니다.
                    </p>
                </div>
            </div>
        </section>
    );
}
