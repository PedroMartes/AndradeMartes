import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { chatId } = await request.json();
        
        const wahaUrl = `http://localhost:3005/api/default/chats/seen`;

        const response = await fetch(wahaUrl, {
            method: 'POST',
            headers: {
                'X-Api-Key': 'n8n-waha-2026',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ chatId: chatId })
        });

        return NextResponse.json({ success: response.ok });
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao marcar como lida' }, { status: 500 });
    }
}