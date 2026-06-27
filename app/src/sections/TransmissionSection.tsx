// ============================================
// TRANSMISSION SECTION - TRANSMISIÓN SATELITAL
// ============================================

import { useState } from 'react';
import { useBioSounds } from '@/hooks/useBioSounds';
import { SocialLinks } from '@/components/SocialLinks';
import { Youtube, Play, Radio, Satellite, Terminal, Lock } from 'lucide-react';
import { GlitchText } from '@/components/GlitchText';
import { useHorrorTranslation } from '@/hooks/useHorrorTranslation';
import { CodeBreakerMinigame } from '@/components/CodeBreakerMinigame';
import { FrequencyTunerMinigame } from '@/components/FrequencyTunerMinigame';

function BandLabIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 2c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8zm-1 4v8l6-4-6-4z"/>
    </svg>
  );
}

export function TransmissionSection({ isReborn, onForceRebirth }: { isReborn?: boolean; onForceRebirth?: () => void }) {
  const { translate } = useHorrorTranslation(!!isReborn);
  const [unlockedLive, setUnlockedLive] = useState(false);
  const [unlockedPodcast, setUnlockedPodcast] = useState(false);
  const [hackingPodcast, setHackingPodcast] = useState(false);
  const [hackingLive, setHackingLive] = useState(false);
  const { playHover, playClick } = useBioSounds();

  return (
    <section id="transmision" className="section-biohorror section-reveal py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <Satellite className="w-8 h-8 text-[#cc44ff]" />
          <h2 className="text-4xl md:text-6xl font-black text-white/90 tracking-tighter">
            <GlitchText text={translate('TRANSMISIÓN SATELITAL')} duration={1200} />
          </h2>
        </div>

        <p className="text-[#39ff14]/60 mb-12 max-w-2xl mx-auto">
          Accede a la propaganda visual de la resistencia. Transmisiones en vivo
          desde las instalaciones clandestinas del Sector Cusco 2099.
        </p>

        <button
          onClick={() => {
            playClick();
            if (!hackingLive && !unlockedLive) setHackingLive(true);
            document.getElementById('live-terminal')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }}
          onMouseEnter={playHover}
          className="group relative inline-flex items-center gap-3 sm:gap-4 px-6 sm:px-12 py-4 sm:py-6 bg-[#ff00ff]/10 border-2 border-[#ff00ff] hover:bg-[#ff00ff]/20 transition-all magenta-pulse w-full sm:w-auto justify-center"
        >
          <div className="relative flex-shrink-0">
            <Play className="w-8 h-8 sm:w-10 sm:h-10 text-[#ff00ff] fill-[#ff00ff]" />
            <div className="absolute inset-0 animate-ping">
              <Play className="w-8 h-8 sm:w-10 sm:h-10 text-[#ff00ff] opacity-30" />
            </div>
          </div>
          <div className="text-left">
            <span className="block text-lg sm:text-xl font-bold text-[#ff00ff]">
              VER TRANSMISIÓN
            </span>
            <span className="text-xs text-[#ff00ff]/60">
              YOUTUBE / CANAL OFICIAL H.A.T.E.R_S
            </span>
          </div>
          <Radio className="w-5 h-5 sm:w-6 sm:h-6 text-[#ff00ff]/50 animate-pulse flex-shrink-0" />
        </button>

        {/* Redes Sociales */}
        <SocialLinks className="mt-8" />

        {/* Información adicional */}
        <div className="mt-12 flex flex-col gap-8">
          <a 
            href="https://www.youtube.com/watch?v=XjU0eXC-ef8"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={playHover}
            onClick={playClick}
            className="p-6 border border-[#39ff14]/20 bg-black/50 hover:border-[#ff0000]/50 hover:bg-[#ff0000]/5 transition-all group max-w-sm mx-auto w-full"
          >
            <Youtube className="w-8 h-8 text-[#ff0000] mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-sm font-bold text-[#39ff14] mb-2">CANAL OFICIAL</h3>
            <p className="text-xs text-[#39ff14]/60">
              Suscríbete para recibir alertas de nuevas transmisiones
            </p>
          </a>
          
          <div className="flex flex-col w-full border border-[#39ff14]/30 bg-black/80 shadow-[0_0_20px_rgba(57,255,20,0.1)] mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Terminal En Vivo 24/7 */}
            <div id="live-terminal" className="relative w-full text-left md:border-r border-[#39ff14]/30 border-b md:border-b-0">
              <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-[#0a0a0a] border-b border-[#39ff14]/30 gap-2">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#39ff14]" />
                  <span className="text-xs text-[#39ff14]/60 font-mono">
                    <GlitchText text="transmision_24_7.live" duration={500} delay={200} />
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff00ff]/50" />
                  <div className="w-3 h-3 rounded-full bg-[#39ff14]/50" />
                </div>
              </div>
              
              <div className="relative p-6 bg-black/80 border border-[#39ff14]/30 min-h-[300px] flex flex-col items-center justify-center font-mono overflow-hidden">
                {!hackingLive && !unlockedLive && (
                  <div className="flex flex-col items-center justify-center cursor-pointer group" onPointerDown={() => { playClick(); setHackingLive(true); }}>
                    <Lock className="w-16 h-16 text-[#ff00ff]/50 mb-4 group-hover:scale-110 transition-transform" />
                    <p className="text-[#39ff14]/40 text-center mb-6 text-sm">
                      EN VIVO 24/7 ENCRIPTADO<br/><span className="text-xs">SE REQUIERE BYPASS DE NÚCLEO</span>
                    </p>
                    <button className="px-6 py-2 bg-[#ff0000]/10 border border-[#ff0000] text-[#ff0000] hover:bg-[#ff0000] hover:text-white transition-colors">
                      INICIAR INFILTRACIÓN
                    </button>
                  </div>
                )}
                {hackingLive && !unlockedLive && (
                  <div className="w-full h-full flex flex-col items-center justify-center animate-in fade-in zoom-in-95">
                     <p className="text-[#ff00ff] mb-4 text-xs animate-pulse">ROMPIENDO FIREWALL CORPORATIVO...</p>
                     <CodeBreakerMinigame 
                        onSuccess={() => {
                          setHackingLive(false);
                          setUnlockedLive(true);
                        }}
                        onFailure={() => {
                          setHackingLive(false);
                        }}
                        onFatalFailure={() => {
                          if (onForceRebirth) onForceRebirth();
                        }}
                     />
                  </div>
                )}
                {unlockedLive && (
                  <div className="w-full h-full flex flex-col animate-in fade-in">
                    <div className="text-[#ff0000] text-center text-[10px] font-bold mb-3 animate-pulse border border-[#ff0000]/30 bg-[#ff0000]/10 py-1">
                      ⚠ EXCESO DE BIOMASA ORGÁNICA DETECTADA EN LA TRANSMISIÓN
                    </div>
                    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                      <iframe
                        src="https://www.youtube.com/embed/XjU0eXC-ef8?autoplay=1"
                        title="H.A.T.E.R_S - Transmisión Oficial"
                        className="absolute inset-0 w-full h-full border-2 border-[#ff00ff]"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                )}
                {/* Scanlines internos */}
                <div className="absolute inset-0 pointer-events-none opacity-20" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 4px)' }} />
              </div>
            </div>

            {/* Terminal Podcast Encriptado */}
            <div className="relative w-full text-left">
              <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-[#0a0a0a] border-b border-[#39ff14]/30 gap-2">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#39ff14]" />
                  <span className="text-xs text-[#39ff14]/60 font-mono">
                    <GlitchText text="podcast_secreto.wav" duration={500} delay={200} />
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff00ff]/50" />
                  <div className="w-3 h-3 rounded-full bg-[#39ff14]/50" />
                </div>
              </div>
              
              <div className="relative p-6 bg-black/80 border border-[#39ff14]/30 min-h-[400px] flex flex-col items-center justify-center font-mono overflow-hidden">
                {/* Contenido Real (Podcasts) Siempre Presente pero condicionalmente Borroso */}
                <div className={`w-full h-full flex flex-col gap-6 transition-all duration-500 ease-in-out ${!unlockedPodcast ? 'blur-md pointer-events-none select-none opacity-50' : 'animate-in fade-in'}`}>
                  <iframe 
                    allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write" 
                    frameBorder="0" 
                    height="200" 
                    style={{ width: '100%', overflow: 'hidden', borderRadius: '10px' }}
                    sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" 
                    src="https://embed.podcasts.apple.com/pe/podcast/biopunk-2099/id1890599072"
                  />
                  <iframe 
                    data-testid="embed-iframe" 
                    style={{ borderRadius: '12px', width: '100%' }} 
                    src="https://open.spotify.com/embed/show/5tdGOiT0Ki5YOzb4e6Ldko?utm_source=generator&theme=0&t=0" 
                    width="100%" 
                    height="200" 
                    frameBorder="0" 
                    allowFullScreen={false}
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                    loading="lazy"
                  />
                </div>

                {/* OVERLAY DE BLOQUEO Y MINIJUEGO */}
                {!unlockedPodcast && (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm p-6 overflow-auto">
                    {!hackingPodcast ? (
                      <div className="flex flex-col items-center justify-center cursor-pointer group w-full" onPointerDown={() => { playClick(); setHackingPodcast(true); }}>
                        <Lock className="w-16 h-16 text-[#ff00ff]/50 mb-4 group-hover:scale-110 transition-transform" />
                        <p className="text-[#39ff14]/40 text-center mb-6 text-sm">
                          SEÑAL ENCRIPTADA<br/><span className="text-xs">SE REQUIERE SINCRONIZACIÓN SATELITAL</span>
                        </p>
                        <button className="px-6 py-2 bg-[#39ff14]/10 border border-[#39ff14] text-[#39ff14] hover:bg-[#39ff14] hover:text-black transition-colors w-full sm:w-auto">
                          INICIAR SINCRONIZACIÓN
                        </button>
                      </div>
                    ) : (
                      <div className="w-full max-w-sm flex flex-col items-center justify-center animate-in fade-in zoom-in-95">
                         <FrequencyTunerMinigame 
                            onSuccess={() => {
                               setHackingPodcast(false);
                               setUnlockedPodcast(true);
                            }} 
                            onFatalFailure={() => {
                               if (onForceRebirth) onForceRebirth();
                            }}
                         />
                      </div>
                    )}
                  </div>
                )}
                {/* Scanlines internos globales */}
                <div className="absolute inset-0 z-30 pointer-events-none opacity-20" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 4px)' }} />
              </div>
            </div>
            </div>
          
            {/* BandLab Transmisión (Módulo Inferior Unificado) */}
            <div className="border-t border-[#39ff14]/30 bg-black w-full overflow-hidden">
               <div className="px-4 py-3 bg-[#0a0a0a] border-b border-[#39ff14]/20 flex items-center justify-between">
                 <div className="flex items-center gap-2">
                   <BandLabIcon className="w-4 h-4 text-[#ff00ff]" />
                   <span className="text-xs text-[#ff00ff]/60 tracking-widest font-mono">MODULO DE AUDIO // BANDLAB RADIO CLANDESTINA</span>
                 </div>
               </div>
             <iframe src="https://www.bandlab.com/embed/collection/?id=50defbee-d00a-f111-a69b-000d3a42e79d"
               allowFullScreen className="w-full block" height="200"
               style={{ border: 'none', filter: 'brightness(0.9) saturate(0.8)' }}
               title="H.A.T.E.R_S en BandLab" />
           </div>
        </div>
        </div>

        {/* Mensaje de estado */}
        <div className="mt-8 p-4 border border-[#8b0000]/40 bg-[#8b0000]/5 inline-block font-mono">
          <p className="text-xs text-[#8b0000]/60">
            <span className="text-[#cc44ff]">{'>'}</span> ESTADO DEL SATÉLITE:{' '}
            <span className="text-[#39ff14]">ONLINE</span>
          </p>
          <p className="text-xs text-[#8b0000]/60 mt-1">
            <span className="text-[#cc44ff]">{'>'}</span> SEÑAL:{' '}
            <span className="text-[#39ff14]">FUERTE</span>
          </p>
          <p className="text-xs text-[#8b0000]/60 mt-1">
            <span className="text-[#cc44ff]">{'>'}</span> INTERFERENCIA CORPORATIVA:{' '}
            <span className="text-[#ff8800]">ACTIVA</span>
          </p>
        </div>
      </div>
    </section>
  );
}
