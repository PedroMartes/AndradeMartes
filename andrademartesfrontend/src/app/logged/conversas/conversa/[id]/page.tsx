import ChatForm from "./ChatForm";
import { RefreshHelper } from "./RefreshHelper";
import { ScrollHelper } from "./ScrollHelper";
import "./style.css";

interface Message {
    id: string;
    body: string;
    fromMe: boolean;
    timestamp: number;
    hasMedia?: boolean;
    type?: string;
    media?: {
        url: string;
        filename?: string;
        mimetype?: string;
    };
}

export default async function PaginaConversa({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const chatId = decodeURIComponent(resolvedParams.id);

    let messages: Message[] = [];
    let errorMsg = "";

    try {
        const response = await fetch(`http://localhost:3001/api/whatsapp/messages?id=${encodeURIComponent(chatId)}`, {
            cache: 'no-store'
        });

        if (response.ok) {
            const data = await response.json();
            messages = Array.isArray(data) ? data.reverse() : [];
            
            // Lógica para marcar como lida (opcional fazer no server ou no refresh helper)
            // Aqui fazemos uma chamada silenciosa para sua nova rota de "seen"
            fetch(`http://localhost:3001/api/whatsapp/read`, {
                method: 'POST',
                body: JSON.stringify({ chatId }),
                headers: { 'Content-Type': 'application/json' }
            }).catch(() => {}); 

        } else {
            errorMsg = `Erro ${response.status}: Não foi possível carregar o histórico.`;
        }
    } catch (err) {
        errorMsg = "Erro de conexão com o servidor local.";
    }

    const lastMessageId = messages.length > 0 ? messages[messages.length - 1].id : "";
    const displayTitle = chatId.split('@')[0];

    return (
        <div className="chatMainWrapper">
            <div className="chatContainer">
                <header className="chatPageHeader">
                    <div className="headerContent">
                        <a href="/logged/conversas" className="backBtn">←</a>
                        <div className="contactInfo">
                            <h3>{displayTitle}</h3>
                            <p className="onlineStatus">WhatsApp Online</p>
                        </div>
                    </div>
                </header>

                <div className="messagesContainer" id="chat-scroll-container">
                    {errorMsg ? (
                        <div className="chatErrorMsg">{errorMsg}</div>
                    ) : messages.length > 0 ? (
                        messages.map((msg) => (
                            <div key={msg.id} className={`messageRow ${msg.fromMe ? 'sent' : 'received'}`}>
                                <div className="messageBubble">
                                    
                                    {/* RENDERIZAÇÃO DE IMAGEM */}
                                    {msg.hasMedia && msg.type === 'image' && msg.media?.url && (
                                        <div className="chatMediaWrapper">
                                            <img 
                                                src={msg.media.url} 
                                                alt="Imagem do WhatsApp" 
                                                className="chatImageDisplay"
                                            />
                                        </div>
                                    )}

                                    {/* RENDERIZAÇÃO DE ÁUDIO */}
                                    {msg.hasMedia && (msg.type === 'audio' || msg.type === 'ptt') && msg.media?.url && (
                                        <div className="chatMediaWrapper">
                                            <audio controls className="chatAudioPlayer">
                                                <source src={msg.media.url} type={msg.media.mimetype || 'audio/ogg'} />
                                                Seu navegador não suporta áudio.
                                            </audio>
                                        </div>
                                    )}

                                    {/* CORPO DA MENSAGEM (TEXTO OU LEGENDA) */}
                                    {msg.body && <p className="msgText">{msg.body}</p>}
                                    
                                    <span className="messageTime">
                                        {new Date(msg.timestamp * 1000).toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="emptyChat">Nenhuma mensagem encontrada.</div>
                    )}
                </div>

                <ChatForm phone={chatId} />
                <RefreshHelper chatId={chatId} lastMessageId={lastMessageId} />
                <ScrollHelper dependency={messages} />
            </div>
        </div>
    );
}