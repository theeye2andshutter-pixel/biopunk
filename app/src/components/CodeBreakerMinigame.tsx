import { useState, useEffect, useCallback, memo } from 'react';
import { useBioSounds } from '@/hooks/useBioSounds';
import { Cpu } from 'lucide-react';

const CHARS = '0123456789ABCDEF!@#$%^&*()';

export const CodeBreakerMinigame = memo(function CodeBreakerMinigame({ onSuccess, onFailure, onFatalFailure }: { onSuccess: () => void, onFailure?: () => void, onFatalFailure: () => void }) {
  const [targetCode, setTargetCode] = useState<string[]>([]);
  const [status, setStatus] = useState<'playing' | 'success' | 'failure' | 'fatal'>('playing');
  const [failures, setFailures] = useState(0);
  const { playKeyClick, playGlitch, playSuccess } = useBioSounds();

  useEffect(() => {
    // Generate random 4-char target
    const target = Array.from({ length: 4 }).map(() => CHARS[Math.floor(Math.random() * CHARS.length)]);
    setTargetCode(target);
  }, []);

  // Redesign: Codebreaker is just clicking the correct 4 sequence numbers that match the target "encrypted" string.
  // Actually, let's make it a "Find the anomaly" where there's a grid of 9 strings, and one matches the target.
  const [grid, setGrid] = useState<string[]>([]);
  const [anomalyIdx, setAnomalyIdx] = useState(-1);

  useEffect(() => {
    if (targetCode.length === 0) return;
    const items = Array.from({ length: 9 }).map(() => 
      Array.from({ length: 4 }).map(() => CHARS[Math.floor(Math.random() * CHARS.length)]).join('')
    );
    const aIdx = Math.floor(Math.random() * 9);
    items[aIdx] = targetCode.join('');
    setGrid(items);
    setAnomalyIdx(aIdx);
  }, [targetCode]);

  const handleClick = useCallback((idx: number) => {
    if (status !== 'playing') return;
    playKeyClick();
    if (idx === anomalyIdx) {
      setStatus('success');
      playSuccess();
      setTimeout(onSuccess, 800);
    } else {
      const newFailures = failures + 1;
      setFailures(newFailures);
      playGlitch();
      if (newFailures >= 3) {
        setStatus('fatal');
        setTimeout(onFatalFailure, 800);
      } else {
        setStatus('failure');
        onFailure?.();
        setTimeout(() => setStatus('playing'), 1000);
      }
    }
  }, [anomalyIdx, status, failures, onSuccess, onFailure, onFatalFailure, playKeyClick, playGlitch, playSuccess]);


  return (
    <div className="w-full max-w-xs border border-[#ff00ff]/40 bg-black/80 p-4 font-mono select-none">
      <div className="flex items-center gap-2 mb-4 border-b border-[#ff00ff]/20 pb-2">
        <Cpu className="w-4 h-4 text-[#ff00ff]" />
        <span className="text-[10px] text-[#ff00ff]/60 tracking-widest">FIREWALL CORPORATIVO</span>
      </div>
      
      <p className="text-[10px] text-[#39ff14]/60 mb-2 text-center">
        {failures > 0 ? `INTENTOS: ${failures}/3` : 'ENCUENTRA LA LLAVE DE ENCRIPTACIÓN:'}
      </p>
      <div className="text-center text-xl font-bold text-[#ff00ff] mb-4 bg-[#ff00ff]/10 py-2 tracking-[0.2em] border border-[#ff00ff]/30">
        {targetCode.join('')}
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {grid.map((item, idx) => (
          <button 
            key={idx}
            disabled={status !== 'playing'}
            onPointerDown={() => handleClick(idx)}
            className={`p-3 text-sm font-bold tracking-widest border transition-all ${
              (status === 'failure' || status === 'fatal') && idx === anomalyIdx ? 'border-[#39ff14] text-[#39ff14] bg-[#39ff14]/20' :
              (status === 'failure' || status === 'fatal') ? 'border-[#ff0000] text-[#ff0000] bg-[#ff0000]/20' :
              status === 'success' && idx === anomalyIdx ? 'border-[#39ff14] text-[#39ff14] bg-[#39ff14]/20' :
              'border-[#ff00ff]/30 text-[#ff00ff]/70 hover:border-[#ff00ff] hover:text-[#ff00ff] hover:bg-[#ff00ff]/10'
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
});
