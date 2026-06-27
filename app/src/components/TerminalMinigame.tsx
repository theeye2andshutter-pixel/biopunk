import { useState, useEffect, useCallback, memo } from 'react';
import { useBioSounds } from '@/hooks/useBioSounds';
import { Terminal, Unlock } from 'lucide-react';

export const TerminalMinigame = memo(function TerminalMinigame({ onSuccess, onFailure, onFatalFailure }: { onSuccess: () => void, onFailure?: () => void, onFatalFailure: () => void }) {
  const [position, setPosition] = useState(0);
  const [direction, setDirection] = useState(1);
  const [target] = useState(() => Math.floor(Math.random() * 60) + 20); // 20 to 80
  const [attempts, setAttempts] = useState(3);
  const { playKeyClick, playGlitch, playSuccess } = useBioSounds();
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    if (isLocked) return;
    const interval = setInterval(() => {
      setPosition((prev) => {
        let next = prev + direction * 4;
        if (next >= 100) { next = 100; setDirection(-1); }
        if (next <= 0) { next = 0; setDirection(1); }
        return next;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [direction, isLocked]);

  const handleAttempt = useCallback(() => {
    if (isLocked) return;
    playKeyClick();
    
    // Check if position is within target zone (+- 5%)
    if (Math.abs(position - target) < 8) {
      setIsLocked(true);
      playSuccess();
      setTimeout(onSuccess, 800);
    } else {
      const newAttempts = attempts - 1;
      setAttempts(newAttempts);
      playGlitch();
      if (newAttempts <= 0) {
        setIsLocked(true);
        setTimeout(() => {
          onFailure?.();
          onFatalFailure();
        }, 800);
      } else {
        onFailure?.();
      }
    }
  }, [position, target, attempts, isLocked, onSuccess, onFailure, onFatalFailure, playKeyClick, playGlitch, playSuccess]);

  return (
    <div className="w-full max-w-sm border border-[#39ff14]/30 bg-black/80 p-4 font-mono select-none">
      <div className="flex items-center gap-2 mb-4 border-b border-[#39ff14]/20 pb-2">
        <Terminal className="w-4 h-4 text-[#39ff14]" />
        <span className="text-xs text-[#39ff14]/60">ALINEACIÓN DE NODO DE DATOS</span>
        <span className="ml-auto text-xs text-[#ff00ff]">{attempts} INTENTOS</span>
      </div>
      
      <p className="text-[10px] text-[#39ff14]/40 mb-4 tracking-widest text-center">
        DETÉN EL PULSO DENTRO DE LA ZONA DE CAPTURA
      </p>

      <div className="relative w-full h-8 bg-[#39ff14]/10 border border-[#39ff14]/30 mb-6">
        {/* Target Zone */}
        <div 
          className="absolute top-0 bottom-0 bg-[#ff00ff]/30 border-x border-[#ff00ff]"
          style={{ left: `${target}%`, width: '16%', transform: 'translateX(-50%)' }}
        />
        {/* Moving Pulse */}
        <div 
          className="absolute top-0 bottom-0 w-2 bg-[#39ff14] shadow-[0_0_8px_#39ff14]"
          style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
        />
      </div>

      <button 
        onPointerDown={handleAttempt}
        disabled={isLocked}
        className="w-full py-3 bg-[#39ff14]/10 border border-[#39ff14] text-[#39ff14] hover:bg-[#39ff14] hover:text-black transition-colors font-bold text-sm tracking-[0.2em] flex items-center justify-center gap-2 disabled:opacity-50"
      >
        <Unlock className="w-4 h-4" />
        S I N C R O N I Z A R
      </button>
    </div>
  );
});
