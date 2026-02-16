'use client';

import { useState } from 'react';
import Link from 'next/link';

const roomTypes = ['59㎡A', '59㎡B', '84㎡A', '84㎡B'];
const moveInOptions = ['즉시 입주', '3개월 이내', '6개월 이내', '1년 이내', '미정'];

export default function ConsultationPage() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        roomType: '',
        moveInTimeline: '',
        message: '',
        questions: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

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
            } else {
                alert('전송에 실패했습니다. 다시 시도해주세요.');
            }
        } catch {
            alert('전송에 실패했습니다. 다시 시도해주세요.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#0F1C2E] via-[#1C2536] to-[#1A3A4A] flex items-center justify-center px-4">
                <div className="max-w-md w-full text-center bg-white/5 backdrop-blur-sm rounded-3xl p-10 border border-white/10">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
                        <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-3">
                        상담 신청이 완료되었습니다
                    </h2>
                    <p className="text-white/60 mb-8">
                        빠른 시일 내에 연락드리겠습니다.<br />
                        감사합니다.
                    </p>
                    <Link
                        href="/"
                        className="inline-block px-8 py-3 bg-[#D4AF37] text-[#1C2536] rounded-full font-semibold hover:bg-[#E5C348] transition-colors"
                    >
                        홈으로 돌아가기
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#1C2536]" style={{ background: 'linear-gradient(to bottom right, #0F1C2E, #1C2536, #1A3A4A)' }}>
            {/* 상단 네비게이션 */}
            <div className="sticky top-0 z-10 bg-[#0F1C2E]/80 backdrop-blur-lg border-b border-white/10">
                <div className="container-custom py-4 flex items-center justify-between">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        돌아가기
                    </Link>
                    <span className="text-white/40 text-sm">상담 신청서</span>
                </div>
            </div>

            <div className="container-custom py-12 md:py-20">
                <div className="max-w-2xl mx-auto">
                    {/* 타이틀 */}
                    <div className="text-center mb-10">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                            상담 <span className="text-[#D4AF37]">신청서</span>
                        </h1>
                        <p className="text-white/50">
                            아래 정보를 입력하시면 맞춤 상담을 제공해 드립니다
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* 섹션 1: 기본 정보 */}
                        <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-white/10">
                            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                <span className="w-7 h-7 rounded-full bg-[#D4AF37] text-[#1C2536] text-sm font-bold flex items-center justify-center">1</span>
                                기본 정보
                            </h3>
                            <div className="space-y-5">
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
                            </div>
                        </div>

                        {/* 섹션 2: 관심 정보 */}
                        <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-white/10">
                            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                <span className="w-7 h-7 rounded-full bg-[#D4AF37] text-[#1C2536] text-sm font-bold flex items-center justify-center">2</span>
                                관심 정보
                            </h3>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-white/80 text-sm font-medium mb-3">
                                        관심 평형
                                    </label>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                        {roomTypes.map((type) => (
                                            <button
                                                key={type}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, roomType: formData.roomType === type ? '' : type })}
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
                                <div>
                                    <label className="block text-white/80 text-sm font-medium mb-3">
                                        입주 희망 시기
                                    </label>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {moveInOptions.map((option) => (
                                            <button
                                                key={option}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, moveInTimeline: formData.moveInTimeline === option ? '' : option })}
                                                className={`py-3 rounded-xl font-medium transition-all text-sm ${formData.moveInTimeline === option
                                                    ? 'bg-[#D4AF37] text-[#1C2536]'
                                                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                                                    }`}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 섹션 3: 추가 문의 */}
                        <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-white/10">
                            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                <span className="w-7 h-7 rounded-full bg-[#D4AF37] text-[#1C2536] text-sm font-bold flex items-center justify-center">3</span>
                                추가 문의
                            </h3>
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-white/80 text-sm font-medium mb-2">
                                        요청사항
                                    </label>
                                    <textarea
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        rows={3}
                                        className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                                        placeholder="상담 시 요청하실 사항을 적어주세요"
                                    />
                                </div>
                                <div>
                                    <label className="block text-white/80 text-sm font-medium mb-2">
                                        궁금한 점
                                    </label>
                                    <textarea
                                        value={formData.questions}
                                        onChange={(e) => setFormData({ ...formData, questions: e.target.value })}
                                        rows={3}
                                        className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                                        placeholder="분양 관련 궁금한 점을 적어주세요"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 제출 버튼 */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full btn-primary py-5 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? '전송 중...' : '상담 신청하기'}
                        </button>

                        <p className="text-center text-white/30 text-xs">
                            개인정보 수집 및 이용에 동의하며, 상담 목적으로만 사용됩니다.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
