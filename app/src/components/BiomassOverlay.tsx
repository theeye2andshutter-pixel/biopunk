export function BiomassOverlay({ threat = 0 }: { threat?: number }) {
  if (threat < 60) return null;
  const intensity = (threat - 60) / 40; // 0 to 1

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-[60] transition-opacity duration-1000"
      style={{
        opacity: intensity * 0.4,
        background: `
          radial-gradient(circle at 0% 0%, #440000 0%, transparent 40%),
          radial-gradient(circle at 100% 0%, #440000 0%, transparent 40%),
          radial-gradient(circle at 0% 100%, #440000 0%, transparent 40%),
          radial-gradient(circle at 100% 100%, #440000 0%, transparent 40%)
        `,
        mixBlendMode: 'multiply',
        filter: 'contrast(150%) brightness(0.8) hue-rotate(-10deg)',
      }}
    />
  );
}
