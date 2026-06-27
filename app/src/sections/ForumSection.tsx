// ============================================
// FORUM SECTION - LA NUEVA CARNE (CON IA)
// ============================================

import { useState, useEffect, useRef, useCallback } from 'react';
import { GlitchText } from '@/components/GlitchText';
import { useBioSounds } from '@/hooks/useBioSounds';
import { useNeuralChat } from '@/hooks/useNeuralChat';
import { MessageSquare, Send, User, Terminal } from 'lucide-react';
import type { ForumMessage } from '@/types';
import { db } from '@/lib/firebase';
import { collection, addDoc, onSnapshot, query, orderBy, limit, Timestamp, getDocs, writeBatch } from 'firebase/firestore';
import type { QuerySnapshot, DocumentData } from 'firebase/firestore';
import type { VisitorIdentity } from '@/hooks/useVisitorIdentity';
import { useSessionTime } from '@/hooks/useMetrics';

const AMBIENT_CHATTER = [
  '> Se detectó actividad inusual en el sector 4. Origen: desconocido.',
  '> Nuevo mutante incorporado al registro.',
  '> Interferencia corporativa en frecuencia 440Hz. Redirigiendo señal.',
  '> La red orgánica pulsa. Nuevas conexiones establecidas.',
  '> ALERTA: Patrulla BIOMODS detectada en perímetro Qorikancha.',
  '> Sincronización neural completada. 3 nuevos nodos activos.',
  '> Transmisión encriptada recibida. Decodificando...',
  '> El sector respira. La carne evoluciona.',
  '> Venas verdes vistas en distrito Belén. Cirujano Venenoso activo.',
  '> Micelio negro absorbiendo microondas satelitales. PTLLCT sigue invisible.',
];

function getRelativeTime(date: Date, now: number): string {
  const diff = Math.floor((now - date.getTime()) / 1000);
  if (diff < 60) return `hace ${diff}s`;
  if (diff < 3600) return `hace ${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `hace ${Math.floor(diff / 3600)}h`;
  return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
}

function RelativeTime({ timestamp, className = '' }: { timestamp: Date; className?: string }) {
  useSessionTime();
  return <span className={className}>[{getRelativeTime(timestamp, Date.now())}]</span>;
}

function CurrentTime() {
  useSessionTime();
  return <span>{new Date().toLocaleTimeString()}</span>;
}

const AUTO_POOL = AMBIENT_CHATTER.map((content) => ({
  author: 'SISTEMA_NODO',
  content,
  mutationLevel: 0,
}));

export function ForumSection({ mutationCount, identity }: {
  mutationCount: number;
  identity: VisitorIdentity;
}) {
  const [messages, setMessages] = useState<ForumMessage[]>([]);
  const [persistedMessages, setPersistedMessages] = useState<ForumMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [firstMessageSent, setFirstMessageSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { playClick, playHover, playHeartbeat, playKeyClick, playGlitch } = useBioSounds();
  const { sendMessage: sendNeuralMessage, isLoading: isAILoading } = useNeuralChat();

  // Mensajes persistentes de Firestore
  useEffect(() => {
    const q = query(
      collection(db, 'haters-messages'),
      orderBy('timestamp', 'desc'),
      limit(20)
    );
    const unsub = onSnapshot(q, (snap: QuerySnapshot<DocumentData>) => {
      const loaded: ForumMessage[] = snap.docs.map((doc) => {
        const d = doc.data();
        return {
          id: doc.id,
          author: d.author,
          content: d.content,
          timestamp: d.timestamp instanceof Timestamp ? d.timestamp.toDate() : new Date(d.timestamp),
          isUser: true,
          mutationLevel: d.mutationLevel ?? 5,
          themeColor: d.themeColor ?? '#ff00ff',
        } as ForumMessage & { themeColor: string };
      }).reverse();
      setPersistedMessages(loaded);
    });
    return () => unsub();
  }, []);

  // Chatter ambiental
  useEffect(() => {
    const pushMessage = () => {
      const template = AUTO_POOL[Math.floor(Math.random() * AUTO_POOL.length)];
      setMessages((prev) => [...prev, {
        id: `auto-${Date.now()}`,
        author: template.author,
        content: template.content,
        timestamp: new Date(),
        isUser: false,
        mutationLevel: template.mutationLevel,
      }]);
    };
    const initialTimeout = setTimeout(pushMessage, 3000);
    const interval = setInterval(pushMessage, 30000);
    return () => { clearTimeout(initialTimeout); clearInterval(interval); };
  }, []);

  // Auto-scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (el.scrollHeight - el.scrollTop - el.clientHeight < 100) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages, persistedMessages]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
    playKeyClick();
  }, [playKeyClick]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    const text = newMessage.trim();
    if (!text || isSubmitting || isAILoading) return;

    setIsSubmitting(true);
    playHeartbeat();

    // Comando: limpiar logs
    if (text === '/CLEAR_LOGS') {
      const q = query(collection(db, 'haters-messages'));
      getDocs(q).then((snap) => {
        const batch = writeBatch(db);
        snap.docs.forEach((doc) => batch.delete(doc.ref));
        batch.commit().then(() => {
          setMessages((prev) => [...prev, {
            id: `sys-clear-${Date.now()}`,
            author: 'SISTEMA_NODO',
            content: '> ⚠ PURGA DE SISTEMA: Registros persistentes eliminados.',
            timestamp: new Date(), isUser: false, mutationLevel: 0,
          }]);
          playGlitch();
        });
      });
      setNewMessage('');
      setIsSubmitting(false);
      return;
    }

    let content = text;
    let author = identity.alias;
    let mutLevel = identity.mutationLevel;
    let isSpecial = false;
    let themeColor = '#39ff14';

    // Prefijos especiales
    if (text.startsWith('HTRS ')) {
      content = text.slice(5).trim();
      author = 'H.A.T.E.R_S';
      mutLevel = 9;
      isSpecial = true;
      themeColor = '#a855f7';
    } else if (text.startsWith('ALC ')) {
      content = text.slice(4).trim();
      author = 'Alicy_2099';
      mutLevel = 7;
      isSpecial = true;
      themeColor = '#ec4899';
    } else if (text.startsWith('BIO ')) {
      content = text.slice(4).trim();
      author = 'BIO.MOD';
      mutLevel = 10;
      isSpecial = true;
      themeColor = '#39ff14';
    }

    if (!content) {
      setNewMessage('');
      setIsSubmitting(false);
      return;
    }

    // Mensaje de bienvenida
    if (!firstMessageSent && !isSpecial) {
      setFirstMessageSent(true);
      setMessages((prev) => [...prev, {
        id: `welcome-${Date.now()}`,
        author: 'SISTEMA_NODO',
        content: `> NUEVO OPERADOR DETECTADO: ${identity.alias} — MUT-LVL:${identity.mutationLevel}`,
        timestamp: new Date(),
        isUser: false,
        mutationLevel: 0,
      }]);
    }

    // Guardar en Firebase si es especial
    if (isSpecial) {
      addDoc(collection(db, 'haters-messages'), {
        author, content, timestamp: Timestamp.now(), mutationLevel: mutLevel, themeColor,
      }).catch(() => {});
      if (author === 'H.A.T.E.R_S') identity.incrementMutation();
    }

    identity.addActivity('ENVIÓ TRANSMISIÓN AL FORO');

    // Mostrar mensaje del usuario
    setMessages((prev) => [...prev, {
      id: `user-${Date.now()}`,
      author,
      content,
      timestamp: new Date(),
      isUser: true,
      mutationLevel: mutLevel,
    }]);
    setNewMessage('');

    // Si no es especial, llamar a OpenAI
    if (!isSpecial) {
      try {
        const aiReply = await sendNeuralMessage(text, identity.alias);
        if (aiReply) {
          playGlitch();
          const botAuthor = aiReply.includes('H.A.T.E.R_S') ? 'H.A.T.E.R_S' : 'SISTEMA_NODO';
          setMessages((prev) => [...prev, {
            id: `ai-${Date.now()}`,
            author: botAuthor,
            content: aiReply,
            timestamp: new Date(),
            isUser: false,
            mutationLevel: botAuthor === 'H.A.T.E.R_S' ? 9 : 0,
          }]);
        }
      } catch (error) {
        console.error('Error neural:', error);
        setMessages((prev) => [...prev, {
          id: `sys-err-${Date.now()}`,
          author: 'SISTEMA_NODO',
          content: '> ERROR: Conexión neural inestable.',
          timestamp: new Date(),
          isUser: false,
          mutationLevel: 0,
        }]);
      }
    }

    setIsSubmitting(false);
  }, [newMessage, isSubmitting, isAILoading, playHeartbeat, playGlitch, identity, firstMessageSent, sendNeuralMessage]);

  return (
    <section id="foro" className="section-biohorror section-reveal py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <MessageSquare className="w-8 h-8 text-[#39ff14]" />
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-[#ff00ff] tracking-tighter mb-4">
              <GlitchText text="CHAT CLANDESTINO EN VIVO" duration={1000} />
            </h2>
            <p className="text-sm text-[#39ff14]/60 mt-1">
              Red neural de interceptación. Nodo IA activo.
            </p>
          </div>
        </div>

        <div className="relative border border-[#39ff14]/30 bg-black/80">
          {/* Barra de título */}
          <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-[#0a0a0a] border-b border-[#39ff14]/30 gap-2">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#39ff14]" />
              <span className="text-xs text-[#39ff14]/60 font-mono truncate max-w-[140px] sm:max-w-none">
                interceptacion_cusco_openai.terminal
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="text-[#ff00ff]/60 font-mono text-[10px]">
                {identity.alias} <span className="text-[#ff00ff]/30">[MUT-LVL:{identity.mutationLevel}]</span>
              </span>
              <span className="text-[#39ff14]/40">
                <span className="hidden sm:inline">ONLINE: </span>
                <span className="text-[#39ff14]">{mutationCount.toLocaleString()}</span>
              </span>
            </div>
          </div>

          {/* Instrucción */}
          <div className="bg-[#8b0000]/30 border-b border-[#39ff14]/30 p-2 text-center">
            <span className="text-[10px] text-[#ff6600] font-mono tracking-widest animate-pulse">
              {'>'} NODO IA CONECTADO — IA RESPONDE EN TIEMPO REAL COMO SISTEMA_NODO / H.A.T.E.R_S
            </span>
          </div>

          {/* Mensajes */}
          <div
            ref={scrollRef}
            className="h-64 sm:h-80 overflow-y-auto overflow-x-hidden p-4 font-mono text-sm space-y-3"
            style={{ overscrollBehavior: 'contain' }}
          >
            {persistedMessages.length > 0 && (
              <>
                <div className="text-[10px] text-[#ff00ff]/50 tracking-widest border-b border-[#ff00ff]/10 pb-1 mb-2">
                  ▓ TRANSMISIONES GUARDADAS
                </div>
                {persistedMessages.map((msg) => (
                  <div key={msg.id} style={{ color: (msg as any).themeColor || '#ff00ff' }}>
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                      <RelativeTime timestamp={msg.timestamp} className="text-white/20 text-[10px]" />
                      <span className="font-bold text-xs">{msg.author}</span>
                      <span className="bg-white/10 text-[8px] px-1 py-0.5 rounded border border-white/20 font-bold ml-1 opacity-70">VERIFIED</span>
                      <span className="text-[10px] opacity-50">[MUT-LVL:{(msg as any).mutationLevel ?? 5}]</span>
                    </div>
                    <p className="mt-0.5 leading-relaxed break-words">
                      <span className="text-[#ff00ff]/40">{'>'}</span>{' '}{msg.content}
                    </p>
                    <div className="mt-2 border-b border-[#ff00ff]/10" />
                  </div>
                ))}
                <div className="text-[10px] text-[#39ff14]/20 tracking-widest border-b border-[#39ff14]/10 pb-1 mb-2">
                  ▓ EN VIVO
                </div>
              </>
            )}
            {messages.map((msg) => {
              const isHTRS = msg.author === 'H.A.T.E.R_S';
              const isALC = msg.author === 'Alicy_2099';
              const isBIO = msg.author === 'BIO.MOD';
              const isSpecialUser = isHTRS || isALC || isBIO;
              const userColor = isHTRS ? '#a855f7' : isALC ? '#ec4899' : isBIO ? '#39ff14' : '#39ff14';

              return (
                <div
                  key={msg.id}
                  onMouseEnter={() => { if (Math.random() > 0.7) playHover(); }}
                  style={{ color: isSpecialUser ? userColor : undefined }}
                  className={`transition-all duration-300 hover:bg-white/5 p-1 rounded ${!isSpecialUser ? (msg.isUser ? 'text-[#39ff14]' : 'text-[#39ff14]/70') : ''}`}
                >
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                    <RelativeTime timestamp={msg.timestamp} className="text-[10px] opacity-40" />
                    <span className="font-bold text-xs">{msg.author}</span>
                    {isSpecialUser && (
                      <span className="bg-white/10 text-[8px] px-1 py-0.5 rounded border border-white/20 font-bold ml-1 opacity-70">VERIFIED</span>
                    )}
                    {!msg.isUser && msg.mutationLevel > 0 && (
                      <span className="text-[10px] opacity-50">[MUT-LVL:{msg.mutationLevel}]</span>
                    )}
                  </div>
                  <p className="mt-0.5 leading-relaxed break-words">
                    <span className="opacity-40">{'>'}</span>{' '}{msg.content}
                  </p>
                  <div className="mt-2 border-b border-white/5" />
                </div>
              );
            })}
            {isAILoading && (
              <div className="text-[#39ff14]/50 font-mono text-xs animate-pulse">
                <span className="opacity-40">{'>'}</span> Conectando con nodo neural...
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="border-t border-[#39ff14]/30 p-3 sm:p-4 flex items-center gap-3">
            <User className="w-5 h-5 text-[#39ff14]/40 flex-shrink-0" />
            <input
              type="text"
              value={newMessage}
              onChange={handleInputChange}
              placeholder="Transmite tu señal..."
              autoComplete="off"
              disabled={isSubmitting || isAILoading}
              className="flex-1 min-w-0 bg-transparent border-none outline-none text-[#39ff14] placeholder-[#39ff14]/30 font-mono text-sm disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!newMessage.trim() || isSubmitting || isAILoading}
              onMouseEnter={playHover}
              onClick={playClick}
              className="p-2 text-[#39ff14] hover:text-[#ff00ff] disabled:opacity-30 transition-colors flex-shrink-0"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>

          <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-[#39ff14]" />
          <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-[#39ff14]" />
          <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-[#39ff14]" />
          <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-[#39ff14]" />
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-[#39ff14]/40">
          <div className="flex items-center gap-4">
            <span>PROTOCOLO: TCP/NEURAL/OPENAI</span>
            <span>ENCRIPTACIÓN: AES-4096-BIO</span>
          </div>
          <div>ÚLTIMA SINCRONIZACIÓN: <CurrentTime /></div>
        </div>
      </div>
    </section>
  );
}
