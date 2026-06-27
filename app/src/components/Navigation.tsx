import { useState, useEffect, useRef, memo } from 'react';
import { useCartStore } from '@/store/cartStore';

import { useBioSounds } from '@/hooks/useBioSounds';
import { ShoppingCart } from 'lucide-react';
import { useHorrorTranslation } from '@/hooks/useHorrorTranslation';
import { GlitchText } from '@/components/GlitchText';

interface NavigationProps {
  biomodsThreat: number;
  mutationCount: number;
  isReborn?: boolean;
  onLogoTripleTap?: () => void;
  antiHackActive?: boolean;
}

const navItems = [
  { id: 'hero',       label: 'BIO' },
  { id: 'bio',        label: 'ARCHIVOS' },
  { id: 'musica',     label: 'FRECUENCIAS' },
  { id: 'foro',       label: 'FORO' },
  { id: 'transmision',label: 'TRANSMISIÓN' },
  { id: 'tienda',     label: 'TIENDA' },
];

export const Navigation = memo(function Navigation({ biomodsThreat, mutationCount, isReborn, onLogoTripleTap, antiHackActive }: NavigationProps) {
  const { translate } = useHorrorTranslation(!!isReborn);
  const [isScrolled, setIsScrolled] = useState(false);
  const { playHover, playClick, playHeartbeat, playGlitch } = useBioSounds();
  const logoTapCount = useRef(0);
  const logoTapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const items = useCartStore((state) => state.items);
  const lastImplant = items.length > 0 ? items[items.length - 1].name : null;

  // AMENAZA = directamente el clickThreat real (0-100)
  const threat = biomodsThreat;
  const threatColor =
    threat < 20 ? '#39ff14' :
    threat < 40 ? '#ccff00' :
    threat < 60 ? '#ff8800' :
    threat < 80 ? '#ff4400' : '#ff0000';

  // Estado de la red: depende del nivel de amenaza
  const networkStatus =
    threat === 0   ? 'ESTABLE' :
    threat < 20    ? 'ACTIVA' :
    threat < 40    ? 'MONITOREADA' :
    threat < 60    ? 'COMPROMETIDA' :
    threat < 80    ? 'INESTABLE' :
    threat < 100   ? 'CRÍTICA' : 'BIOHACKED';

  const networkColor =
    threat < 20  ? '#39ff14' :
    threat < 60  ? '#ccff00' :
    threat < 80  ? '#ff8800' : '#ff0000';

  // MUT-LVL del visitante: baja de 6 a 1 conforme baja el IDC (threat)
  const mutLvl =
    threat >= 85 ? 6 :
    threat >= 70 ? 5 :
    threat >= 55 ? 4 :
    threat >= 40 ? 3 :
    threat >= 20 ? 2 : 1;




  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    playClick();
    const main = document.querySelector('main');
    if (main) {
      main.classList.add('section-glitch-flash');
      setTimeout(() => main.classList.remove('section-glitch-flash'), 260);
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLogoClick = () => {
    scrollToSection('hero');
    logoTapCount.current += 1;
    if (logoTapTimer.current) clearTimeout(logoTapTimer.current);
    if (logoTapCount.current >= 3) {
      logoTapCount.current = 0;
      playHeartbeat();
      onLogoTripleTap?.();
    } else {
      logoTapTimer.current = setTimeout(() => { logoTapCount.current = 0; }, 800);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[99999] transition-all duration-500 font-mono ${
        isScrolled 
          ? 'bg-black/80 backdrop-blur-md border-b-2 border-[#8b0000]/60 shadow-[0_4px_30px_rgba(139,0,0,0.3)]' 
          : 'bg-gradient-to-b from-black/90 to-transparent'
      }`}
    >
      {/* Barra de amenaza biológica (IDC) superior */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-black/60 overflow-hidden">
        <div
          className="h-full transition-all duration-700 ease-out"
          style={{ 
            width: `${threat}%`, 
            background: `linear-gradient(90deg, transparent, ${threatColor})`,
            boxShadow: `0 0 10px ${threatColor}` 
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer group select-none relative" 
            onClick={handleLogoClick}
          >
            <div className="relative">
              <img
                src="/images/haters-logo.png"
                alt="H.A.T.E.R_S"
                className={`w-8 h-8 object-contain transition-all duration-500 ${isReborn ? 'drop-shadow-[0_0_6px_#ff0033]' : 'drop-shadow-[0_0_6px_#39ff14] group-hover:drop-shadow-[0_0_6px_#ff00ff]'}`}
              />
              {antiHackActive && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#ff00ff] rounded-full animate-ping" title="SISTEMA OCULTO" />
              )}
            </div>
            <div className="flex flex-col">
              <span className={`text-xs font-black tracking-widest leading-none ${isReborn ? 'text-[#ff0033]' : 'text-white'}`}>H.A.T.E.R_S</span>
              <span className={`text-[8px] tracking-[0.3em] font-mono leading-none ${isReborn ? 'text-[#ff0033]/60' : 'text-[#39ff14]/60'}`}>Bio-punk</span>
            </div>
          </div>

          {/* Indicadores + carrito (solo iconos en móvil, completo en desktop) */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <div className="hidden lg:flex flex-col items-end gap-0.5">
              <span className="mutation-counter text-[10px] font-mono" style={{ color: '#39ff14' }}>
                MUT-LVL: {mutLvl} <span className="text-[#39ff14]/30">/ 6</span>
              </span>
              <span className="text-[10px] font-mono" style={{ color: threatColor }}>
                AMENAZA: {threat}%
              </span>
              <span className="text-[10px] font-mono text-[#39ff14]/50">
                MUTANTES: {mutationCount.toLocaleString()}
              </span>
              <span className="text-[10px] font-mono" style={{ color: networkColor }}>
                RED: {networkStatus}
              </span>
              {lastImplant && (
                <span className="text-[10px] font-mono text-[#ff00ff]/70 truncate max-w-[120px]" title={lastImplant}>
                  ☣ {lastImplant}
                </span>
              )}
            </div>

            <button onClick={() => { playGlitch(); }} onMouseEnter={playHover}
              className="relative p-2 group transition-all" title="ACCESO DENEGADO">
              <ShoppingCart className={`w-5 h-5 sm:w-6 sm:h-6 transition-all group-hover:drop-shadow-[0_0_8px_#ff0000] text-[#ff0000] tap-glitch`} />
              <span className="sr-only">ACCESO DENEGADO</span>
            </button>
          </div>
        </div>
      </div>

      {/* Nav links container - scrollable on mobile */}
      <div className="w-full bg-black/50 border-t border-[#8b0000]/30 backdrop-blur-sm overflow-x-auto hide-scrollbar">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-start md:justify-center gap-4 sm:gap-6 py-2 min-w-max">
          {navItems.map((item, idx) => (
            <button 
              key={item.id} 
              onClick={() => scrollToSection(item.id)} 
              className={`text-[9px] sm:text-[10px] tracking-widest uppercase transition-all duration-300 border-b-2 border-transparent hover:border-[#ff00ff] px-2 py-1 ${isReborn ? 'text-[#ff0033]/70 hover:text-[#ff0033]' : 'text-[#39ff14]/70 hover:text-[#39ff14] hover:bg-[#39ff14]/10'}`}
            >
              <GlitchText text={translate(item.label)} duration={400} delay={idx * 100} />
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
});
