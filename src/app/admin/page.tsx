'use client';

import { useState, useEffect, useCallback } from 'react';

interface Lead {
    id: string;
    name: string;
    phone: string;
    roomType: string | null;
    message: string | null;
    createdAt: string;
    isContacted: boolean;
}

type FilterType = 'all' | 'pending' | 'contacted';

export default function AdminPage() {
    const [authed, setAuthed] = useState<boolean | null>(null);
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [loginLoading, setLoginLoading] = useState(false);

    const [leads, setLeads] = useState<Lead[]>([]);
    const [total, setTotal] = useState(0);
    const [filter, setFilter] = useState<FilterType>('all');
    const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
    const [loading, setLoading] = useState(true);

    // Check auth on mount
    useEffect(() => {
        fetch('/api/admin/check')
            .then(res => res.json())
            .then(data => setAuthed(data.authenticated))
            .catch(() => setAuthed(false));
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginLoading(true);
        setLoginError('');

        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });
            if (res.ok) {
                setAuthed(true);
                setPassword('');
            } else {
                const data = await res.json();
                setLoginError(data.error || '로그인에 실패했습니다.');
            }
        } catch {
            setLoginError('서버에 연결할 수 없습니다.');
        } finally {
            setLoginLoading(false);
        }
    };

    const handleLogout = async () => {
        await fetch('/api/admin/logout', { method: 'POST' });
        setAuthed(false);
        setLeads([]);
        setTotal(0);
    };

    const fetchLeads = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (filter === 'pending') params.set('isContacted', 'false');
            if (filter === 'contacted') params.set('isContacted', 'true');
            params.set('sortBy', 'createdAt');
            params.set('order', sortOrder);

            const res = await fetch(`/api/leads?${params.toString()}`);
            if (res.status === 401) {
                setAuthed(false);
                return;
            }
            const data = await res.json();
            setLeads(data.leads || []);
            setTotal(data.total || 0);
        } catch (error) {
            console.error('Failed to fetch leads:', error);
        } finally {
            setLoading(false);
        }
    }, [filter, sortOrder]);

    useEffect(() => {
        if (authed) fetchLeads();
    }, [authed, fetchLeads]);

    const toggleContacted = async (id: string, currentStatus: boolean) => {
        try {
            const res = await fetch(`/api/leads/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isContacted: !currentStatus }),
            });
            if (res.ok) {
                setLeads(leads.map(lead =>
                    lead.id === id ? { ...lead, isContacted: !currentStatus } : lead
                ));
            }
        } catch (error) {
            console.error('Failed to toggle status:', error);
        }
    };

    const deleteLead = async (id: string) => {
        if (!confirm('정말 삭제하시겠습니까?')) return;

        try {
            const res = await fetch(`/api/leads/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setLeads(leads.filter(lead => lead.id !== id));
                setTotal(prev => prev - 1);
            }
        } catch (error) {
            console.error('Failed to delete lead:', error);
        }
    };

    const pendingCount = leads.filter(l => !l.isContacted).length;
    const contactedCount = leads.filter(l => l.isContacted).length;

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    // Loading state
    if (authed === null) {
        return (
            <div className="min-h-screen bg-[#F8F7F4] flex items-center justify-center">
                <p className="text-gray-400">로딩 중...</p>
            </div>
        );
    }

    // Login form
    if (!authed) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#1C2536] to-[#2C3E50] flex items-center justify-center px-4">
                <div className="max-w-sm w-full bg-white rounded-2xl p-8 shadow-lg">
                    <h1 className="text-2xl font-bold text-[#1C2536] text-center mb-2">관리자 로그인</h1>
                    <p className="text-gray-400 text-sm text-center mb-8">남악 센트레빌 리버파크</p>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="비밀번호 입력"
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1C2536] transition-colors"
                                autoFocus
                            />
                        </div>
                        {loginError && (
                            <p className="text-red-500 text-sm text-center">{loginError}</p>
                        )}
                        <button
                            type="submit"
                            disabled={loginLoading || !password}
                            className="w-full py-3 bg-[#1C2536] text-white rounded-xl font-semibold hover:bg-[#2C3E50] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loginLoading ? '확인 중...' : '로그인'}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8F7F4]">
            {/* 헤더 */}
            <header className="bg-gradient-to-r from-[#1C2536] to-[#2C3E50] text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold">상담 관리</h1>
                            <p className="text-white/60 text-sm mt-1">남악 센트레빌 리버파크</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <a
                                href="/"
                                className="px-4 py-2 bg-white/10 rounded-lg text-sm hover:bg-white/20 transition-colors"
                            >
                                홈으로
                            </a>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-white/10 rounded-lg text-sm hover:bg-red-500/80 transition-colors"
                            >
                                로그아웃
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* 통계 카드 */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <p className="text-sm text-gray-500 mb-1">전체 상담</p>
                        <p className="text-3xl font-bold text-[#1C2536]">{total}</p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <p className="text-sm text-gray-500 mb-1">대기 중</p>
                        <p className="text-3xl font-bold text-orange-500">{pendingCount}</p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <p className="text-sm text-gray-500 mb-1">연락 완료</p>
                        <p className="text-3xl font-bold text-green-600">{contactedCount}</p>
                    </div>
                </div>

                {/* 필터 + 정렬 */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div className="flex gap-2">
                        {([
                            ['all', '전체'],
                            ['pending', '대기 중'],
                            ['contacted', '완료'],
                        ] as const).map(([key, label]) => (
                            <button
                                key={key}
                                onClick={() => setFilter(key)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === key
                                    ? 'bg-[#1C2536] text-white'
                                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                    }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
                        className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-1"
                    >
                        {sortOrder === 'desc' ? '최신순' : '오래된순'}
                        <svg className={`w-4 h-4 transition-transform ${sortOrder === 'asc' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>

                {/* 테이블 */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {loading ? (
                        <div className="p-12 text-center text-gray-400">
                            불러오는 중...
                        </div>
                    ) : leads.length === 0 ? (
                        <div className="p-12 text-center text-gray-400">
                            상담 내역이 없습니다.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-gray-100 bg-gray-50/50">
                                        <th className="text-left px-6 py-4 font-semibold text-gray-500">상태</th>
                                        <th className="text-left px-6 py-4 font-semibold text-gray-500">이름</th>
                                        <th className="text-left px-6 py-4 font-semibold text-gray-500">연락처</th>
                                        <th className="text-left px-6 py-4 font-semibold text-gray-500">관심 평형</th>
                                        <th className="text-left px-6 py-4 font-semibold text-gray-500">메시지</th>
                                        <th className="text-left px-6 py-4 font-semibold text-gray-500">신청일</th>
                                        <th className="text-left px-6 py-4 font-semibold text-gray-500"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leads.map((lead) => (
                                        <tr key={lead.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => toggleContacted(lead.id, lead.isContacted)}
                                                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${lead.isContacted
                                                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                                        : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                                                        }`}
                                                >
                                                    {lead.isContacted ? '완료' : '대기'}
                                                </button>
                                            </td>
                                            <td className="px-6 py-4 font-medium text-gray-900">{lead.name}</td>
                                            <td className="px-6 py-4">
                                                <a
                                                    href={`tel:${lead.phone}`}
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    {lead.phone}
                                                </a>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">
                                                {lead.roomType || '-'}
                                            </td>
                                            <td className="px-6 py-4 text-gray-600 max-w-xs">
                                                <span className="line-clamp-2">
                                                    {lead.message || '-'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-400 whitespace-nowrap">
                                                {formatDate(lead.createdAt)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => deleteLead(lead.id)}
                                                    className="text-gray-300 hover:text-red-500 transition-colors"
                                                    title="삭제"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
