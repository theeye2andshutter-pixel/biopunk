// ============================================
// CRT OVERLAY - EFECTO DE PANTALLA CRT
// ============================================

import { useIsMobile } from '@/hooks/useMobile';

export function CRTOverlay({ threat = 0 }: { threat?: number }) {
  const isMobile = useIsMobile();
  const intensity = threat / 100;
  
  return (
    <div className="crt-overlay pointer-events-none">
      {/* Scanlines horizontales — se oscurecen con la amenaza */}
      <div 
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          opacity: isMobile ? (0.05 + intensity * 0.1) : (0.15 + intensity * 0.15),
          background: `
            repeating-linear-gradient(
              0deg,
              rgba(0, 0, 0, 1),
              rgba(0, 0, 0, 1) 1px,
              transparent 1px,
              transparent 2px
            )
          `,
        }}
      />
      
      {/* Líneas de color sutiles — desactivadas en móviles para ahorrar GPU */}
      {!isMobile && (
        <div 
          className="absolute inset-0 opacity-30"
        style={{
          background: `
            repeating-linear-gradient(
              90deg,
              rgba(57, 255, 20, ${0.01 + intensity * 0.04}),
              rgba(57, 255, 20, ${0.01 + intensity * 0.04}) 1px,
              transparent 1px,
              transparent ${3 - intensity * 2}px
            )
          `,
        }}
      />
      )}

      {/* Vignette — se cierra con la amenaza */}
      <div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, transparent 0%, transparent ${60 - intensity * 20}%, rgba(0, 0, 0, ${0.6 + intensity * 0.3}) 100%)`,
        }}
      />

      {/* Línea de scan vertical móvil — se acelera con la amenaza, desactivada en móviles */}
      {!isMobile && (
        <div 
          className="absolute left-0 right-0 h-px bg-[#39ff14]/10"
          style={{
            animation: `scanline-move ${8 - intensity * 6}s linear infinite`,
          }}
        />
      )}

      <style>{`
        @keyframes scanline-move {
          0% { top: 0%; }
          100% { top: 100%; }
        }
      `}</style>
    </div>
  );
}
