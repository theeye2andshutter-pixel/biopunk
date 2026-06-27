// ============================================
// BIO SECTION - LORE DE LA RESISTENCIA
// ============================================

import { useState, useEffect, useRef } from 'react';
import { resistanceLore } from '@/data/bioData';
import { useBioSounds } from '@/hooks/useBioSounds';
import { useCartStore } from '@/store/cartStore';
import { FileText, Lock, Unlock, Terminal, Dna, Calendar } from 'lucide-react';
import type { VisitorIdentity } from '@/hooks/useVisitorIdentity';
import { GlitchText } from '@/components/GlitchText';
import { TerminalMinigame } from '@/components/TerminalMinigame';
import { triggerTrauma } from '@/hooks/useBiohorrorEffects';
import { useHorrorTranslation } from '@/hooks/useHorrorTranslation';
import { useNewEra } from '@/hooks/useNewEra';

// Archivos que se desbloquean mientras el IDC va BAJANDO (idc <= unlockAt)
// Con IDC=100 no hay ninguno. Al bajar, se van abriendo en cascada.
const PROGRESSIVE_FILES = [
  {
    unlockAt: 85,
    title: 'FRAGMENTO_01.dat',
    category: 'CORPORATIVO',
    color: '#ff8800',
    content: '> BIOMODS CORP // REGISTRO INTERNO [CLASIFICADO]\n> "El tejido parasitario se asimila a un 15%. La corporación piensa que lo controlan, pero he visto cómo la Biomasa reacciona todavía... Está viva!."',
  },
  {
    unlockAt: 70,
    title: 'FRAGMENTO_02.dat',
    category: 'INTERCEPTADO',
    color: '#39ff14',
    content: '> TRANSMISIÓN ENCRIPTADA — ORIGEN: DESCONOCIDO\n> "Los implantes neurales muestran visiones sangrientas. La \'falla\' se contagia por audio."',
  },
  {
    unlockAt: 55,
    title: 'FRAGMENTO_03.dat',
    category: 'H.A.T.E.R_S',
    color: '#cc44ff',
    content: '> NOTA INTERNA — H.A.T.E.R_S SECTOR CUSCO\n> "Ya no uso teclados. Los nódulos de mi muñeca izquierda vibran y el código se transmite directamente a la red BIOMODS, no es un grupo, es un sistema inmune."',
  },
  {
    unlockAt: 40,
    title: 'FRAGMENTO_04.dat',
    category: 'BIOHORROR',
    color: '#8b0000',
    content: '> REGISTRO MÉDICO — SUJETO 7734 [REDACTADO]\n> "Día 65. El implante ocular ha sido asimilado. Ya no veo el mundo físico, veo las señales. Veo a todos los mutantes del Sector respirando al mismo tiempo, todos estamos en el servidor."',
  },
  {
    unlockAt: 25,
    title: 'FRAGMENTO_05.dat',
    category: 'CLASIFICADO_9',
    color: '#ff4400',
    content: '> CLASIFICADO NIVEL 9 — PROTOCOLO QORIKANCHA\n> "He perdido contacto visual corporativo. La corporación ya no puede rastrearme porque mi sangre hace interferencia. El metal y mi carne ahora son uno solo. La mutación está funcionando?"',
  },
  {
    unlockAt: 12,
    title: 'FRAGMENTO_06.dat',
    category: 'VISCERAL',
    color: '#8b0000',
    content: '> AUTOPSIA DIGITAL — SUJETO ANÓNIMO\n> "Si sientes que el monitor vibra, no es tu pantalla, son tus nervios conectándose al satélite. La fase crítica duele, pero la recompensa es la liberación del control orgánico."',
  },
  {
    unlockAt: 2,
    title: 'FRAGMENTO_07.dat [ÚLTIMO REGISTRO]',
    category: 'TERMINAL',
    color: '#cc44ff',
    content: '> ÚLTIMO REGISTRO — OPERADOR DESCONOCIDO\n> "Alcanzando umbral máximo. Prepárate para el Ritual de ID. La vieja carne va a colapsar, pero sobreviviremos en la red como deidades de silicio y sangre. QUE VIVA LA NUEVA CARNE."',
  },
];

// Texto corrupto para fragmentos bloqueados
const CORRUPTION_CHARS = '▓▒░█▄▀■□▪▫◆◇○●◉⊗⊘⊙⊚⊛⊜⊝';
function corruptText(text: string, intensity = 0.7): string {
  return text.split('').map(char => {
    if (char === '\n') return char;
    if (Math.random() < intensity) {
      return CORRUPTION_CHARS[Math.floor(Math.random() * CORRUPTION_CHARS.length)];
    }
    return char;
  }).join('');
}

interface MutationLog {
  name: string;
  category: string;
  timestamp: Date;
}

export function BioSection({ activityLog, identity, mutationCount, isReborn, idc = 0, onForceRebirth }: {
  activityLog: string[];
  identity?: VisitorIdentity;
  mutationCount: number;
  isReborn?: boolean;
  idc?: number;
  onForceRebirth?: () => void
}) {
  const [isDecrypted, setIsDecrypted] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const { playGlitch, playKeyClick } = useBioSounds();
  const { translate } = useHorrorTranslation(!!isReborn);
  const [mutationLog, setMutationLog] = useState<MutationLog[]>([]);
  const { newEraDate } = useNewEra();
  const daysSinceZero = newEraDate.totalDays;
  const cartItems = useCartStore((state) => state.items);

  // Registrar cada biomod incorporado
  useEffect(() => {
    if (cartItems.length === 0) return;
    const logs: MutationLog[] = cartItems.map((item) => ({
      name: item.name,
      category: item.category,
      timestamp: new Date(),
    }));
    setMutationLog(logs);
  }, [cartItems]);

  // Corrupción dinámica de fragmentos bloqueados
  const [corruptionTick, setCorruptionTick] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setCorruptionTick(t => t + 1), 800);
    return () => clearInterval(interval);
  }, []);

  // Cursor parpadeante
  useEffect(() => {
    const interval = setInterval(() => setShowCursor(prev => !prev), 500);
    return () => clearInterval(interval);
  }, []);

  // Efecto de desencriptación con typewriter
  useEffect(() => {
    if (!isDecrypted) {
      setDisplayedText('[ARCHIVO ENCRIPTADO - REQUIERE ACCESO NIVEL 5]');
      return;
    }
    let index = 0;
    const text = resistanceLore;
    const interval = setInterval(() => {
      if (index <= text.length) {
        setDisplayedText(text.slice(0, index));
        if (index > 0 && text[index - 1] !== ' ' && text[index - 1] !== '\n') {
          playKeyClick();
        }
        index++;
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      } else {
        clearInterval(interval);
      }
    }, 15);
    return () => clearInterval(interval);
  }, [isDecrypted, playKeyClick]);

  // Voz robótica al desencriptar
  useEffect(() => {
    if (isDecrypted && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(resistanceLore);
      utterance.lang = 'es-ES';
      utterance.pitch = 0.1;
      utterance.rate = 0.8;
      utterance.volume = 0.6;
      const voices = window.speechSynthesis.getVoices();
      const roboticVoice = voices.find(v => v.name.toLowerCase().includes('google español') || v.lang.startsWith('es-'));
      if (roboticVoice) utterance.voice = roboticVoice;
      window.speechSynthesis.speak(utterance);
    }
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isDecrypted]);

  const unlockedFiles = PROGRESSIVE_FILES.filter(f => idc <= f.unlockAt);
  const lockedFiles = PROGRESSIVE_FILES.filter(f => idc > f.unlockAt);

  return (
    <section id="bio" className="section-biohorror section-reveal py-12 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <FileText className="w-8 h-8 text-[#39ff14]" />
          <h2 className="text-3xl md:text-4xl font-bold text-[#39ff14] tracking-wider">
            <GlitchText text={translate('ARCHIVOS CLASIFICADOS')} duration={800} />
          </h2>
        </div>

        {/* Terminal principal de lore */}
        <div className="relative">
          {/* Barra de título */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#0a0a0a] border border-[#8b0000]/50 border-b-0">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#39ff14]" />
              <span className="text-xs text-[#39ff14]/60 font-mono">
                <GlitchText text="resistencia_cusco_2099.dat" duration={500} delay={200} />
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#8b0000]/70 border border-[#8b0000]" />
              <div className="w-3 h-3 rounded-full bg-[#cc44ff]/50 border border-[#cc44ff]/30" />
              <div className="w-3 h-3 rounded-full bg-[#39ff14]/50 border border-[#39ff14]/30" />
            </div>
          </div>

          {/* Contenido del terminal */}
          <div
            ref={containerRef}
            className="relative p-6 bg-black/90 border border-[#8b0000]/40 min-h-[300px] max-h-[400px] overflow-auto font-mono text-sm"
          >
            {!isDecrypted ? (
              <div className="flex flex-col items-center justify-center h-full py-12">
                <Lock className="w-16 h-16 text-[#cc44ff]/50 mb-4" />
                <p className="text-[#8b0000]/70 text-center mb-2 tracking-widest text-xs">
                  ARCHIVO ENCRIPTADO CON PROTOCOLO BIO-MILITAR
                </p>
                <p className="text-[#ff8800]/40 text-center mb-6 text-[10px]">
                  INTRODUCE CÓDIGO DE ACCESO PARA DESENCRIPTAR
                </p>
                <TerminalMinigame
                  onSuccess={() => {
                    playGlitch();
                    setIsDecrypted(true);
                    identity?.addActivity?.('HACKEO EXITOSO: ARCHIVO DESCIFRADO');
                  }}
                  onFailure={() => {
                    triggerTrauma();
                    identity?.addActivity?.('INTENTO DE HACKEO FALLIDO: RASTREO ACTIVADO');
                  }}
                  onFatalFailure={() => {
                    if (onForceRebirth) onForceRebirth();
                  }}
                />
              </div>
            ) : (
              <div className="text-[#39ff14]/80 whitespace-pre-wrap leading-relaxed">
                {displayedText}
                <span className={`inline-block w-2 h-4 ml-1 bg-[#39ff14] ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
              </div>
            )}

            {/* Scanlines */}
            <div
              className="absolute inset-0 pointer-events-none opacity-10"
              style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139,0,0,0.6) 2px, rgba(139,0,0,0.6) 4px)' }}
            />
          </div>

          {/* Decoración de esquinas biopunk */}
          <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-[#8b0000]" />
          <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-[#8b0000]" />
          <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-[#8b0000]" />
          <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-[#8b0000]" />
        </div>

        {/* Panel de estadísticas */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Días desde el Día 0 */}
          <div className="p-4 border border-[#cc44ff]/30 bg-black/60 relative overflow-hidden group">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-3 h-3 text-[#cc44ff]" />
              <span className="text-[9px] text-[#cc44ff]/50 tracking-widest font-mono">DÍAS TRANSCURRIDOS</span>
            </div>
            <div className="text-3xl font-bold text-[#cc44ff] font-mono">
              {daysSinceZero === 0 ? '[ ∅ ]' : String(daysSinceZero).padStart(3, '0')}
            </div>
            <div className="text-[9px] text-[#cc44ff]/40 mt-1 font-mono">
              {daysSinceZero === 0 ? 'DÍA CERO — PUNTO DE INFLEXIÓN' : `DESDE EL DÍA ∅ // CICLO MANK`}
            </div>
            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-[#cc44ff]/10">
              <div className="h-full bg-[#cc44ff]/60 animate-pulse" style={{ width: `${Math.min(100, (daysSinceZero / 365) * 100)}%` }} />
            </div>
          </div>

          {/* Mutantes registrados */}
          <div className="p-4 border border-[#39ff14]/20 bg-black/60 relative overflow-hidden">
            <div className="flex items-center gap-2 mb-1">
              <Dna className="w-3 h-3 text-[#39ff14]" />
              <span className="text-[9px] text-[#39ff14]/50 tracking-widest font-mono">MUTANTES REGISTRADOS</span>
            </div>
            <div className="text-3xl font-bold text-[#39ff14] font-mono">{mutationCount.toLocaleString()}</div>
            <div className="text-[9px] text-[#39ff14]/30 mt-1 font-mono">RED ORGÁNICA ACTIVA</div>
            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-[#39ff14]/10">
              <div className="h-full bg-[#39ff14]/40 animate-pulse" style={{ width: '100%' }} />
            </div>
          </div>

          {/* Nodo de resistencia */}
          <div className="p-4 border border-[#ff8800]/20 bg-black/60 relative overflow-hidden">
            <div className="flex items-center gap-2 mb-1">
              <Terminal className="w-3 h-3 text-[#ff8800]" />
              <span className="text-[9px] text-[#ff8800]/50 tracking-widest font-mono">NODO DE RESISTENCIA</span>
            </div>
            <div className="text-3xl font-bold text-[#ff8800] font-mono">01</div>
            <div className="text-[9px] text-[#ff8800]/30 mt-1 font-mono">SECTOR CUSCO ACTIVO</div>
            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-[#ff8800]/10">
              <div className="h-full bg-[#ff8800]/40 animate-pulse" style={{ width: '100%' }} />
            </div>
          </div>
        </div>

        {/* ── FRAGMENTOS PROGRESIVOS ────────────────────────── */}
        <div className="mt-8 border border-[#8b0000]/40 bg-black/60">
          {/* Header de la sección */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#8b0000]/30 bg-[#8b0000]/10">
            <div className="flex items-center gap-2">
              <Terminal className="w-3 h-3 text-[#39ff14]" />
              <span className="text-[10px] font-mono text-[#39ff14]/70 tracking-widest">
                ARCHIVOS DEL SISTEMA — IDC: {idc}%
              </span>
            </div>
            <span className="text-[10px] font-mono" style={{ color: unlockedFiles.length > 0 ? '#39ff14' : '#8b0000' }}>
              {unlockedFiles.length}/{PROGRESSIVE_FILES.length} FRAGMENTOS
            </span>
          </div>

          <div className="p-3 space-y-2">
            {/* Fragmentos DESBLOQUEADOS */}
            {unlockedFiles.map((file) => (
              <div
                key={file.title}
                className="border p-3 transition-all duration-500"
                style={{
                  borderColor: `${file.color}50`,
                  background: `${file.color}08`,
                  boxShadow: `0 0 10px ${file.color}15`,
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Unlock className="w-3 h-3" style={{ color: file.color }} />
                  <p className="text-[10px] font-mono flex-1" style={{ color: `${file.color}` }}>{file.title}</p>
                  <span className="text-[8px] font-mono px-1 border" style={{ color: file.color, borderColor: `${file.color}50` }}>
                    {file.category}
                  </span>
                  <span className="text-[8px] font-mono text-[#39ff14]/40">● ACCESO CONCEDIDO</span>
                </div>
                <p className="text-xs font-mono leading-relaxed whitespace-pre-line" style={{ color: `${file.color}CC` }}>
                  {file.content}
                </p>
              </div>
            ))}

            {/* Fragmentos BLOQUEADOS — visibles pero corruptos (Solo se muestra 1 a la vez) */}
            {lockedFiles.slice(0, 1).map((file) => (
              <div
                key={file.title}
                className="border p-3 relative overflow-hidden"
                style={{ borderColor: '#8b000030', background: '#0a0a0a' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="w-3 h-3 text-[#8b0000]/60" />
                  <p className="text-[10px] font-mono flex-1 text-[#8b0000]/50">{file.title}</p>
                  <span className="text-[8px] font-mono px-1 border border-[#8b0000]/30 text-[#8b0000]/50">
                    {file.category}
                  </span>
                  <span className="text-[8px] font-mono text-[#ff8800]/60 animate-pulse">
                    ⊗ IDC {'>'} {file.unlockAt}%
                  </span>
                </div>
                {/* Texto corrupto en lugar de ocultar */}
                <p
                  key={corruptionTick}
                  className="text-[10px] font-mono leading-relaxed whitespace-pre-line select-none"
                  style={{ color: '#8b000060', letterSpacing: '0.05em' }}
                  aria-hidden="true"
                >
                  {corruptText(file.content, 0.75)}
                </p>
                {/* Overlay de bloqueo */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(139,0,0,0.04) 3px, rgba(139,0,0,0.04) 6px)',
                  }}
                />
              </div>
            ))}

            {/* Mensaje si no hay nada desbloqueado todavía */}
            {unlockedFiles.length === 0 && (
              <p className="text-[9px] font-mono text-[#ff8800]/60 text-center py-2 animate-pulse">
                ⊗ IDC AL 100% — SIGUE HACIENDO CLIC PARA REVELAR FRAGMENTOS
              </p>
            )}
          </div>
        </div>

        {/* Diario de mutaciones */}
        {mutationLog.length > 0 && (
          <div className="mt-6 border border-[#cc44ff]/30 bg-black/60">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-[#cc44ff]/20 bg-[#cc44ff]/5">
              <Dna className="w-3 h-3 text-[#cc44ff]" />
              <span className="text-[10px] font-mono text-[#cc44ff]/70 tracking-widest">DIARIO DE MUTACIONES — BIOMODS INCORPORADOS</span>
            </div>
            <div className="p-3 space-y-1 max-h-32 overflow-auto">
              {mutationLog.map((log, i) => (
                <div key={i} className="flex items-center gap-2 text-[10px] font-mono">
                  <span className="text-[#cc44ff]/40">[{log.timestamp.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}]</span>
                  <span className="text-[#cc44ff]">{'>'}</span>
                  <span className="text-[#39ff14]/70">{log.name}</span>
                  <span className="text-[#39ff14]/30">— {log.category.toUpperCase()}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Registro de actividad del visitante */}
        {activityLog.length > 0 && (
          <div className="mt-6 border border-[#39ff14]/10 bg-black/40">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-[#39ff14]/10">
              <Terminal className="w-3 h-3 text-[#39ff14]/40" />
              <span className="text-[10px] font-mono text-[#39ff14]/40 tracking-widest">REGISTRO DE ACTIVIDAD — SESIÓN ACTUAL</span>
            </div>
            <div className="p-3 space-y-1 max-h-28 overflow-auto">
              {activityLog.map((entry, i) => (
                <p key={i} className="text-[10px] font-mono text-[#39ff14]/40">
                  <span className="text-[#39ff14]/20">{'>'}</span> {entry}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
