import { NextResponse } from 'next/server';

// O nome da função DEVE ser GET em maiúsculo para Next.js App Router
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const rawId = searchParams.get('id');

        if (!rawId) {
            return NextResponse.json({ error: 'ID ausente' }, { status: 400 });
        }

        // Decodifica o ID (limpa caracteres como %40)
        let chatId = decodeURIComponent(rawId);

        // Se o ID não tiver @, assume que é contato individual
        if (!chatId.includes('@')) {
            chatId = `${chatId}@c.us`;
        }

        // URL para o WAHA
        const wahaUrl = `http://localhost:3005/api/messages?chatId=${chatId}&session=default&limit=50`;

        const response = await fetch(wahaUrl, {
            method: 'GET',
            headers: {
                'X-Api-Key': 'n8n-waha-2026',
                'Content-Type': 'application/json',
            },
            cache: 'no-store'
        });

        if (!response.ok) {
            return NextResponse.json({ error: 'Erro no WAHA' }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data);

    } catch (error) {
        console.error('Erro na API:', error);
        return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
    }
}