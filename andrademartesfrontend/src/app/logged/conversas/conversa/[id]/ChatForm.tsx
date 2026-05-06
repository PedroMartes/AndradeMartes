'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Importe o router

export default function ChatForm({ phone }: { phone: string }) {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter(); // Instancie o router

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim() || loading) return;

        setLoading(true);

        try {
            const response = await fetch('/api/whatsapp/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone, message: text }),
            });

            if (response.ok) {
                setText('');
                // MUDANÇA AQUI: Atualiza os dados do Server Component sem dar reload
                router.refresh(); 
            } else {
                alert('Erro ao enviar');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSend} className="chatInputContainer">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Escreva uma mensagem..."
                className="chatInput"
                disabled={loading}
            />
            <button type="submit" className="sendButton" disabled={loading || !text.trim()}>
                {loading ? '...' : 'Enviar'}
            </button>
        </form>
    );
}