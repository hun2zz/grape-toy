import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { validateLeadInput } from '@/lib/validation';
import { getClientIp, checkIpRateLimit, checkPhoneCooldown } from '@/lib/rate-limit';

export async function POST(request: Request) {
    try {
        // Rate limit by IP
        const ip = getClientIp(request);
        const ipCheck = checkIpRateLimit(ip);
        if (!ipCheck.allowed) {
            return NextResponse.json(
                { error: '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.' },
                { status: 429 }
            );
        }

        const body = await request.json();
        const { name, phone, roomType, moveInTimeline, questions, message } = body;

        // Server-side validation
        const errors = validateLeadInput({ name, phone, message, questions });
        if (errors.length > 0) {
            return NextResponse.json(
                { error: errors[0].message, errors },
                { status: 400 }
            );
        }

        // Phone cooldown check
        const phoneCheck = checkPhoneCooldown(phone);
        if (!phoneCheck.allowed) {
            const minutes = Math.ceil((phoneCheck.retryAfterMs || 0) / 60000);
            return NextResponse.json(
                { error: `동일 번호로 이미 신청하셨습니다. ${minutes}분 후 다시 시도해주세요.` },
                { status: 429 }
            );
        }

        // 설문 추가 필드를 message에 합쳐서 저장
        const messageParts: string[] = [];
        if (moveInTimeline) messageParts.push(`[입주희망] ${moveInTimeline}`);
        if (questions) messageParts.push(`[궁금한점] ${questions}`);
        if (message) messageParts.push(message);

        const lead = await prisma.lead.create({
            data: {
                name,
                phone,
                roomType: roomType || null,
                message: messageParts.length > 0 ? messageParts.join('\n') : null,
            },
        });

        console.log('New lead saved:', lead.id);

        return NextResponse.json(
            { success: true, message: '상담 신청이 완료되었습니다.' },
            { status: 201 }
        );
    } catch (error) {
        console.error('Lead submission error:', error);
        return NextResponse.json(
            { error: '서버 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    const denied = await requireAdmin();
    if (denied) return denied;

    try {
        const { searchParams } = request.nextUrl;
        const isContacted = searchParams.get('isContacted');
        const sortBy = searchParams.get('sortBy') || 'createdAt';
        const order = searchParams.get('order') || 'desc';

        const where = isContacted !== null
            ? { isContacted: isContacted === 'true' }
            : {};

        const orderBy = { [sortBy]: order };

        const leads = await prisma.lead.findMany({ where, orderBy });
        const total = await prisma.lead.count({ where });

        return NextResponse.json({ leads, total });
    } catch (error) {
        console.error('Lead fetch error:', error);
        return NextResponse.json(
            { error: '서버 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
}
