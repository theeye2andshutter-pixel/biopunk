import { useEffect, useRef } from 'react';

const SECTION_SOUNDS: Record<string, 'glitch' | 'heartbeat' | 'click' | 'hover'> = {
  bio: 'heartbeat', musica: 'glitch', foro: 'click', tienda: 'glitch', transmision: 'hover',
};

const sectionNames: Record<string, string> = {
  bio: 'ARCHIVOS CLASIFICADOS', musica: 'FRECUENCIAS OXIDADAS',
  foro: 'LA NUEVA CARNE', tienda: 'BIOMODS', transmision: 'TRANSMISIÓN SATELITAL',
};

export function useSectionObserver(
  bootComplete: boolean,
  playGlitch: () => void,
  playHeartbeat: () => void,
  playClick: () => void,
  playHover: () => void,
  addActivity: (msg: string) => void
) {
  const visitedSections = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!bootComplete) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.section-reveal').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [bootComplete]);

  useEffect(() => {
    if (!bootComplete) return;

    const soundMap = { glitch: playGlitch, heartbeat: playHeartbeat, click: playClick, hover: playHover };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const id = entry.target.id;
        if (entry.isIntersecting && id && SECTION_SOUNDS[id] && !visitedSections.current.has(id)) {
          visitedSections.current.add(id);
          setTimeout(() => soundMap[SECTION_SOUNDS[id]](), 300);
          if (sectionNames[id]) addActivity(`VISITÓ ${sectionNames[id]}`);
        }
      });
    }, { threshold: 0.3 });

    Object.keys(SECTION_SOUNDS).forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [bootComplete, playGlitch, playHeartbeat, playClick, playHover, addActivity]);
}
