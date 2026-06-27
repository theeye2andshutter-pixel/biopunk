// ============================================
// GLITCH TEXT — EFECTO DE TEXTO CORRUPTO
// ============================================

import { useState, useEffect, useRef } from 'react';

const GLITCH_CHARS = '!<>-_\\/[]{}—=+*^?#@$%&|~`░▒▓█▄▀■□▪▫';

interface GlitchTextProps {
  text: string;
  duration?: number;
  delay?: number;
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3';
  className?: string;
}

export function GlitchText({ text, duration = 600, delay = 0, as: Tag = 'span', className }: GlitchTextProps) {
  const [displayed, setDisplayed] = useState(text);
  const frameRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const iterRef = useRef(0);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      const totalFrames = Math.floor(duration / 40);
      iterRef.current = 0;

      const animate = () => {
        iterRef.current++;
        const progress = iterRef.current / totalFrames;

        setDisplayed(
          text.split('').map((char, i) => {
            if (char === ' ') return ' ';
            if (i < Math.floor(progress * text.length)) return char;
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          }).join('')
        );

        if (iterRef.current < totalFrames) {
          frameRef.current = setTimeout(animate, 40);
        } else {
          setDisplayed(text);
        }
      };

      animate();
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      if (frameRef.current) clearTimeout(frameRef.current);
    };
  }, [text, duration, delay]);

  return <Tag className={className}>{displayed}</Tag>;
}
