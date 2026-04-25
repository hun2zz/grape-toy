'use client';

import { useState } from 'react';
import { faqs } from '@/lib/faqs';

export default function FaqSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section
            id="faq"
            aria-label="자주 묻는 질문"
            className="py-24 md:py-32 bg-[#FDFCFA]"
        >
            <div className="container-custom">
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[#D4AF37]/10 text-[#B8960C] text-sm font-semibold mb-4">
                        FAQ
                    </span>
                    <h2 className="section-title text-[#1C2536]">
                        자주 묻는 질문
                    </h2>
                    <p className="section-subtitle mx-auto mt-4">
                        분양 일정·평형·분양가 등 가장 많이 문의하시는 내용을 모았습니다
                    </p>
                </div>

                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, idx) => {
                        const isOpen = openIndex === idx;
                        return (
                            <div
                                key={idx}
                                className="rounded-2xl bg-white border border-[#E8E6E1] shadow-sm overflow-hidden transition-shadow hover:shadow-md"
                            >
                                <button
                                    type="button"
                                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                                    aria-expanded={isOpen}
                                    aria-controls={`faq-panel-${idx}`}
                                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                                >
                                    <span className="flex items-center gap-3">
                                        <span className="text-[#D4AF37] font-bold text-lg">
                                            Q{idx + 1}.
                                        </span>
                                        <span className="font-semibold text-[#1C2536] text-base md:text-lg">
                                            {faq.question}
                                        </span>
                                    </span>
                                    <svg
                                        className={`w-5 h-5 flex-shrink-0 text-[#9CA3AF] transition-transform ${
                                            isOpen ? 'rotate-180' : ''
                                        }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>
                                <div
                                    id={`faq-panel-${idx}`}
                                    role="region"
                                    hidden={!isOpen}
                                    className="px-6 pb-6 text-[#374151] leading-relaxed"
                                >
                                    {faq.answer}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
