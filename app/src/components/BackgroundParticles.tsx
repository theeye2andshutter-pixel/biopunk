import { useMemo, memo } from 'react';
import { useIsMobile } from '@/hooks/useMobile';

const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  left: (i * 37.3 + 11) % 100,
  top: (i * 53.7 + 7) % 100,
  baseColor: i % 2 === 0 ? '#39ff14' : '#ff00ff',
  opacity: ((i * 0.07) % 0.25) + 0.05,
  duration: 10 + (i * 1.3) % 20,
  delay: (i * 0.7) % 10,
}));

// Buckets de amenaza para evitar re-renders en cada click
function getThreatBucket(threat: number): number {
  if (threat < 40) return 0;
  if (threat < 70) return 1;
  if (threat < 90) return 2;
  return 3;
}

const BUCKET_COLORS: Record<number, [string, string]> = {
  0: ['#39ff14', '#ff00ff'],
  1: ['#ccff00', '#ff8800'],
  2: ['#ff8800', '#ff4400'],
  3: ['#ff0000', '#ff3300'],
};

interface BackgroundParticlesProps {
  threat?: number;
}

export const BackgroundParticles = memo(function BackgroundParticles({ threat = 0 }: BackgroundParticlesProps) {
  const isMobile = useIsMobile();
  const bucket = getThreatBucket(threat);
  const [c0, c1] = BUCKET_COLORS[bucket];

  const particleElements = useMemo(() => {
      const activeParticles = isMobile ? PARTICLES.slice(0, 10) : PARTICLES;
      return activeParticles.map((p) => (
        <div
          key={p.id}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            background: p.baseColor === '#39ff14' ? c0 : c1,
            opacity: p.opacity,
            animation: `float-particle ${p.duration}s infinite linear`,
            animationDelay: `${p.delay}s`,
            willChange: 'transform',
          }}
        />
      ));
    }, [c0, c1, isMobile]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particleElements}
    </div>
  );
});
