import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // MUDANÇA AQUI: No WAHA moderno, o endpoint correto é /api/default/chats
        // Onde "default" é o nome da sua sessão.
        const response = await fetch('http://localhost:3005/api/default/chats', {
            method: 'GET',
            headers: {
                'X-Api-Key': 'n8n-waha-2026',
                'Content-Type': 'application/json',
            },
            cache: 'no-store'
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Erro no WAHA:', errorText);
            return NextResponse.json(
                { error: `WAHA Erro ${response.status}: ${errorText}` }, 
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);

    } catch (error) {
        console.error('Erro na Rota de Chats:', error);
        return NextResponse.json(
            { error: 'Não foi possível conectar ao Docker.' }, 
            { status: 500 }
        );
    }
}   