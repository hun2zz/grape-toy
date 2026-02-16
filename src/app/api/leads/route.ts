import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, phone, roomType, moveInTimeline, questions, message } = body;

        if (!name || !phone) {
            return NextResponse.json(
                { error: '이름과 연락처는 필수입니다.' },
                { status: 400 }
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
