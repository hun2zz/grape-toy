import { NextResponse } from 'next/server';

// 임시 저장소 (실제로는 Prisma로 DB에 저장)
const leads: Array<{
    id: string;
    name: string;
    phone: string;
    roomType: string;
    message: string;
    createdAt: Date;
}> = [];

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, phone, roomType, message } = body;

        // 유효성 검사
        if (!name || !phone) {
            return NextResponse.json(
                { error: '이름과 연락처는 필수입니다.' },
                { status: 400 }
            );
        }

        // 리드 저장 (임시 - 나중에 Prisma로 교체)
        const newLead = {
            id: `lead_${Date.now()}`,
            name,
            phone,
            roomType: roomType || '',
            message: message || '',
            createdAt: new Date(),
        };

        leads.push(newLead);
        console.log('New lead received:', newLead);

        // TODO: Prisma 연동 시 아래 코드 사용
        // const lead = await prisma.lead.create({
        //   data: { name, phone, roomType, message },
        // });

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

export async function GET() {
    // 관리자용 리드 조회 (나중에 인증 추가 필요)
    return NextResponse.json({ leads, total: leads.length });
}
