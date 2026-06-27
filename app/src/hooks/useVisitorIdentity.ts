// ============================================
// IDENTIDAD DEL VISITANTE — ALIAS + MUTACIÓN
// ============================================

import { useState, useEffect, useCallback } from 'react';
import { useTimeStore } from '@/hooks/useMetrics';

const PREFIXES = [
  'NERVIO', 'CARNE', 'OXIDO', 'HUESO', 'BIOMASA', 'TENDÓN', 'CÓRTEX',
  'GLÁNDULA', 'VENA', 'MÉDULA', 'ESPINA', 'TEJIDO', 'PLASMA', 'FIBRA',
  'MUTANTE', 'SUJETO', 'OPERADOR', 'AGENTE', 'VECTOR', 'NODO',
  'PARÁSITO', 'SIMBIONTE', 'HÍBRIDO', 'FRAGMENTO', 'PROTOCOLO',
];

const SUFFIXES = [
  'CUSCO', 'QORI', 'INKA', 'SACSAY', 'ANDINO', 'SOLAR',
  'NEGRO', 'ROJO', 'VERDE', 'OXIDADO', 'VIVO', 'MUERTO',
  'LIBRE', 'PRESO', 'ROTO', 'FUSIONADO', 'LATENTE',
];

const MODIFIERS = [
  '_X', '_Z', '_ALPHA', '_BETA', '_NULL', '_ERR',
  '_0x', '_SYN', '_BIO', '_NEO', '_ULTRA',
];

function generateAlias(): string {
  const prefix = PREFIXES[Math.floor(Math.random() * PREFIXES.length)];
  const num = Math.floor(Math.random() * 9000) + 1000;
  // 30% chance de añadir sufijo, 20% de modificador
  const r = Math.random();
  if (r < 0.3) {
    const suffix = SUFFIXES[Math.floor(Math.random() * SUFFIXES.length)];
    return `${prefix}_${suffix}`;
  } else if (r < 0.5) {
    const mod = MODIFIERS[Math.floor(Math.random() * MODIFIERS.length)];
    return `${prefix}${mod}${num}`;
  }
  return `${prefix}_${num}`;
}

export interface VisitorIdentity {
  alias: string;
  mutationLevel: number;
  isFirstVisit: boolean;
  activityLog: string[];
  addActivity: (action: string) => void;
  incrementMutation: () => void;
}

export function useVisitorIdentity(): VisitorIdentity {
  const ALIAS_KEY = 'haters-visitor-alias';
  const MUT_KEY = 'haters-mutation-level';
  const FIRST_KEY = 'haters-first-visit';

  const [alias] = useState<string>(() => {
    const stored = localStorage.getItem(ALIAS_KEY);
    if (stored) return stored;
    const newAlias = generateAlias();
    localStorage.setItem(ALIAS_KEY, newAlias);
    return newAlias;
  });

  const [mutationLevel, setMutationLevel] = useState<number>(() => {
    return parseInt(localStorage.getItem(MUT_KEY) || '1');
  });

  const [isFirstVisit] = useState<boolean>(() => {
    const first = !localStorage.getItem(FIRST_KEY);
    if (first) localStorage.setItem(FIRST_KEY, '1');
    return first;
  });

  const [activityLog, setActivityLog] = useState<string[]>([]);

  // Sube nivel de mutación con el tiempo
  useEffect(() => {
    const unsub = useTimeStore.subscribe((state) => {
      const sessionSeconds = state.seconds;
      const thresholds = [30, 60, 120, 180, 300];
      const newLevel = thresholds.filter((t) => sessionSeconds >= t).length + 1;
      
      setMutationLevel((prevLevel) => {
        if (newLevel > prevLevel) {
          localStorage.setItem(MUT_KEY, String(newLevel));
          return newLevel;
        }
        return prevLevel;
      });
    });
    return () => unsub();
  }, []);

  const addActivity = useCallback((action: string) => {
    setActivityLog((prev) => {
      const entry = `[${new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}] ${action}`;
      return [...prev.slice(-9), entry];
    });
  }, []);

  const incrementMutation = useCallback(() => {
    setMutationLevel((prev) => {
      const next = Math.min(9, prev + 1);
      localStorage.setItem(MUT_KEY, String(next));
      return next;
    });
  }, []);

  return { alias, mutationLevel, isFirstVisit, activityLog, addActivity, incrementMutation };
}
