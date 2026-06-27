// ============================================================
// NewEraCounter — Display del Calendario de la Nueva Carne
// Antes del Epoch: Countdown regresivo
// Después del Epoch: Count-up con calendario de 13 meses y Día 0
// Rediseño: Interfaz Ocultista / Cyberpunk
// ============================================================

import { memo } from 'react';
import { useNewEra, MONTHS_13, PLEYADES_DAYS } from '@/hooks/useNewEra';

function pad(n: number) { return String(n).padStart(2, '0'); }

// Indicador del mes compacto para el timeline
function TimelineBadge({ month, active }: { month: typeof MONTHS_13[number]; active: boolean }) {
  return (
    <div
      className="flex flex-col items-center justify-center flex-1 py-2 border-r last:border-r-0 transition-all"
      style={{
        borderColor: '#ff000020',
        background: active ? `${month.color}20` : 'transparent',
        boxShadow: active ? `inset 0 0 15px ${month.color}40` : 'none',
      }}
    >
      <span className="text-lg leading-none" style={{ color: active ? month.color : `${month.color}40` }}>
        {month.symbol}
      </span>
      {active && (
        <span className="text-[6px] font-mono tracking-widest mt-1 uppercase" style={{ color: month.color }}>
          {month.name}
        </span>
      )}
    </div>
  );
}

// Indicador de la secuencia diaria (reemplaza mención explícita a Pléyades)
function SequenceOrb({ day, active }: { day: typeof PLEYADES_DAYS[number]; active: boolean }) {
  return (
    <div 
      className="flex flex-col items-center justify-center transition-all duration-500"
      style={{
        opacity: active ? 1 : 0.3,
        transform: active ? 'scale(1.2)' : 'scale(0.9)',
      }}
    >
      <span className="text-2xl" style={{ color: active ? '#ff0000' : '#ff000050', textShadow: active ? '0 0 15px #ff0000' : 'none' }}>
        {day.symbol}
      </span>
    </div>
  );
}

export const NewEraCounter = memo(function NewEraCounter({ compact = false }: { compact?: boolean }) {
  const { isNewEra, newEraDate } = useNewEra();

  /* ── COUNT-UP (NUEVA ERA - REDISEÑO OCCULT/CYBERPUNK) ─────────── */
  if (isNewEra && newEraDate) {
    const { year, isDayZero, month, dayOfMonth, dayOfWeek, hours, minutes, seconds, totalDays } = newEraDate;

    if (compact) {
      if (isDayZero) {
        return (
          <div className="font-mono flex items-center gap-2 px-3 py-1 border border-[#ff00ff]/40 bg-black/90">
            <span style={{ color: '#ff00ff' }}>[ ∅ ]</span>
          </div>
        );
      }
      return (
        <div className="font-mono flex items-center gap-2 px-3 py-1 border border-[#ff0000]/40 bg-black/90">
          <span className="text-[10px] text-[#ff0000]/80 tracking-widest uppercase">
            {dayOfWeek!.name}, {dayOfMonth} DE {month!.name} // {dayOfWeek!.symbol}-{dayOfMonth}-{month!.symbol}
          </span>
        </div>
      );
    }

    return (
      <div className="font-mono w-full max-w-4xl mx-auto select-none">
        <div className="border-t-2 border-b-2 border-[#ff0000]/40 bg-black/95 p-6 sm:p-10 relative overflow-hidden"
             style={{ boxShadow: '0 0 40px rgba(139,0,0,0.2)' }}>
          
          {/* Background Textures */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{ background: `radial-gradient(circle at 50% 50%, ${isDayZero ? '#ff00ff' : '#ff0000'} 0%, transparent 60%)` }} />
          <div className="absolute inset-0 opacity-[0.15] pointer-events-none"
            style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(255,0,0,0.2) 4px, rgba(255,0,0,0.2) 5px)' }} />

          {/* Header */}
          <div className="flex justify-between items-center w-full text-[9px] sm:text-[11px] text-[#ff0000]/60 tracking-[0.4em] uppercase mb-10 border-b border-[#ff0000]/20 pb-3 relative z-10">
            <span>SISTEMA OMEGA [ACTIVO]</span>
            <span>CICLO {year} // ITERACIÓN {totalDays}</span>
          </div>

          {isDayZero ? (
            /* ========================================================
               UI PARA EL DÍA CERO (DÍA FUERA DEL TIEMPO)
               ======================================================== */
            <div className="flex flex-col items-center justify-center my-12 relative z-10">
              <div className="relative flex items-center justify-center">
                <div className="absolute w-48 h-48 border border-[#ff00ff]/30 rounded-full animate-spin-slow" />
                <div className="absolute w-56 h-56 border border-dashed border-[#ff00ff]/20 rounded-full animate-spin-reverse-slow" />
                <span className="text-8xl sm:text-9xl leading-none text-[#ff00ff] animate-pulse"
                  style={{ textShadow: `0 0 30px #ff00ff, 0 0 60px #ff00ff60` }}>
                  ∅
                </span>
              </div>
              <div className="text-4xl sm:text-5xl font-black tabular-nums text-[#ff00ff] mt-8 tracking-[0.2em]"
                style={{ textShadow: `0 0 20px #ff00ff80` }}>
                DÍA CERO
              </div>
              <div className="text-lg font-bold tracking-[0.4em] mt-3 text-[#ff00ff]/80">
                PUNTO DE INFLEXIÓN
              </div>
            </div>
          ) : (
            /* ========================================================
               UI NORMAL DE LOS 13 MESES
               ======================================================== */
            <div className="flex flex-col items-center relative z-10 my-4">
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-10 sm:gap-16 w-full">
                
                {/* Left Side: SECUENCIA DIARIA */}
                <div className="flex flex-col items-center md:items-end text-center md:text-right">
                  <span className="text-[9px] text-[#ff0000]/50 tracking-[0.4em] mb-2">SECUENCIA</span>
                  <span className="text-2xl sm:text-3xl text-[#ff0000] font-bold tracking-[0.2em]">{dayOfWeek!.name}</span>
                  <span className="text-5xl mt-2 text-[#ff0000]" style={{ textShadow: '0 0 20px #ff000080' }}>
                    {dayOfWeek!.symbol}
                  </span>
                </div>

                {/* Center: DÍA DEL MES (El Núcleo) */}
                <div className="relative flex items-center justify-center w-40 h-40 sm:w-48 sm:h-48">
                  {/* Anillos decorativos */}
                  <div className="absolute inset-0 border-2 rounded-full border-[#ff0000]/20" />
                  <div className="absolute inset-2 border border-dashed rounded-full border-[#ff0000]/30 animate-spin-slow" />
                  
                  <span className="text-7xl sm:text-8xl tabular-nums leading-none font-black" 
                        style={{ color: month!.color, textShadow: `0 0 30px ${month!.color}90` }}>
                    {pad(dayOfMonth!)}
                  </span>
                </div>

                {/* Right Side: MES BIOLÓGICO */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                  <span className="text-[9px] text-[#ff0000]/50 tracking-[0.4em] mb-2">MUTACIÓN (MES)</span>
                  <span className="text-2xl sm:text-3xl font-bold tracking-[0.2em]" style={{ color: month!.color }}>
                    {month!.name}
                  </span>
                  <span className="text-5xl mt-2" style={{ color: month!.color, textShadow: `0 0 20px ${month!.color}80` }}>
                    {month!.symbol}
                  </span>
                </div>

              </div>

              {/* Órbita de la Secuencia de 7 Días */}
              <div className="flex justify-center gap-4 sm:gap-8 mt-12 mb-4 border-t border-b border-[#ff0000]/20 py-3 px-8 bg-[#ff0000]/5">
                {PLEYADES_DAYS.map((d) => (
                  <SequenceOrb key={d.name} day={d} active={d.name === dayOfWeek!.name} />
                ))}
              </div>

            </div>
          )}

          {/* Footer Timeline y Reloj */}
          <div className="mt-10 pt-6 border-t border-[#ff0000]/20 relative z-10">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
              
              {/* Reloj en tiempo real */}
              <div className="text-center sm:text-left">
                <span className="block text-[8px] text-[#ff0000]/50 tracking-[0.3em] mb-1">RELOJ BIOLÓGICO INTERNO</span>
                <div className="text-2xl sm:text-3xl font-black tabular-nums tracking-widest"
                     style={{ color: isDayZero ? '#ff00ff' : '#ff0000', textShadow: `0 0 15px ${isDayZero ? '#ff00ff80' : '#ff000080'}` }}>
                  {pad(hours)}:{pad(minutes)}:{pad(seconds)}
                </div>
              </div>

              {/* Timeline Horizontal de los 13 Meses */}
              <div className="w-full sm:w-2/3 flex border border-[#ff0000]/30 bg-black/50">
                {MONTHS_13.map((m) => (
                  <TimelineBadge key={m.roman} month={m} active={!isDayZero && m.roman === month?.roman} />
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    );
  }

  return null;
});

// Animations required for the redesign
// Agrega estas clases a index.css o usa plugin:
// animate-spin-slow: animation: spin 12s linear infinite
// animate-spin-reverse-slow: animation: spin 15s linear infinite reverse
