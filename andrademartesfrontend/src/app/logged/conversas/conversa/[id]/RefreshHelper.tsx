'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export function RefreshHelper({ chatId, lastMessageId }: { chatId: string, lastMessageId: string }) {
    const router = useRouter();
    
    // Armazena o ID da última mensagem exibida
    const currentLastId = useRef(lastMessageId);

    // Sincroniza a referência se o lastMessageId mudar via Server Component
    // (Ex: Quando você envia uma mensagem, o server traz um novo ID)
    if (lastMessageId !== currentLastId.current && lastMessageId !== "") {
        currentLastId.current = lastMessageId;
    }

    useEffect(() => {
        const checkNewMessages = async () => {
            try {
                // 1. Verifica se há novas mensagens no servidor
                const res = await fetch(`/api/whatsapp/messages/check?id=${encodeURIComponent(chatId)}`);
                const data = await res.json();

                // 2. Se houver um novo ID de mensagem detectado
                if (data.lastMessageId && data.lastMessageId !== currentLastId.current) {
                    console.log("Nova mensagem detectada!");
                    
                    currentLastId.current = data.lastMessageId; 
                    
                    // 3. Marca como lida no servidor (via sua nova rota de API)
                    await fetch('/api/whatsapp/read', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ chatId })
                    }).catch(err => console.error("Erro ao marcar como lida:", err));

                    // 4. Atualiza os dados da página (Server Component)
                    router.refresh(); 
                }
            } catch (error) {
                console.error("Erro ao verificar novas mensagens:", error);
            }
        };

        const interval = setInterval(checkNewMessages, 5000); 

        return () => clearInterval(interval);
    }, [chatId, router]);

    return null;
}