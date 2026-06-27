// ============================================
// APP PRINCIPAL - HATERS SECTOR CUSCO 2099
// ============================================

import React, { useState, useEffect, useCallback, Suspense, useRef, memo } from 'react';
import { BootSequence } from '@/components/BootSequence';
import { CRTOverlay } from '@/components/CRTOverlay';
import { BioCursor } from '@/components/BioCursor';
import { Navigation } from '@/components/Navigation';
import { CartModal } from '@/components/CartModal';
import { Footer } from '@/sections/Footer';
import { BackgroundParticles } from '@/components/BackgroundParticles';
import { BiomassOverlay } from '@/components/BiomassOverlay';
import { useCartStore } from '@/store/cartStore';
import { useBioSounds } from '@/hooks/useBioSounds';
import { useVisitorIdentity } from '@/hooks/useVisitorIdentity';
import { useSectionObserver } from '@/hooks/useSectionObserver';
import { useLiveMutations } from '@/hooks/useMetrics';
import {
  useBiohorrorEffects,
  useGlobalDoubleTapGlitch,
} from '@/hooks/useBiohorrorEffects';
import { useIsMobile } from '@/hooks/useMobile';
import { useNewEra } from '@/hooks/useNewEra';

const HeroSection = React.lazy(() => import('@/sections/HeroSection').then(m => ({ default: m.HeroSection })));
const BioSection = React.lazy(() => import('@/sections/BioSection').then(m => ({ default: m.BioSection })));
const MusicSection = React.lazy(() => import('@/sections/MusicSection').then(m => ({ default: m.MusicSection })));
const ShopSection = React.lazy(() => import('@/sections/ShopSection').then(m => ({ default: m.ShopSection })));
const ForumSection = React.lazy(() => import('@/sections/ForumSection').then(m => ({ default: m.ForumSection })));
const TransmissionSection = React.lazy(() => import('@/sections/TransmissionSection').then(m => ({ default: m.TransmissionSection })));

const ContentWrapper = memo(function ContentWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div id="app-content-wrapper" className="relative min-h-screen">
      {children}
    </div>
  );
});

function App() {
  const isMobile = useIsMobile();
  const { isNewEra } = useNewEra();
  const [bootComplete, setBootComplete] = useState(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem('haters-boot-complete') === 'true';
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  const setCartOpen = useCartStore((s) => s.setCartOpen);

  const { initSounds, startHeartbeatLoop, stopHeartbeatLoop, updateHeartbeat, playAmbient, playGlitch, playHeartbeat, playClick, playHover, playWhisper, setDegradation } = useBioSounds();
  const mutationCount = useLiveMutations();
  const identity = useVisitorIdentity();

  const {
    clickThreat,
    activateBiohacked, deactivateBiohacked, resetThreat, addThreat, clearThreat,
  } = useBiohorrorEffects(bootComplete, playGlitch, playHeartbeat, playWhisper, isNewEra);

  useGlobalDoubleTapGlitch(playGlitch);
  useSectionObserver(bootComplete, playGlitch, playHeartbeat, playClick, playHover, identity.addActivity);

  const lastThreatRef = useRef(0);
  useEffect(() => {
    if (clickThreat === lastThreatRef.current) return;
    lastThreatRef.current = clickThreat;
    updateHeartbeat(clickThreat);
    const el = document.getElementById('app-content-wrapper');
    if (!el) return;
    el.style.filter = clickThreat > 40 ? `saturate(${1 + (clickThreat - 40) / 200})` : 'none';
  }, [clickThreat, updateHeartbeat]);

  useEffect(() => {
    if (bootComplete) {
      initSounds();
      startHeartbeatLoop();
      const startAudio = () => { playAmbient(); document.removeEventListener('click', startAudio); };
      document.addEventListener('click', startAudio);
      return () => {
        document.removeEventListener('click', startAudio);
        stopHeartbeatLoop();
      };
    }
  }, [bootComplete, initSounds, startHeartbeatLoop, stopHeartbeatLoop, playAmbient]);

  useEffect(() => {
    if (bootComplete) setDegradation(clickThreat);
  }, [bootComplete, clickThreat, setDegradation]);

  const handleBootComplete = useCallback(() => {
    setBootComplete(true);
    sessionStorage.setItem('haters-boot-complete', 'true');
    initSounds();
    startHeartbeatLoop();
    const startAudio = () => { playAmbient(); document.removeEventListener('click', startAudio); };
    document.addEventListener('click', startAudio);
    setTimeout(() => { document.getElementById('transmision')?.scrollIntoView({ behavior: 'smooth' }); }, 400);
  }, [initSounds, startHeartbeatLoop, playAmbient]);

  const handleCartClose = useCallback(() => { setIsCartOpen(false); setCartOpen(false); }, [setCartOpen]);

  const handleStabilize = useCallback(() => {
    deactivateBiohacked();
    resetThreat();
  }, [deactivateBiohacked, resetThreat]);

  return (
    <div className="relative min-h-screen bg-[#050505] threat-node">
      {bootComplete && (
        <div className="fixed inset-0 z-[99990] pointer-events-none" style={{ isolation: 'isolate' }}>
          <BiomassOverlay threat={clickThreat} />
          <div className="pointer-events-auto">
            <Navigation
              biomodsThreat={clickThreat}
              mutationCount={mutationCount}
            />
          </div>
          <div className="pointer-events-auto">
            <CartModal
              isOpen={isCartOpen}
              onClose={handleCartClose}
              onBiohacked={activateBiohacked}
              onAddThreat={addThreat}
              onStabilize={handleStabilize}
            />
          </div>
          <CRTOverlay threat={clickThreat} />
          <BioCursor threat={clickThreat} />
        </div>
      )}

      <ContentWrapper>
        {!bootComplete && <BootSequence onComplete={handleBootComplete} />}
        {bootComplete && (
          <>
            <main className="relative z-10">
              <Suspense fallback={<div className="min-h-screen bg-[#050505]" />}>
                <HeroSection mutationCount={mutationCount} threatLevel={clickThreat} isReborn={isNewEra} />
                <BioSection activityLog={identity.activityLog} identity={identity} mutationCount={mutationCount} isReborn={isNewEra} idc={clickThreat} />
                <MusicSection idc={clickThreat} />
                <ForumSection mutationCount={mutationCount} identity={identity} />
                <TransmissionSection isReborn={isNewEra} />
                <ShopSection />
              </Suspense>
            </main>
            <Footer onClearThreat={clearThreat} />
          </>
        )}
        <BackgroundParticles threat={clickThreat} />
      </ContentWrapper>

      {!isMobile && (
        <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true" focusable="false">
          <defs>
            <filter id="flesh-melt">
              <feTurbulence type="fractalNoise" baseFrequency="0.01 0.05" numOctaves="3" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>
      )}
    </div>
  );
}

export default App;
