// ============================================================
// useNewEra — Almanaque de la Nueva Carne
// Calendario: 365 días (1 Día Cero + 13 meses de 28 días)
// Modo Rebirth Forzado y Permanente
// ============================================================

import { useState, useEffect } from 'react';

// El Epoch es incondicional, siempre estamos en la Nueva Era.
// Midnight Lima (UTC-5) el 26 de junio = 05:00:00 UTC
export const NEW_ERA_EPOCH = new Date('2026-06-26T05:00:00.000Z');

export const MONTHS_13 = [
  { roman: 'I',    name: 'MANK',    symbol: '⧖',  color: '#ff0000' },
  { roman: 'II',   name: 'SINK',    symbol: '∇',  color: '#8b0000' },
  { roman: 'III',  name: 'LLOK',    symbol: '♀',  color: '#39ff14' },
  { roman: 'IV',   name: 'MAYK',    symbol: '⎔',  color: '#ff6600' },
  { roman: 'V',    name: 'YUPAK',   symbol: '⌸',  color: '#ccff00' },
  { roman: 'VI',   name: 'ROCK',    symbol: '⧇',  color: '#aaaaaa' },
  { roman: 'VII',  name: 'YAHUK',   symbol: '☠',  color: '#ff00ff' },
  { roman: 'VIII', name: 'HUIRAK',  symbol: '☉',  color: '#00ffff' },
  { roman: 'IX',   name: 'PACHAK',  symbol: '⑇',  color: '#ff0080' },
  { roman: 'X',    name: 'TÚPAK',   symbol: '⟠',  color: '#80ff00' },
  { roman: 'XI',   name: 'HUAYK',   symbol: '❄',  color: '#666666' },
  { roman: 'XII',  name: 'HUASK-r', symbol: 'ϟ',  color: '#ff8800' },
  { roman: 'XIII', name: 'ATAUK',   symbol: '☌',  color: '#ff00ff' },
] as const;

export const PLEYADES_DAYS = [
  { name: 'MAIA',     symbol: '⚬' },
  { name: 'ALCÍONE',  symbol: '🌀' },
  { name: 'ASTEROPE', symbol: '✧' },
  { name: 'CELAENO',  symbol: '◼' },
  { name: 'TÁIGETE',  symbol: '⚿' },
  { name: 'ELECTRA',  symbol: '⚡' },
  { name: 'MÉROPE',   symbol: '⧯' }
] as const;

export type MonthDef = typeof MONTHS_13[number];
export type DayDef = typeof PLEYADES_DAYS[number];

export interface NewEraDate {
  year: number;
  isDayZero: boolean;
  month: MonthDef | null;
  dayOfMonth: number | null; // 1-28
  dayOfWeek: DayDef | null;  // Pleiades day
  totalDays: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface UseNewEraReturn {
  isNewEra: boolean; // Siempre true
  newEraDate: NewEraDate;
}

function computeNewEraDate(now: Date): NewEraDate {
  // Calculamos la hora de Lima, Perú
  const limaTimeStr = now.toLocaleString('en-US', { timeZone: 'America/Lima' });
  const limaNow = new Date(limaTimeStr);

  const hours = limaNow.getHours();
  const minutes = limaNow.getMinutes();
  const seconds = limaNow.getSeconds();

  // En este lore, el año 0 inició con la Nueva Era, y calculamos el paso del tiempo en días.
  // Ajustamos el inicio a medianoche Lima si queremos que los días cambien a medianoche en Lima.
  const epochLimaStr = NEW_ERA_EPOCH.toLocaleString('en-US', { timeZone: 'America/Lima' });
  const epochLima = new Date(epochLimaStr);
  const epochMidnight = new Date(epochLima.getFullYear(), epochLima.getMonth(), epochLima.getDate());
  const todayMidnight = new Date(limaNow.getFullYear(), limaNow.getMonth(), limaNow.getDate());
  const totalDays = Math.max(0, Math.floor((todayMidnight.getTime() - epochMidnight.getTime()) / (1000 * 60 * 60 * 24)));

  // Cada año tiene 365 días.
  const year = Math.floor(totalDays / 365);
  const dayOfYear = totalDays % 365;

  // El primer día del año es el Día 0.
  const isDayZero = dayOfYear === 0;

  let month: MonthDef | null = null;
  let dayOfMonth: number | null = null;
  let dayOfWeek: DayDef | null = null;

  if (!isDayZero) {
    // Si no es Día 0, estamos en uno de los 364 días divididos en 13 meses de 28 días.
    const dayWithoutZero = dayOfYear - 1; // 0 a 363
    const monthIdx = Math.floor(dayWithoutZero / 28);
    month = MONTHS_13[Math.min(12, monthIdx)];
    
    // Día del mes (1 a 28)
    dayOfMonth = (dayWithoutZero % 28) + 1;

    // Día de la semana (Las 7 Pléyades)
    const weekDayIdx = dayWithoutZero % 7;
    dayOfWeek = PLEYADES_DAYS[weekDayIdx];
  }

  return { year, isDayZero, month, dayOfMonth, dayOfWeek, totalDays, hours, minutes, seconds };
}

export function useNewEra(): UseNewEraReturn {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // La Nueva Era es incondicional ahora
  return {
    isNewEra: true,
    newEraDate: computeNewEraDate(now),
  };
}
