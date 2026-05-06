import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const chatId = searchParams.get('id');

    if (!chatId) return NextResponse.json({ count: 0 });

    try {
        // Busca apenas 1 mensagem para verificar o ID da última
        const wahaUrl = `http://localhost:3005/api/messages?chatId=${chatId}&session=default&limit=1`;
        const res = await fetch(wahaUrl, {
            headers: { 'X-Api-Key': 'n8n-waha-2026' },
            cache: 'no-store'
        });
        const data = await res.json();
        
        // Retorna o ID da última mensagem encontrada
        return NextResponse.json({ lastMessageId: data[0]?.id || null });
    } catch {
        return NextResponse.json({ lastMessageId: null }, { status: 500 });
    }
}