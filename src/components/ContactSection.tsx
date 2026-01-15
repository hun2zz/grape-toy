'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const roomTypes = ['59㎡A', '59㎡B', '84㎡A', '84㎡B'];

export default function ContactSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        roomType: '84㎡A',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setIsSubmitted(true);
                setFormData({ name: '', phone: '', roomType: '84㎡A', message: '' });
            } else {
                alert('전송에 실패했습니다. 다시 시도해주세요.');
            }
        } catch {
            alert('전송에 실패했습니다. 다시 시도해주세요.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section
            ref={sectionRef}
            id="contact"
            className="py-24 md:py-32 bg-gradient-to-br from-[#0F1C2E] via-[#1C2536] to-[#1A3A4A]"
        >
            <div className="container-custom">
                <div className="max-w-2xl mx-auto">
                    {/* 타이틀 */}
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-sm font-semibold mb-4">
                            CONTACT
                        </span>
                        <h2 className="section-title text-white">
                            상담 <span className="text-gradient-gold">예약하기</span>
                        </h2>
                        <p className="text-white/60 mt-4">
                            연락처를 남겨주시면 분양 전문 상담사가 친절히 안내해드립니다
                        </p>
                    </div>

                    {isSubmitted ? (
                        <div className="text-center py-16 bg-white/5 rounded-3xl border border-white/10">
                            <div className="text-5xl mb-4">✅</div>
                            <h3 className="text-2xl font-bold text-white mb-2">
                                상담 신청이 완료되었습니다
                            </h3>
                            <p className="text-white/70">
                                빠른 시일 내에 연락드리겠습니다
                            </p>
                            <button
                                onClick={() => setIsSubmitted(false)}
                                className="mt-6 px-6 py-2 text-[#D4AF37] border border-[#D4AF37] rounded-full hover:bg-[#D4AF37] hover:text-white transition-colors"
                            >
                                추가 신청하기
                            </button>
                        </div>
                    ) : (
                        <form
                            ref={formRef}
                            onSubmit={handleSubmit}
                            className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10"
                        >
                            <div className="space-y-6">
                                {/* 이름 */}
                                <div>
                                    <label className="block text-white/80 text-sm font-medium mb-2">
                                        이름 <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#D4AF37] transition-colors"
                                        placeholder="홍길동"
                                    />
                                </div>

                                {/* 연락처 */}
                                <div>
                                    <label className="block text-white/80 text-sm font-medium mb-2">
                                        연락처 <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        required
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#D4AF37] transition-colors"
                                        placeholder="010-0000-0000"
                                    />
                                </div>

                                {/* 관심 평형 */}
                                <div>
                                    <label className="block text-white/80 text-sm font-medium mb-2">
                                        관심 평형
                                    </label>
                                    <div className="grid grid-cols-4 gap-3">
                                        {roomTypes.map((type) => (
                                            <button
                                                key={type}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, roomType: type })}
                                                className={`py-3 rounded-xl font-medium transition-all ${formData.roomType === type
                                                        ? 'bg-[#D4AF37] text-[#1C2536]'
                                                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                                                    }`}
                                            >
                                                {type}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* 메모 */}
                                <div>
                                    <label className="block text-white/80 text-sm font-medium mb-2">
                                        문의사항 (선택)
                                    </label>
                                    <textarea
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        rows={3}
                                        className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                                        placeholder="궁금하신 점을 남겨주세요"
                                    />
                                </div>

                                {/* 제출 버튼 */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full btn-primary py-5 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? '전송 중...' : '상담 신청하기'}
                                </button>

                                <p className="text-center text-white/40 text-xs">
                                    개인정보 수집 및 이용에 동의하며, 상담 목적으로만 사용됩니다.
                                </p>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}
