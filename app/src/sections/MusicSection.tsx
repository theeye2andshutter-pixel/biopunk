// ============================================
// MUSIC SECTION - FRECUENCIA OXIDADA
// ============================================

import { useState, useEffect, useRef } from 'react';
import { tracks } from '@/data/bioData';
import { useBioSounds } from '@/hooks/useBioSounds';
import { Play, Pause, SkipForward, SkipBack, Volume2, Radio, AlertTriangle, Zap, Wifi } from 'lucide-react';
import { GlitchText } from '@/components/GlitchText';
import { FrequencyTunerMinigame } from '@/components/FrequencyTunerMinigame';

export function MusicSection({ onForceRebirth }: { idc?: number; onForceRebirth?: () => void }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [progress, setProgress] = useState(0);
  const [overlayDismissed, setOverlayDismissed] = useState(false);
  const [blockedMsg, setBlockedMsg] = useState<string | null>(null);
  const progressInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { playClick, playHover, playGlitch } = useBioSounds();

  const track = tracks[currentTrack];
  const hasRealAudio = !!track.url;

  // Gestión del audio real
  useEffect(() => {
    if (!hasRealAudio) {
      audioRef.current?.pause();
      audioRef.current = null;
      return;
    }
    const audio = new Audio(track.url);
    audioRef.current = audio;
    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      setProgress(0);
    });
    audio.addEventListener('timeupdate', () => {
      if (audio.duration) setProgress((audio.currentTime / audio.duration) * 100);
    });
    if (isPlaying) {
      audio.play().catch(() => {});
    }
    return () => { audio.pause(); audio.src = ''; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [track.url, hasRealAudio]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !hasRealAudio) return;
    if (isPlaying) audio.play().catch(() => {});
    else audio.pause();
  }, [isPlaying, hasRealAudio]);

  // Visualizador gestionado exclusivamente por CSS en el render

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const nextTrack = () => {
    playClick();
    audioRef.current?.pause();
    setIsPlaying(false);
    setCurrentTrack((p) => (p + 1) % tracks.length);
    setProgress(0);
  };

  // Progreso simulado solo para tracks sin audio real
  useEffect(() => {
    if (hasRealAudio) return;
    if (isPlaying) {
      progressInterval.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) { nextTrack(); return 0; }
          return prev + 0.5;
        });
      }, 100);
    } else {
      if (progressInterval.current) clearInterval(progressInterval.current);
    }
    return () => { if (progressInterval.current) clearInterval(progressInterval.current); };
  }, [isPlaying, hasRealAudio, nextTrack]);

  const togglePlay = () => {
    playClick();
    if (!isPlaying) {
      if (!hasRealAudio) {
        playGlitch();
        setBlockedMsg('TRANSMISIÓN BLOQUEADA');
        setTimeout(() => setBlockedMsg(null), 1800);
        return;
      }
      setIsPlaying(true);
      return;
    }
    setIsPlaying(false);
  };


  const prevTrack = () => {
    playClick();
    audioRef.current?.pause();
    setIsPlaying(false);
    setCurrentTrack((p) => (p - 1 + tracks.length) % tracks.length);
    setProgress(0);
  };
  const selectTrack = (i: number) => {
    playClick();
    audioRef.current?.pause();
    setIsPlaying(false);
    setProgress(0);
    setCurrentTrack(i);
    if (!tracks[i].url) {
      playGlitch();
      setBlockedMsg('TRANSMISIÓN BLOQUEADA');
      setTimeout(() => setBlockedMsg(null), 1800);
    }
  };

  const handleUnlock = () => {
    playGlitch();
    setOverlayDismissed(true);
  };

  return (
    <section id="musica" className="section-biohorror section-reveal py-12 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-4 mb-12">
          <Radio className="w-8 h-8 text-[#ff00ff]" />
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#ff00ff] tracking-wider">
              <GlitchText text="FRECUENCIAS OXIDADAS" duration={800} />
            </h2>
            <p className="text-sm text-[#39ff14]/60 mt-1">
              <GlitchText text="Transmisiones desde el subsuelo" duration={600} delay={300} as="span" />
            </p>
          </div>
          {/* Badge de estado - EN VIVO */}
          <div className="ml-auto flex items-center gap-2 px-3 py-1 border border-[#39ff14]/50 bg-[#39ff14]/10">
            <span className="w-2 h-2 rounded-full bg-[#39ff14] animate-ping" />
            <span className="text-[10px] text-[#39ff14] tracking-widest font-mono">EN VIVO</span>
          </div>
        </div>

        {/* Contenedor con overlay */}
        <div className="relative">

          {/* Reproductor (siempre renderizado, funcional) */}
          <div 
            className={`relative p-4 sm:p-8 border border-[#ff0000]/40 bg-gradient-to-b from-[#0a0a0a] to-[#110000] transition-all duration-500 hover:border-[#ff00ff] hover:shadow-[0_0_30px_rgba(255,0,255,0.2)] ${!overlayDismissed ? 'blur-[2px] pointer-events-none select-none' : ''}`}
            onMouseEnter={playHover}
          >
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <div className="w-full h-full" style={{ background: 'radial-gradient(ellipse at center, transparent 0%, rgba(139,69,19,0.3) 100%)' }} />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Panel izquierdo */}
              <div className="lg:col-span-2">
                {/* Visualizador Óptimo CSS */}
                <div className="h-20 sm:h-24 bg-black/50 border border-[#39ff14]/30 mb-6 flex items-end justify-center gap-1 p-3 sm:p-4 overflow-hidden">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div 
                      key={i} 
                      onMouseEnter={playGlitch}
                      className="w-2 bg-gradient-to-t from-[#39ff14] to-[#ff00ff] rounded-t-sm hover:h-full transition-all cursor-crosshair"
                      style={{ 
                        height: isPlaying ? '100%' : '15%',
                        animation: isPlaying 
                          ? `music-bar-dance ${0.4 + (i % 5) * 0.15}s ease-in-out infinite alternate` 
                          : 'none',
                        animationDelay: `${(i % 3) * 0.1}s`,
                        transition: 'height 0.4s ease, filter 0.2s',
                        filter: isPlaying ? 'drop-shadow(0 0 4px #39ff14)' : 'none'
                      }} 
                    />
                  ))}
                </div>

                {/* Info canción */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#39ff14]">
                      <GlitchText text={track.title} duration={400} />
                    </h3>
                    {hasRealAudio && (
                      <span className="text-[9px] text-[#39ff14] border border-[#39ff14]/60 px-1.5 py-0.5 font-mono tracking-wider flex items-center gap-1">
                        <Zap className="w-2.5 h-2.5" />TRANSMISIÓN PARCIAL
                      </span>
                    )}
                  </div>
                  <p className="text-[#ff00ff]"><GlitchText text={track.artist} duration={500} delay={100} /></p>
                  <p className="text-sm text-[#39ff14]/60 mt-2">{track.description}</p>
                </div>

                {/* Progreso */}
                <div className="mb-6">
                  <div className="flex justify-between text-xs text-[#39ff14]/40 mb-2">
                    <span>{Math.floor((progress / 100) * parseInt(track.duration))}:00</span>
                    <span>{track.duration}</span>
                  </div>
                  <div className="h-2 bg-black border border-[#39ff14]/30 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#39ff14] to-[#ff00ff] transition-all duration-100" style={{ width: `${progress}%` }} />
                  </div>
                </div>

                {/* Controles */}
                <div className="relative flex items-center justify-center gap-4 sm:gap-6">
                  <button onClick={prevTrack} onMouseEnter={playHover} className="p-3 text-[#39ff14]/60 hover:text-[#39ff14] border border-[#39ff14]/30 hover:border-[#39ff14] transition-all">
                    <SkipBack className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                  <button onClick={togglePlay} onMouseEnter={playHover} className="p-3 sm:p-4 text-black bg-[#39ff14] hover:bg-[#ff00ff] transition-all magenta-pulse">
                    {isPlaying ? <Pause className="w-7 h-7 sm:w-8 sm:h-8" /> : <Play className="w-7 h-7 sm:w-8 sm:h-8" />}
                  </button>
                  <button onClick={nextTrack} onMouseEnter={playHover} className="p-3 text-[#39ff14]/60 hover:text-[#39ff14] border border-[#39ff14]/30 hover:border-[#39ff14] transition-all">
                    <SkipForward className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                  {/* Mensaje TRANSMISIÓN BLOQUEADA */}
                  {blockedMsg && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="text-[#ff00ff] font-mono font-bold text-sm tracking-widest animate-pulse px-3 py-1 border border-[#ff00ff]/50 bg-black/80">
                        {blockedMsg}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Tracklist */}
              <div className="border-t lg:border-t-0 lg:border-l border-[#39ff14]/20 pt-6 lg:pt-0 lg:pl-6">
                <h4 className="text-sm text-[#39ff14]/60 mb-4 tracking-wider">TRACKLIST</h4>
                <div className="space-y-2">
                  {tracks.map((t, index) => (
                    <button
                      key={t.id}
                      onClick={() => selectTrack(index)}
                      onMouseEnter={playHover}
                      className={`w-full text-left p-3 border transition-all ${
                        index === currentTrack
                          ? 'border-[#39ff14] bg-[#39ff14]/10'
                          : 'border-[#39ff14]/20 hover:border-[#39ff14]/50 hover:bg-[#39ff14]/5'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-bold ${index === currentTrack ? 'text-[#39ff14]' : 'text-[#39ff14]/60'}`}>
                          {index + 1}. {t.title}
                        </span>
                        <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                          {t.url && (
                            <span className="text-[8px] text-[#39ff14] border border-[#39ff14]/50 px-1 py-0.5 font-mono tracking-wider flex items-center gap-0.5">
                              <Zap className="w-2 h-2" />PARCIAL
                            </span>
                          )}
                          <span className="text-xs text-[#39ff14]/40">{t.duration}</span>
                        </div>
                      </div>
                      <p className="text-xs text-[#ff00ff]/60 mt-1">{t.artist}</p>
                    </button>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-[#39ff14]/20">
                  <div className="flex items-center gap-3">
                    <Volume2 className="w-4 h-4 text-[#39ff14]/60 flex-shrink-0" />
                    <div className="flex-1 h-1 bg-[#39ff14]/20">
                      <div className="w-3/4 h-full bg-[#39ff14]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute top-0 right-0 w-32 h-32 bg-[#8b4513]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#39ff14]/5 rounded-full blur-3xl pointer-events-none" />
          </div>

          {/* OVERLAY DE BLOQUEO — MINIJUEGO MEJORADO */}
          {!overlayDismissed && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/95 backdrop-blur-sm p-6"
              style={{ border: '2px solid #8b0000', boxShadow: '0 0 40px rgba(139,0,0,0.6), inset 0 0 40px rgba(139,0,0,0.1)' }}>
              {/* Corner decor */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#ff6600]" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#ff6600]" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#ff6600]" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#ff6600]" />
              
              {/* Scan line animada en el overlay */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute left-0 right-0 h-0.5 bg-[#ff6600]/30" style={{ animation: 'scan-line 2s linear infinite' }} />
              </div>

              <div className="flex items-center gap-3 mb-3">
                <Wifi className="w-6 h-6 text-[#ff6600] animate-pulse" />
                <p className="text-[#ff6600] text-base tracking-[0.25em] font-black font-mono">SEÑAL BLOQUEADA</p>
                <Wifi className="w-6 h-6 text-[#ff6600] animate-pulse" />
              </div>
              <p className="text-[#39ff14]/50 text-[10px] tracking-widest font-mono mb-1">INTERFAZ DE BYPASS NEURAL ACTIVA</p>
              <p className="text-[#ff6600]/60 text-[9px] tracking-[0.3em] font-mono mb-6 text-center">
                SINTONIZA LA FRECUENCIA OCULTA PARA DESBLOQUEAR LA SEÑAL
              </p>

              <FrequencyTunerMinigame 
                onSuccess={handleUnlock} 
                onFatalFailure={() => {
                  if (onForceRebirth) onForceRebirth();
                }}
              />

              <div className="flex items-center gap-2 mt-4 text-[#ff6600]/40 text-[9px] font-mono">
                <AlertTriangle className="w-3 h-3 flex-shrink-0" />
                <span>ACCESO NO AUTORIZADO REGISTRADO — BIOMODS CORP ESTÁ RASTREANDO TU SEÑAL</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-[#39ff14]/40 font-mono">
            {'>'} SEÑAL ORGÁNICA FILTRADA A TRAVÉS DE HUESO Y SILICIO — ORIGEN: DESCONOCIDO
          </p>
        </div>
      </div>
    </section>
  );
}
