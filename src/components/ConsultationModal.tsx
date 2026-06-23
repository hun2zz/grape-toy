'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ConsultationModal() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleOpen = () => setIsOpen(true);
        window.addEventListener('openConsultationModal', handleOpen);
        return () => window.removeEventListener('openConsultationModal', handleOpen);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            {/* 배경 딤 */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={() => setIsOpen(false)}
            />

            {/* 모달 */}
            <div className="relative w-full max-w-md bg-gradient-to-br from-[#1C2536] to-[#2C3E50] rounded-3xl p-8 border border-white/10 shadow-2xl animate-fade-in-up">
                {/* 닫기 버튼 */}
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-white/40 hover:text-white transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">상담 신청</h3>
                    <p className="text-white/50 text-sm">원하시는 상담 방법을 선택해주세요</p>
                </div>

                <div className="space-y-4">
                    {/* 전화 상담 */}
                    <a
                        href="tel:061-982-3033"
                        className="group flex items-center gap-4 w-full p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-green-400/30 transition-all"
                    >
                        <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <svg className="w-7 h-7 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </div>
                        <div className="text-left">
                            <span className="block text-white font-semibold text-lg">전화 상담하기</span>
                            <span className="block text-[#D4AF37] font-bold text-sm">061-982-3033</span>
                        </div>
                        <svg className="w-5 h-5 text-white/30 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </a>

                    {/* 신청서 작성 */}
                    <Link
                        href="/consultation"
                        onClick={() => setIsOpen(false)}
                        className="group flex items-center gap-4 w-full p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-[#D4AF37]/30 transition-all"
                    >
                        <div className="w-14 h-14 rounded-full bg-[#D4AF37]/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <svg className="w-7 h-7 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </div>
                        <div className="text-left">
                            <span className="block text-white font-semibold text-lg">신청서 작성하기</span>
                            <span className="block text-white/50 text-sm">간단한 설문으로 맞춤 상담</span>
                        </div>
                        <svg className="w-5 h-5 text-white/30 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
}

/** 모달 열기 헬퍼 함수 */
export function openConsultationModal() {
    window.dispatchEvent(new Event('openConsultationModal'));
}
