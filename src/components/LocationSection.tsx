'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const locationInfo = [
    { label: '주소', value: '전남 목포시 남악신도시' },
    { label: '세대수', value: '30개동 1,258세대' },
    { label: '입주예정', value: '2026년' },
];

const nearbyPlaces = [
    { category: '교육', places: ['오룡초등학교', '오룡중학교', '남악중학교', '남악고등학교'] },
    { category: '편의', places: ['롯데아울렛', '롯데마트', '이마트 트레이더스(예정)', '영화관(예정)'] },
    { category: '자연', places: ['영산강 수변공원', '자전거도로', '생태공원'] },
    { category: '교통', places: ['남악IC', '서해안고속도로', '남해고속도로'] },
];

export default function LocationSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

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
                    },
                }
            );

            gsap.fromTo(
                contentRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: contentRef.current,
                        start: 'top 80%',
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 md:py-32 bg-white">
            <div className="container-custom">
                {/* 타이틀 */}
                <div ref={titleRef} className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[#D4AF37]/10 text-[#B8960C] text-sm font-semibold mb-4">
                        LOCATION
                    </span>
                    <h2 className="section-title text-[#1C2536]">
                        찾아오시는 <span className="text-gradient-gold">길</span>
                    </h2>
                    <p className="section-subtitle mx-auto mt-4">
                        남악신도시의 중심, 교통과 생활 인프라가 완벽한 프리미엄 입지
                    </p>
                </div>

                {/* 콘텐츠 */}
                <div ref={contentRef} className="grid lg:grid-cols-5 gap-8">
                    {/* 지도 이미지 */}
                    <div className="lg:col-span-3 relative rounded-3xl overflow-hidden shadow-xl">
                        <div className="aspect-[4/3] relative">
                            <Image
                                src="/images/location.png"
                                alt="남악 센트레빌 리버파크 위치"
                                fill
                                className="object-cover"
                            />
                        </div>
                        {/* 현장 위치 표시 */}
                        <div className="absolute bottom-4 left-4 px-4 py-2 bg-[#D4AF37] text-white rounded-full font-semibold text-sm shadow-lg">
                            📍 현장 위치
                        </div>
                    </div>

                    {/* 위치 정보 */}
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        {/* 기본 정보 */}
                        <div className="bg-gradient-to-br from-[#1C2536] to-[#2C3E50] rounded-2xl p-6 text-white">
                            <h3 className="text-lg font-bold mb-4 text-[#D4AF37]">단지 정보</h3>
                            <div className="space-y-3">
                                {locationInfo.map((info, idx) => (
                                    <div key={idx} className="flex justify-between items-center py-2 border-b border-white/10 last:border-0">
                                        <span className="text-white/60">{info.label}</span>
                                        <span className="font-semibold">{info.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 주변 시설 */}
                        <div className="bg-[#F8F7F4] rounded-2xl p-6 flex-1">
                            <h3 className="text-lg font-bold mb-4 text-[#1C2536]">주변 시설</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {nearbyPlaces.map((item, idx) => (
                                    <div key={idx}>
                                        <span className="text-sm font-semibold text-[#D4AF37] mb-2 block">
                                            {item.category}
                                        </span>
                                        <ul className="text-sm text-[#6B7280] space-y-1">
                                            {item.places.map((place, pIdx) => (
                                                <li key={pIdx} className="flex items-start gap-1">
                                                    <span className="text-[#D4AF37]">·</span>
                                                    {place}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 문의 버튼 */}
                        <button
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                            className="btn-primary w-full py-4"
                        >
                            📞 방문 상담 예약하기
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
