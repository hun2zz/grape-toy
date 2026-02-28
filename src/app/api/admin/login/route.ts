import { NextResponse } from 'next/server';
import { verifyPassword, setAuthCookie } from '@/lib/auth';

export async function POST(request: Request) {
    try {
        const { password } = await request.json();

        if (!password || !verifyPassword(password)) {
            return NextResponse.json(
                { error: '비밀번호가 올바르지 않습니다.' },
                { status: 401 }
            );
        }

        await setAuthCookie();
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json(
            { error: '서버 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
}
