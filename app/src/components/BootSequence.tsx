// ============================================
// BOOT SEQUENCE - SECUENCIA DE INICIO BIOHORROR
// ============================================

import { useState, useEffect, useRef } from 'react';
import { bootSequence } from '@/data/bioData';
import { useBioSounds } from '@/hooks/useBioSounds';

interface BootSequenceProps {
  onComplete: () => void;
}

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedText, setDisplayedText] = useState<string[]>(['']);
  const [progress, setProgress] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const { playKeyClick } = useBioSounds();

  // Efecto de parpadeo del cursor
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  // Efecto de escritura de líneas
  useEffect(() => {
    if (currentLine >= bootSequence.length) {
      const completeTimeout = setTimeout(() => {
        onComplete();
      }, 200);
      return () => clearTimeout(completeTimeout);
    }

    const line = bootSequence[currentLine];
    let charIndex = 0;

    const typeInterval = setInterval(() => {
      if (charIndex <= line.length) {
        setDisplayedText((prev) => {
          const newText = [...prev];
          newText[currentLine] = line.slice(0, charIndex);
          return newText;
        });
        if (charIndex > 0) playKeyClick();
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setCurrentLine((prev) => prev + 1);
        }, 38);
      }
    }, 4 + Math.random() * 6);

    return () => clearInterval(typeInterval);
  }, [currentLine, onComplete, playKeyClick]);

  // Actualizar barra de progreso
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        const jump = Math.random() * 50;
        return Math.min(prev + jump, 100);
      });
    }, 30);

    return () => clearInterval(progressInterval);
  }, []);

  // Auto-scroll al final
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [displayedText]);

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-8">
      {/* Contenedor del terminal */}
      <div 
        ref={containerRef}
        className="w-full max-w-3xl h-96 overflow-hidden font-mono text-sm md:text-base"
      >
        {/* Always show at least the current line with cursor */}
        {displayedText.length === 0 || (displayedText.length === 1 && displayedText[0] === '') ? (
          <div className="mb-2 text-[#39ff14]">
            <span className="text-[#ff00ff]">{'>'}</span>{' '}
            <span className={`inline-block w-3 h-5 ml-1 bg-[#39ff14] ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
          </div>
        ) : (
          displayedText.map((line, index) => (
            <div 
              key={index} 
              className={`mb-2 ${
                index === currentLine ? 'text-[#39ff14]' : 'text-[#39ff14]/70'
              }`}
            >
              <span className="text-[#ff00ff]">{'>'}</span>{' '}
              {line}
              {index === currentLine && (
                <span 
                  className={`inline-block w-3 h-5 ml-1 bg-[#39ff14] ${
                    showCursor ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              )}
            </div>
          ))
        )}
      </div>

      {/* Barra de progreso */}
      <div className="w-full max-w-md mt-8">
        <div className="flex justify-between text-xs text-[#39ff14]/60 mb-2">
          <span>CARGANDO SISTEMA</span>
          <span>{Math.floor(progress)}%</span>
        </div>
        <div className="bio-progress">
          <div 
            className="bio-progress-fill transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Mensaje de estado */}
      <div className="mt-6 text-xs text-[#ff00ff]/60 animate-pulse">
        {progress < 100 ? 'ESTABLECIENDO CONEXIÓN NEURAL...' : 'SISTEMA LISTO'}
      </div>

      {/* Efecto de scanlines */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="w-full h-full"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
          }}
        />
      </div>
    </div>
  );
}
