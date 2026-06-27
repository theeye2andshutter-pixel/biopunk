// ============================================
// CURSOR BIOMECÁNICO — punto limpio sin jitter
// El hackeo visual ocurre en la PANTALLA, no en el cursor
// ============================================

import { useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/useMobile';

export function BioCursor({ threat = 0 }: { threat?: number }) {
  const dotRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    let mouseX = -100, mouseY = -100;
    let raf = 0;
    let isHover = false;
    let isClicking = false;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onClick = () => {
      isClicking = true;
      setTimeout(() => { isClicking = false; }, 150);
    };

    const animateCursor = () => {
      // Sin jitter — el cursor sigue al mouse con precisión quirúrgica
      let scale = isHover ? 2.5 : 1;
      if (isClicking) scale = 4;
      
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(${scale})`;
      dot.style.transition = isClicking ? 'transform 0.05s ease-out' : 'transform 0.15s ease-out';
      raf = requestAnimationFrame(animateCursor);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const interactive = t.closest('a, button, [role="button"], input, textarea, select');
      if (interactive) {
        isHover = true;
        dot.style.background = '#ff00ff';
        dot.style.boxShadow = '0 0 16px #ff00ff, 0 0 6px white';
      } else {
        isHover = false;
        // El color del punto cambia según la fase de amenaza
        if (threat >= 100) {
          dot.style.background = '#ff0000';
          dot.style.boxShadow = '0 0 16px #ff0000, 0 0 6px #ff00ff';
        } else {
          dot.style.background = '';
          dot.style.boxShadow = '';
        }
      }
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mousedown', onClick, { passive: true });
    raf = requestAnimationFrame(animateCursor);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mousedown', onClick);
      cancelAnimationFrame(raf);
    };
  }, [threat, isMobile]);

  if (isMobile) return null;

  return (
    <div className="bio-cursor pointer-events-none fixed inset-0 z-[2147483647]">
      <div ref={dotRef} className="bio-cursor-dot-center" />
    </div>
  );
}
