// ============================================
// HERO SECTION - EL RELOJ DEL FIN / LA NUEVA CARNE
// ============================================

import { useMemo, useEffect, useRef } from 'react';
import { useSessionTime } from '@/hooks/useMetrics';
import { useBioSounds } from '@/hooks/useBioSounds';
import { useHorrorTranslation } from '@/hooks/useHorrorTranslation';
import { useNewEra } from '@/hooks/useNewEra';
import { SocialLinks } from '@/components/SocialLinks';
import { NewEraCounter } from '@/components/NewEraCounter';
import { Skull, AlertTriangle } from 'lucide-react';

const HERO_PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i, left: (i * 41.7 + 5) % 100,
  delay: (i * 0.6) % 10, duration: 10 + (i * 0.8) % 10,
}));

export function HeroSection({ mutationCount, threatLevel, isReborn }: {
  mutationCount: number;
  threatLevel: number;
  isReborn?: boolean;
}) {
  const sessionSeconds = useSessionTime();
  const { translate } = useHorrorTranslation(!!isReborn);
  const { isNewEra } = useNewEra();
  const { playKeyClick } = useBioSounds();
  const mountedRef = useRef(false);
  const isBugged = !!isReborn;

  // Tick sutil cada segundo (sólo antes de la era)
  useEffect(() => {
    if (!mountedRef.current) { mountedRef.current = true; return; }
    if (!isNewEra && !isBugged) playKeyClick();
  }, [isNewEra, isBugged, playKeyClick]);

  const heroOverlayColor = isNewEra
    ? 'rgba(60,0,0,0.82)'      // Deep blood tint after epoch
    : 'rgba(0,0,0,0.70)';

  const heroParticles = useMemo(() => HERO_PARTICLES.map((p) => (
    <div key={p.id} className="particle" style={{
      left: `${p.left}%`, animationDelay: `${p.delay}s`, animationDuration: `${p.duration}s`,
    }} />
  )), []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-12 overflow-hidden"
    >
      {/* Fondo con imagen Biohorror */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/hero-bg.jpg)' }}
      >
        <div className="absolute inset-0 transition-colors [transition-duration:3000ms]" style={{ background: heroOverlayColor }} />
      </div>
      <div className="absolute inset-0 bio-texture" />

      {/* Blood vein overlay — after new era */}
      {isNewEra && (
        <div className="absolute inset-0 pointer-events-none opacity-20"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, #8b000060 0%, transparent 60%), radial-gradient(ellipse at 0% 100%, #8b000040 0%, transparent 50%), radial-gradient(ellipse at 100% 80%, #8b000040 0%, transparent 50%)' }} />
      )}
      
      {/* Rust scan lines — more intense after era */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139,20,0,0.6) 2px, rgba(139,20,0,0.6) 4px)' }} />

      {/* Líneas decorativas */}
      <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#39ff14]/20 to-transparent" />
      <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#ff00ff]/20 to-transparent" />
      {isNewEra && (
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#ff0000]/30 to-transparent animate-pulse" />
      )}

      {/* Contenido principal */}
      <div className="relative z-10 text-center max-w-5xl mx-auto">
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <div className="relative w-24 h-24 md:w-32 md:h-32">
            <img
              src="/images/haters-logo.png"
              alt="H.A.T.E.R_S"
              className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(57,255,20,0.8)] animate-pulse"
              style={isNewEra ? { filter: 'hue-rotate(290deg) saturate(1.5)' } : undefined}
            />
            <div className="absolute inset-0 blur-xl opacity-50">
              <img
                src="/images/haters-logo.png"
                alt=""
                className="w-full h-full object-contain"
                style={{ filter: 'hue-rotate(180deg) brightness(1.5)' }}
              />
            </div>
          </div>
        </div>

        {/* Badge de advertencia */}
        <div className="inline-flex items-center gap-2 px-3 py-2 mb-6 border border-[#ff00ff]/50 bg-[#ff00ff]/10 max-w-full">
          <AlertTriangle className="w-4 h-4 text-[#ff00ff] flex-shrink-0" />
          <span className="text-[10px] sm:text-xs text-[#ff00ff] tracking-widest text-center">
            {isNewEra
              ? translate("◈ ERA NUEVA — LA VIEJA CARNE HA COLAPSADO ◈")
              : translate("PROTOCOLO 'LA NUEVA CARNE' ACTIVO")}
          </span>
        </div>

        {/* Título principal */}
        <h1 className="mb-4">
          <span
            className="drip-text block text-6xl md:text-8xl lg:text-[11rem] font-black tracking-tighter terminal-font"
            data-text={translate('BIO-PUNK')}
            style={{
              color: '#39ff14',
              textShadow: isNewEra
                ? `0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 40px #8b0000, 4px 4px 0px #ff00ff, -2px -2px 0px #39ff14`
                : `0 0 10px #39ff14, 0 0 20px #39ff14, 0 0 40px #39ff14, 4px 4px 0px #ff00ff, -2px -2px 0px #00ffff`,
              letterSpacing: '0.1em',
            }}
          >
            {translate('BIO-PUNK')}
          </span>
          <span className="flex items-center justify-center gap-4 mt-1">
            <span
              className="drip-text text-2xl md:text-4xl lg:text-5xl font-black terminal-font"
              data-text={translate('EL METAL')}
              style={{ color: '#ff00ff', textShadow: `0 0 10px #ff00ff, 0 0 20px #ff00ff, 2px 2px 0px #39ff14`, letterSpacing: '0.25em' }}
            >
              {translate('EL METAL')}
            </span>
            <span className="terminal-font text-2xl opacity-40" style={{ color: '#39ff14' }}>·</span>
            <span
              className="drip-text text-2xl md:text-4xl lg:text-5xl font-black terminal-font"
              data-text={translate('LA CARNE')}
              style={{ color: '#ff00ff', textShadow: `0 0 10px #ff00ff, 0 0 20px #ff00ff, 2px 2px 0px #39ff14`, letterSpacing: '0.25em' }}
            >
              {translate('LA CARNE')}
            </span>
          </span>
        </h1>

        {/* Separador */}
        <div className="flex items-center justify-center gap-4 my-8">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#39ff14]" />
          <Skull className="w-6 h-6 text-[#ff00ff]" />
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#39ff14]" />
        </div>

        {/* ── CONTADOR (Countdown o Nueva Era) ── */}
        <div className="mb-8">
          {!isNewEra && (
            <p className="text-xs text-[#39ff14]/40 mb-4 tracking-widest uppercase">
              {translate('El Reloj del Juicio — 26 de Junio 2026')}
            </p>
          )}
          <NewEraCounter />
        </div>

        {/* Redes sociales */}
        <SocialLinks className="mb-10" />

        {/* Mensaje de estado */}
        <div className="mt-12 p-4 border bg-black/50 max-w-2xl mx-auto"
          style={{ borderColor: isNewEra ? '#ff000040' : '#39ff1440' }}>
          <p className="text-sm font-mono" style={{ color: isNewEra ? '#ff000099' : '#39ff1499' }}>
            <span style={{ color: '#ff00ff' }}>{'>'}</span> SECTOR CUSCO 2099 ONLINE
          </p>
          <p className="text-sm font-mono mt-1" style={{ color: isNewEra ? '#ff000099' : '#39ff1499' }}>
            <span style={{ color: '#ff00ff' }}>{'>'}</span> MUTANTES EN LA RED:{' '}
            <span style={{ color: isNewEra ? '#ff0000' : '#39ff14' }}>{mutationCount.toLocaleString()}</span>
          </p>
          <p className="text-sm font-mono mt-1" style={{ color: isNewEra ? '#ff000099' : '#39ff1499' }}>
            <span style={{ color: '#ff00ff' }}>{'>'}</span> ESTADO DE LA RED:{' '}
            <span style={{ color: isNewEra ? '#ff0000' : isBugged ? '#ff00ff' : '#39ff14' }}>
              {isNewEra ? 'NUEVA ERA ACTIVA' : isReborn ? 'RENACIDO' : threatLevel > 80 ? 'CRÍTICA' : sessionSeconds >= 60 ? 'MONITOREADA' : 'ESTABLE'}
            </span>
          </p>
          {isNewEra && (
            <p className="text-[10px] text-[#ff0000]/40 font-mono mt-2 animate-pulse tracking-widest">
              {'>'} FASE OMEGA EN CURSO
            </p>
          )}
        </div>
      </div>

      {/* Partículas orgánicas decorativas */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {heroParticles}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <span className="text-xs text-[#39ff14]/40 mb-2 tracking-widest">DESCENDER</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#39ff14] to-transparent animate-pulse" />
      </div>
    </section>
  );
}
