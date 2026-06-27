import { useState, useEffect, useRef, useCallback } from 'react';

// ── Textos viscerales para biohorror-mode ─────────────────────────────────────

export function triggerTrauma() {
  const body = document.body;
  body.classList.add('animate-severe-shake');
  setTimeout(() => body.classList.remove('animate-severe-shake'), 800);
}


export function useGlobalDoubleTapGlitch(playGlitch: () => void) {
  useEffect(() => {
    const handler = (e: MouseEvent | TouchEvent) => {
      const target = (e.target as HTMLElement).closest('h1,h2,h3,h4,p,span,button,a,li,img,label,input,div[class]') as HTMLElement | null;
      if (!target) return;
      // Evitar bucles en elementos de control (inputs, forms)
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;
      
      // La probabilidad de glitch disminuye si IDC baja (leemos el data-threat actual)
      const currentThreat = parseInt(document.body.getAttribute('data-threat') || '100', 10);
      if (Math.random() > (currentThreat / 100)) return;

      target.classList.remove('tap-glitch');
      void target.offsetWidth; // reflow para reiniciar animacion
      target.classList.add('tap-glitch');
      playGlitch();
      setTimeout(() => target.classList.remove('tap-glitch'), 350);
    };
    document.addEventListener('click', handler);
    document.addEventListener('touchend', handler as EventListener);
    return () => {
      document.removeEventListener('click', handler);
      document.removeEventListener('touchend', handler as EventListener);
    };
  }, [playGlitch]);
}

export function useBiohorrorEffects(
  bootComplete: boolean,
  playGlitch: () => void,
  playHeartbeat: (threat?: number) => void,
  playWhisper: (threat?: number) => void,
  isNewEra: boolean
) {
  const [blackout, setBlackout] = useState(false);
  const [clickThreat, setClickThreat] = useState(isNewEra ? 100 : 0);

  const threatRef = useRef(isNewEra ? 100 : 0);
  const activatingRef = useRef(false);

  const deactivateBiohacked = useCallback(() => {
    document.documentElement.classList.remove('biohorror-mode');
    document.querySelectorAll<HTMLElement>('[data-original]').forEach((el) => {
      el.textContent = el.getAttribute('data-original') || '';
      el.removeAttribute('data-original');
    });
  }, []);

  const clearThreat = useCallback(() => {
    threatRef.current = 0;
    setClickThreat(0);
    setBlackout(false);
    deactivateBiohacked();
  }, [deactivateBiohacked]);

  // ── CLICK THREAT: Nueva Era (clicks bajan la amenaza) ─────────────────────
  useEffect(() => {
    if (!bootComplete) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('nav') || target.closest('.no-threat')) return;
      const prev = threatRef.current;
      if (prev <= 0) return;
      const next = Math.max(0, prev - 2);
      if (next <= 50 && prev > 50) setBlackout(true);
      threatRef.current = next;
      setClickThreat(next);
      document.body.setAttribute('data-threat', next.toString());
    };
    document.addEventListener('click', handler, { passive: true });
    return () => document.removeEventListener('click', handler);
  }, [bootComplete]);
  // ── IDLE HEARTBEAT ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (!bootComplete) return;
    let idleTimer: ReturnType<typeof setTimeout>;
    const resetTimer = () => {
      clearTimeout(idleTimer);
      const delay = Math.max(2000, 8000 - (clickThreat / 100) * 6000);
      idleTimer = setTimeout(() => {
        playHeartbeat(clickThreat);
        if (clickThreat > 60 && Math.random() > 0.6) playWhisper(clickThreat);
      }, delay);
    };
    document.addEventListener('mousemove', resetTimer, { passive: true });
    document.addEventListener('touchstart', resetTimer, { passive: true });
    document.addEventListener('click', resetTimer, { passive: true });
    resetTimer();
    return () => {
      clearTimeout(idleTimer);
      document.removeEventListener('mousemove', resetTimer);
      document.removeEventListener('touchstart', resetTimer);
      document.removeEventListener('click', resetTimer);
    };
  }, [bootComplete, playHeartbeat, clickThreat, playWhisper]);

  // ── FLASH DE SEÑAL cada 26s ────────────────────────────────────────────────
  useEffect(() => {
    if (!bootComplete) return;
    const interval = setInterval(() => {
      const hero = document.getElementById('hero');
      if (!hero) return;
      hero.style.transition = 'filter 0.05s';
      hero.style.filter = 'brightness(3) hue-rotate(90deg) saturate(5)';
      setTimeout(() => { hero.style.filter = 'invert(0.3)'; }, 60);
      setTimeout(() => { hero.style.filter = 'brightness(2)'; }, 120);
      setTimeout(() => { hero.style.filter = 'none'; hero.style.transition = ''; }, 200);
    }, 26000);
    return () => clearInterval(interval);
  }, [bootComplete]);

  // ── CORRUPCIÓN ALEATORIA DE TEXTOS DINÁMICA ──────────────────────────────
  useEffect(() => {
    if (!bootComplete) return;
    // Si IDC es bajo, glitchear menos a menudo
    const intervalTime = 400 + (100 - clickThreat) * 100;
    const interval = setInterval(() => {
      const all = document.querySelectorAll<HTMLElement>('[data-glitchable]');
      if (all.length === 0) return;
      
      const glitchear = Math.max(1, Math.floor(clickThreat / 30));
      for (let i = 0; i < glitchear; i++) {
        const target = all[Math.floor(Math.random() * all.length)];
        target.classList.add('tap-glitch');
        setTimeout(() => target.classList.remove('tap-glitch'), 220);
      }
    }, intervalTime);
    setTimeout(() => {
      document.querySelectorAll<HTMLElement>('p, span').forEach((el) => {
        if (el.children.length === 0 && el.textContent && el.textContent.length > 5) {
          el.setAttribute('data-glitchable', '1');
        }
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [bootComplete, clickThreat]);

  // ── META-HORROR: TITLE HIJACKING ──────────────────────────────────────────
  useEffect(() => {
    if (!isNewEra) {
      document.title = 'H.a.t.e.r_s: Bio-punk';
      return;
    }
    const titles = [
      '[ REINICIANDO NODO ]',
      '[ CARNE DETECTADA ]',
      '[ 0x43 0x55 0x53 0x43 0x4F ]',
      '[ H.a.t.e.r_s ]',
      '[ ERROR::NULL_FLESH ]'
    ];
    let i = 0;
    const t = setInterval(() => {
      document.title = titles[i % titles.length];
      i++;
    }, 500);
    return () => {
      clearInterval(t);
      document.title = 'H.a.t.e.r_s: Bio-punk';
    };
  }, [isNewEra]);



  // ── VIBRACIÓN HÁPTICA ─────────────────────────────────────────────────────
  useEffect(() => {
    if (!bootComplete || !navigator.vibrate) return;
    const handleVibrate = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('a')) navigator.vibrate(20);
    };
    document.addEventListener('click', handleVibrate);
    return () => document.removeEventListener('click', handleVibrate);
  }, [bootComplete]);

  return {
    blackout,
    clickThreat,
    deactivateBiohacked,
    activateBiohacked: () => {
      if (activatingRef.current) return;
      activatingRef.current = true;
      triggerTrauma();
      playGlitch();
      setTimeout(() => { activatingRef.current = false; }, 1000);
    },
    clearThreat,
    resetThreat: () => {
      threatRef.current = 0;
      setClickThreat(0);
    },
    addThreat: (amount: number) => {
      const prev = threatRef.current;
      const next = Math.min(100, prev + amount);
      threatRef.current = next;
      setClickThreat(Math.floor(next));
      if (next >= 100 && prev < 100) setBlackout(true);
    },
  };
}
