'use client';

import { useState, useEffect } from 'react';

export default function FloatingActionBar() {
    const [isVisible, setIsVisible] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // 스크롤이 500px 이상이면 표시
            setIsVisible(window.scrollY > 500);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToContact = () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        setIsExpanded(false);
    };

    const callPhone = () => {
        window.location.href = 'tel:1588-0000';
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
            {/* 확장 메뉴 */}
            {isExpanded && (
                <div className="flex flex-col gap-2 animate-fade-in-up">
                    <button
                        onClick={callPhone}
                        className="flex items-center gap-3 px-5 py-3 bg-white/90 backdrop-blur-lg rounded-full shadow-lg hover:bg-white transition-colors"
                    >
                        <span className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </span>
                        <span className="font-semibold text-[#1C2536]">전화 상담</span>
                    </button>

                    <button
                        onClick={scrollToContact}
                        className="flex items-center gap-3 px-5 py-3 bg-white/90 backdrop-blur-lg rounded-full shadow-lg hover:bg-white transition-colors"
                    >
                        <span className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center text-white">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </span>
                        <span className="font-semibold text-[#1C2536]">온라인 상담</span>
                    </button>
                </div>
            )}

            {/* 메인 버튼 */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={`w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${isExpanded
                        ? 'bg-[#1C2536] rotate-45'
                        : 'bg-gradient-to-br from-[#D4AF37] to-[#B8960C]'
                    }`}
                style={{
                    boxShadow: '0 8px 32px rgba(212, 175, 55, 0.4)',
                }}
            >
                <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    {isExpanded ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    )}
                </svg>
            </button>
        </div>
    );
}
