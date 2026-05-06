// src/app/logged/conversas/page.tsx
import Link from "next/link";
import "./style.css";

interface ChatProps {
    id: string;
    name: string | null;
    unreadCount: number;
    timestamp: number;
}

export default async function ConversasPage() {
    let chats: ChatProps[] = [];
    let error = null;

    try {
        const response = await fetch('http://localhost:3001/api/whatsapp/chats', {
            cache: 'no-store'
        });

        if (!response.ok) throw new Error(`Erro: ${response.status}`);
        chats = await response.json();
    } catch (err) {
        console.error("Erro ao carregar chats:", err);
        error = "Erro ao carregar conversas. Verifique a conexão.";
    }

    return (
        <main className="conversasMainContainer">
            <header className="conversasHeader">
                <h1 className="pageTitle">Mensagens</h1>
                <p className="subtitle">Atendimentos e Grupos ativos</p>
            </header>

            <div className="conversasScrollArea">
                {error ? (
                    <div className="errorMessage"><p>{error}</p></div>
                ) : (
                    <div className="coversaCardsContainer">
                        {chats && chats.length > 0 ? (
                            chats.map((chat) => {
                                const isGroup = chat.id.includes('@g.us');
                                const safeId = encodeURIComponent(chat.id);
                                
                                // CORREÇÃO DO ERRO: Garantimos que name seja uma string antes do Array.from
                                // Prioridade: chat.name -> ID sem o sufixo -> "Conversa"
                                const displayName = chat.name || chat.id.split('@')[0] || "Conversa";
                                
                                // Agora o Array.from nunca receberá undefined/null
                                const firstChar = Array.from(displayName)[0] || 'C';

                                return (
                                    <Link 
                                        key={chat.id} 
                                        href={`/logged/conversas/conversa/${safeId}`}
                                        className="conversaLink"
                                    >
                                        <div className="conversaCard">
                                            <div className={`conversaAvatar ${isGroup ? 'groupAvatar' : ''}`}>
                                                {firstChar.toUpperCase()}
                                            </div>
                                            <div className="conversaDetails">
                                                <div className="conversaTopRow">
                                                    <h2 className="conversaCardTitle">{displayName}</h2>
                                                    {chat.timestamp && (
                                                        <span className="chatTime">
                                                            {new Date(chat.timestamp * 1000).toLocaleDateString('pt-BR')}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="conversaBottomRow">
                                                    <p className="lastMsgPreview">
                                                        {isGroup ? "Conversa de Grupo" : "Ver histórico"}
                                                    </p>
                                                    {chat.unreadCount > 0 && (
                                                        <span className="unreadBadge">{chat.unreadCount}</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })
                        ) : (
                            <div className="emptyState">
                                <p>Nenhuma conversa encontrada.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
}