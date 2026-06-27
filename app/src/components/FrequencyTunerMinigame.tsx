// ============================================
// FrequencyTunerMinigame — SINTONIZADOR NEURAL
// Funcional en web y móvil con pointer events
// ============================================

import { useState, useEffect, useCallback, useRef, memo } from 'react';
import { useBioSounds } from '@/hooks/useBioSounds';

export const FrequencyTunerMinigame = memo(function FrequencyTunerMinigame({
  onSuccess, onFailure, onFatalFailure
}: {
  onSuccess: () => void;
  onFailure?: () => void;
  onFatalFailure: () => void;
}) {
  const [frequency, setFrequency] = useState(50);
  const [targetFrequency] = useState(() => Math.floor(Math.random() * 60) + 20);
  const [isLocked, setIsLocked] = useState(false);
  const [matchTime, setMatchTime] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [failures, setFailures] = useState(0);
  const [status, setStatus] = useState<'playing' | 'success' | 'fatal'>('playing');
  const isDraggingRef = useRef(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const { playHover, playSuccess, playGlitch } = useBioSounds();

  const isMatching = Math.abs(frequency - targetFrequency) < 6;
  const diff = Math.abs(frequency - targetFrequency);
  const signalStrength = Math.max(0, 100 - diff * 4);

  // Progreso de señal bloqueada
  useEffect(() => {
    if (isLocked || status !== 'playing') return;
    if (isMatching) {
      const t = setTimeout(() => {
        setMatchTime(prev => {
          const next = prev + 12;
          if (next >= 100) {
            setIsLocked(true);
            setStatus('success');
            playSuccess();
            setTimeout(onSuccess, 800);
            return 100;
          }
          return next;
        });
      }, 200);
      return () => clearTimeout(t);
    } else {
      if (matchTime > 0) {
        setMatchTime(prev => Math.max(0, prev - 5));
        playGlitch();
      }
    }
  }, [isMatching, matchTime, isLocked, status, onSuccess, playSuccess, playGlitch]);

  // Countdown timer
  useEffect(() => {
    if (isLocked || status !== 'playing') return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          const newFailures = failures + 1;
          setFailures(newFailures);
          playGlitch();
          if (newFailures >= 3) {
            setIsLocked(true);
            setStatus('fatal');
            onFatalFailure();
          } else {
            onFailure?.();
            setFrequency(50);
            return 20;
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isLocked, failures, status, onFatalFailure, onFailure, playGlitch]);

  // Calcular frecuencia desde posición X del slider
  const updateFreqFromPointer = useCallback((clientX: number) => {
    if (!sliderRef.current || isLocked) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    const newFreq = Math.round(ratio * 100);
    setFrequency(newFreq);
    if (Math.random() > 0.8) playHover();
  }, [isLocked, playHover]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (isLocked) return;
    isDraggingRef.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    updateFreqFromPointer(e.clientX);
  }, [isLocked, updateFreqFromPointer]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDraggingRef.current || isLocked) return;
    updateFreqFromPointer(e.clientX);
  }, [isLocked, updateFreqFromPointer]);

  const handlePointerUp = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  const signalColor = isMatching ? '#39ff14' : diff < 20 ? '#ff8800' : '#8b0000';

  return (
    <div className="w-full max-w-sm border border-[#8b0000]/50 bg-black/95 p-5 font-mono select-none shadow-[0_0_20px_rgba(139,0,0,0.3)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 border-b border-[#8b0000]/30 pb-3">
        <span className="text-[10px] tracking-widest" style={{ color: signalColor }}>
          SINTONIZADOR NEURAL
        </span>
        <span className={`text-sm font-bold ${timeLeft <= 5 ? 'text-[#ff0000] animate-pulse' : 'text-[#ff8800]'}`}>
          {timeLeft}s
        </span>
      </div>

      {/* Instrucción */}
      <p className="text-[9px] text-center mb-4 tracking-widest" style={{ color: `${signalColor}80` }}>
        {failures > 0
          ? `⚠ FALLO ${failures}/3 — SINTONIZA LA FRECUENCIA OCULTA`
          : 'ARRASTRA PARA SINTONIZAR • MANTÉN EN ZONA VERDE'}
      </p>

      {/* Visualizador de onda */}
      <div className="relative w-full h-20 border overflow-hidden mb-4 flex items-center"
        style={{ borderColor: `${signalColor}40`, background: '#050505' }}>
        {/* Ruido de fondo estático */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="absolute bottom-0 w-px"
            style={{
              left: `${(i / 20) * 100}%`,
              height: `${10 + Math.random() * 30}%`,
              background: '#8b000030',
            }} />
        ))}
        {/* Línea de objetivo (oculta) */}
        <div className="absolute left-0 right-0 h-px opacity-20"
          style={{
            top: `${50 - (targetFrequency - 50) * 0.6}%`,
            background: '#39ff14',
          }} />
        {/* Línea de señal del usuario */}
        <div className="absolute left-0 right-0 transition-all duration-75"
          style={{
            top: `${50 - (frequency - 50) * 0.6}%`,
            height: isMatching ? '3px' : '1px',
            background: signalColor,
            boxShadow: isMatching ? `0 0 12px ${signalColor}, 0 0 24px ${signalColor}60` : 'none',
          }} />
        {/* Indicador de fuerza de señal */}
        <div className="absolute right-1 top-1 text-[8px] font-bold" style={{ color: signalColor }}>
          {isMatching ? '█ SEÑAL BLOQUEADA' : signalStrength < 30 ? '░ SEÑAL DÉBIL' : '▒ AJUSTANDO'}
        </div>
      </div>

      {/* Control deslizante táctil */}
      <div
        ref={sliderRef}
        className="relative w-full h-10 cursor-ew-resize touch-none mb-4 flex items-center"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* Track */}
        <div className="absolute left-0 right-0 h-1 rounded-full" style={{ background: '#8b000030' }} />
        {/* Fill */}
        <div className="absolute left-0 h-1 rounded-full transition-none"
          style={{ width: `${frequency}%`, background: signalColor }} />
        {/* Thumb */}
        <div className="absolute w-6 h-6 rounded-full border-2 transform -translate-x-1/2 transition-none flex items-center justify-center"
          style={{
            left: `${frequency}%`,
            background: '#050505',
            borderColor: signalColor,
            boxShadow: isMatching ? `0 0 10px ${signalColor}` : 'none',
          }}>
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: signalColor }} />
        </div>
      </div>

      {/* Frecuencia numérica */}
      <div className="text-center text-xs mb-4 font-bold" style={{ color: signalColor }}>
        {(frequency * 1.5 + 88).toFixed(1)} MHz
      </div>

      {/* Barra de progreso de bloqueo */}
      <div className="w-full h-2 bg-black border overflow-hidden" style={{ borderColor: `${signalColor}30` }}>
        <div className="h-full transition-all duration-200" style={{ width: `${matchTime}%`, background: signalColor }} />
      </div>
      <div className="flex justify-between text-[8px] mt-1" style={{ color: `${signalColor}50` }}>
        <span>SEÑAL LIBRE</span>
        <span>BLOQUEADO</span>
      </div>
    </div>
  );
});
