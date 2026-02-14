'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const communityItems = [
    { name: '휘트니스 & GX룸', icon: '🏋️' },
    { name: '실내 골프연습장', icon: '⛳' },
    { name: '스크린골프', icon: '🎯' },
    { name: '실내탁구장', icon: '🏓' },
    { name: '작은도서관', icon: '📚' },
    { name: '독서실', icon: '📖' },
    { name: '연회장 & 카페', icon: '☕' },
    { name: '코인세탁실', icon: '🧺' },
];

export default function CommunitySection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<HTMLDivElement>(null);

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

            if (itemsRef.current) {
                gsap.fromTo(
                    itemsRef.current.children,
                    { opacity: 0, scale: 0.9 },
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 0.5,
                        stagger: 0.08,
                        scrollTrigger: {
                            trigger: itemsRef.current,
                            start: 'top 80%',
                        },
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 md:py-32 bg-[#F8F7F4]">
            <div className="container-custom">
                {/* 타이틀 */}
                <div ref={titleRef} className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[#D4AF37]/10 text-[#B8960C] text-sm font-semibold mb-4">
                        COMMUNITY
                    </span>
                    <h2 className="section-title text-[#1C2536]">
                        명품 <span className="text-gradient-gold">커뮤니티</span>
                    </h2>
                    <p className="section-subtitle mx-auto mt-4">
                        휘트니스부터 골프연습장까지, 모두가 여유롭게 즐기는 프리미엄 시설
                    </p>
                </div>

                {/* 커뮤니티 시설 그리드 */}
                <div
                    ref={itemsRef}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4"
                >
                    {communityItems.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition-shadow cursor-pointer group"
                        >
                            <span className="text-4xl mb-3 block group-hover:scale-110 transition-transform">
                                {item.icon}
                            </span>
                            <span className="text-[#1C2536] font-medium">{item.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
