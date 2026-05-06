import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        // 1. Extraímos os dados enviados pelo seu frontend
        const { phone, message } = await request.json();

        // 2. Validação básica
        if (!phone || !message) {
            return NextResponse.json(
                { error: 'Telefone e mensagem são obrigatórios' },
                { status: 400 }
            );
        }

        // 3. Limpeza do número: removemos qualquer caractere que não seja número
        // Isso permite que o usuário digite (11) 99999-8888 e o código entenda
        const cleanPhone = phone.replace(/\D/g, '');

        // 4. Chamada para o WAHA (Porta 3005)
        const response = await fetch('http://localhost:3005/api/sendText', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': 'n8n-waha-2026'
            },
            body: JSON.stringify({
                chatId: `${cleanPhone}@c.us`,
                text: message,
                session: "default"
            }),
        });

        const data = await response.json();

        // 5. Verificamos se o envio foi bem sucedido
        if (!response.ok) {
            console.error('Erro no motor WAHA:', data);
            return NextResponse.json(
                { error: data.message || 'Falha ao enviar mensagem' },
                { status: response.status }
            );
        }

        // 6. Retorno de sucesso para o frontend
        return NextResponse.json({ success: true, data });

    } catch (error) {
        console.error('Erro na Rota de Envio:', error);
        return NextResponse.json(
            { error: 'Erro interno ao processar o envio' },
            { status: 500 }
        );
    }
}