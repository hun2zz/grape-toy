import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const denied = await requireAdmin();
    if (denied) return denied;

    try {
        const { id } = await params;
        const body = await request.json();

        const lead = await prisma.lead.update({
            where: { id },
            data: { isContacted: body.isContacted },
        });

        return NextResponse.json(lead);
    } catch (error) {
        console.error('Lead update error:', error);
        return NextResponse.json(
            { error: '업데이트에 실패했습니다.' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const denied = await requireAdmin();
    if (denied) return denied;

    try {
        const { id } = await params;

        await prisma.lead.delete({ where: { id } });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Lead delete error:', error);
        return NextResponse.json(
            { error: '삭제에 실패했습니다.' },
            { status: 500 }
        );
    }
}
