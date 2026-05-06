'use client';

import { useEffect } from 'react';

export function ScrollHelper({ dependency }: { dependency: any }) {
    useEffect(() => {
        const container = document.getElementById('chat-scroll-container');
        if (container) {
            // Usa requestAnimationFrame para garantir que o DOM já foi pintado
            requestAnimationFrame(() => {
                container.scrollTop = container.scrollHeight;
            });
        }
    }, [dependency]); // Sempre que 'dependency' (mensagens) mudar, ele rola

    return null;
}