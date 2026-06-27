import { useState, useEffect } from 'react';
import { create } from 'zustand';

const JUDGEMENT_DATE = new Date('2026-06-26T16:00:00');
const LAUNCH_DATE = new Date('2025-01-01T00:00:00');
const TOTAL_DAYS = (JUDGEMENT_DATE.getTime() - LAUNCH_DATE.getTime()) / (1000 * 60 * 60 * 24);
const BASE_MUTATIONS = 436;

export const useTimeStore = create<{ seconds: number; inc: () => void }>((set) => ({
  seconds: 0,
  inc: () => set((s) => ({ seconds: s.seconds + 1 })),
}));

// Start the global global session timer precisely once
if (typeof window !== 'undefined') {
  setInterval(() => {
    useTimeStore.getState().inc();
  }, 1000);
}

export function useSessionTime() {
  return useTimeStore((s) => s.seconds);
}

export function useLiveMutations() {
  const VISIT_KEY = 'haters-visit-count';
  const getCount = () => {
    const now = Date.now();
    const daysPassed = Math.max(0, (now - LAUNCH_DATE.getTime()) / (1000 * 60 * 60 * 24));
    const progress = Math.min(1, daysPassed / TOTAL_DAYS);
    const fromTime = Math.floor(BASE_MUTATIONS + progress * (8492 - BASE_MUTATIONS));
    const visits = parseInt(localStorage.getItem(VISIT_KEY) || '0', 10);
    return fromTime + visits;
  };
  
  const [count, setCount] = useState(getCount);
  useEffect(() => {
    const t = setInterval(() => setCount(getCount()), 30000); // sync every 30s
    return () => clearInterval(t);
  }, []);
  
  return count;
}
