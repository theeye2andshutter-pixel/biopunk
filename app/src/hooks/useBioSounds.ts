// ============================================
// HOOK DE SONIDOS BIOHORROR - BIOPUNK ENGINE
// ============================================

import { useCallback } from 'react';

// Genera sonidos sintéticos biopunk via Web Audio API
function createAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  return new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
}

// Latido orgánico - thump grave + squish
function playHeartbeatSound(ctx: AudioContext, volume = 0.5) {
  const now = ctx.currentTime;

  // Primer golpe (thump)
  const osc1 = ctx.createOscillator();
  const gain1 = ctx.createGain();
  osc1.connect(gain1);
  gain1.connect(ctx.destination);
  osc1.frequency.setValueAtTime(80, now);
  osc1.frequency.exponentialRampToValueAtTime(30, now + 0.12);
  gain1.gain.setValueAtTime(volume, now);
  gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
  osc1.start(now);
  osc1.stop(now + 0.15);

  // Segundo golpe (eco orgánico)
  const osc2 = ctx.createOscillator();
  const gain2 = ctx.createGain();
  osc2.connect(gain2);
  gain2.connect(ctx.destination);
  osc2.frequency.setValueAtTime(60, now + 0.18);
  osc2.frequency.exponentialRampToValueAtTime(25, now + 0.28);
  gain2.gain.setValueAtTime(volume * 0.6, now + 0.18);
  gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
  osc2.start(now + 0.18);
  osc2.stop(now + 0.3);
}

// Clic metálico - chirp de metal oxidado
function playMetalClickSound(ctx: AudioContext, volume = 0.5) {
  const now = ctx.currentTime;

  const bufferSize = ctx.sampleRate * 0.08;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 3);
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(3200, now);
  filter.frequency.exponentialRampToValueAtTime(800, now + 0.08);
  filter.Q.value = 8;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(volume * 1.2, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  noise.start(now);
}

// Hover orgánico - respiración húmeda / membrana
function playOrganicHoverSound(ctx: AudioContext, volume = 0.5) {
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const lfo = ctx.createOscillator();
  const lfoGain = ctx.createGain();
  const gain = ctx.createGain();

  lfo.frequency.value = 18;
  lfoGain.gain.value = 40;
  lfo.connect(lfoGain);
  lfoGain.connect(osc.frequency);

  osc.type = 'sine';
  osc.frequency.setValueAtTime(220, now);
  osc.frequency.exponentialRampToValueAtTime(180, now + 0.12);

  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(volume * 0.35, now + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

  osc.connect(gain);
  gain.connect(ctx.destination);

  lfo.start(now);
  osc.start(now);
  lfo.stop(now + 0.14);
  osc.stop(now + 0.14);
}

// Éxito / incorporar - impacto metálico disonante + chirrido desesperante
function playSuccessSound(ctx: AudioContext, volume = 0.5) {
  const now = ctx.currentTime;

  // Golpe metálico inicial - ruido filtrado grave
  const impactSize = ctx.sampleRate * 0.15;
  const impactBuf = ctx.createBuffer(1, impactSize, ctx.sampleRate);
  const impactData = impactBuf.getChannelData(0);
  for (let i = 0; i < impactSize; i++) {
    impactData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / impactSize, 1.5);
  }
  const impact = ctx.createBufferSource();
  impact.buffer = impactBuf;
  const impactFilter = ctx.createBiquadFilter();
  impactFilter.type = 'lowpass';
  impactFilter.frequency.setValueAtTime(900, now);
  impactFilter.frequency.exponentialRampToValueAtTime(120, now + 0.15);
  const impactGain = ctx.createGain();
  impactGain.gain.setValueAtTime(volume * 1.4, now);
  impactGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
  impact.connect(impactFilter);
  impactFilter.connect(impactGain);
  impactGain.connect(ctx.destination);
  impact.start(now);

  // Chirrido descendente disonante - dos osciladores desafinados
  const freqPairs = [[310, 318], [220, 209], [160, 171]];
  freqPairs.forEach(([f1, f2], i) => {
    const t = now + i * 0.12;
    [f1, f2].forEach((freq) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, t);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.3, t + 0.18);
      g.gain.setValueAtTime(volume * 0.35, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
      osc.connect(g);
      g.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.2);
    });
  });

  // Resonancia metálica final - tono largo que decae lento
  const resonOsc = ctx.createOscillator();
  const resonGain = ctx.createGain();
  resonOsc.type = 'square';
  resonOsc.frequency.setValueAtTime(185, now + 0.1);
  resonOsc.frequency.exponentialRampToValueAtTime(80, now + 0.7);
  resonGain.gain.setValueAtTime(volume * 0.25, now + 0.1);
  resonGain.gain.exponentialRampToValueAtTime(0.001, now + 0.75);
  resonOsc.connect(resonGain);
  resonGain.connect(ctx.destination);
  resonOsc.start(now + 0.1);
  resonOsc.stop(now + 0.75);
}

// Alarma aterradora — exposición crítica
function playAlarmSound(ctx: AudioContext, volume = 0.5) {
  const now = ctx.currentTime;
  // Sirena descendente disonante
  for (let i = 0; i < 3; i++) {
    const t = now + i * 0.3;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(440 + i * 80, t);
    osc.frequency.exponentialRampToValueAtTime(110, t + 0.25);
    g.gain.setValueAtTime(volume * 0.6, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
    osc.connect(g); g.connect(ctx.destination);
    osc.start(t); osc.stop(t + 0.28);
  }
  // Ruido de fondo
  const bufSize = ctx.sampleRate * 0.9;
  const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < bufSize; i++) d[i] = (Math.random() * 2 - 1) * 0.15;
  const noise = ctx.createBufferSource();
  noise.buffer = buf;
  const ng = ctx.createGain();
  ng.gain.setValueAtTime(volume * 0.3, now);
  ng.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
  noise.connect(ng); ng.connect(ctx.destination);
  noise.start(now);
}

// Sonido estable — post transmisión ADN
function playStableSound(ctx: AudioContext, volume = 0.5) {
  const now = ctx.currentTime;
  const freqs = [261, 329, 392, 523];
  freqs.forEach((freq, i) => {
    const t = now + i * 0.12;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, t);
    g.gain.setValueAtTime(volume * 0.3, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
    osc.connect(g); g.connect(ctx.destination);
    osc.start(t); osc.stop(t + 0.4);
  });
}

// Susurros neurales - ruido filtrado con oscilación aleatoria
function playWhisperSound(ctx: AudioContext, volume = 0.5) {
  const now = ctx.currentTime;
  const duration = 2.5;

  const bufSize = ctx.sampleRate * duration;
  const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < bufSize; i++) d[i] = (Math.random() * 2 - 1) * 0.2;

  const noise = ctx.createBufferSource();
  noise.buffer = buf;

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(400, now);
  filter.frequency.exponentialRampToValueAtTime(1200, now + duration / 2);
  filter.frequency.exponentialRampToValueAtTime(600, now + duration);
  filter.Q.value = 10;

  const panner = ctx.createStereoPanner();
  panner.pan.setValueAtTime((Math.random() * 2 - 1), now);
  panner.pan.linearRampToValueAtTime((Math.random() * 2 - 1), now + duration);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(volume * 0.15, now + 0.5);
  gain.gain.linearRampToValueAtTime(0, now + duration);

  noise.connect(filter);
  filter.connect(panner);
  panner.connect(gain);
  gain.connect(ctx.destination);
  noise.start(now);
}

// Glitch estático - interferencia neural
function playGlitchSound(ctx: AudioContext, volume = 0.5) {
  const now = ctx.currentTime;
  const duration = 0.06;

  const bufferSize = ctx.sampleRate * duration;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'highpass';
  filter.frequency.value = 1800;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(volume * 0.5, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  noise.start(now);
}

// Variables globales inyectadas para reutilizar instancias y no colapsar el navegador
let globalAudioCtx: AudioContext | null = null;
let hoverSound: HTMLAudioElement | null = null;
let clickSound: HTMLAudioElement | null = null;
let successSound: HTMLAudioElement | null = null;
let ambientSound: HTMLAudioElement | null = null;
let ambientSource: MediaElementAudioSourceNode | null = null;
let ambientFilter: BiquadFilterNode | null = null;

// Persistent loop instances for heartbeat
let globalHeartbeatOsc: OscillatorNode | null = null;
let globalHeartbeatGain: GainNode | null = null;
let heartbeatLoopActive = false;

export function useBioSounds() {
  const getCtx = useCallback((): AudioContext | null => {
    if (!globalAudioCtx) {
      globalAudioCtx = createAudioContext();
    }
    if (globalAudioCtx?.state === 'suspended') {
      globalAudioCtx.resume();
    }
    return globalAudioCtx;
  }, []);

  // Neural Heartbeat Loop — persistent and efficient
  const startHeartbeatLoop = useCallback(() => {
    const ctx = getCtx();
    if (!ctx || heartbeatLoopActive) return;

    globalHeartbeatOsc = ctx.createOscillator();
    globalHeartbeatGain = ctx.createGain();

    globalHeartbeatOsc.type = 'sine';
    globalHeartbeatOsc.frequency.setValueAtTime(60, ctx.currentTime);
    globalHeartbeatGain.gain.setValueAtTime(0, ctx.currentTime);

    globalHeartbeatOsc.connect(globalHeartbeatGain);
    globalHeartbeatGain.connect(ctx.destination);

    globalHeartbeatOsc.start();
    heartbeatLoopActive = true;
  }, [getCtx]);

  const stopHeartbeatLoop = useCallback(() => {
    if (globalHeartbeatOsc && heartbeatLoopActive) {
      try {
        globalHeartbeatOsc.stop();
        globalHeartbeatOsc.disconnect();
      } catch (e) {
        // Oscilador ya detenido, ignorar
      }
      globalHeartbeatOsc = null;
      globalHeartbeatGain = null;
      heartbeatLoopActive = false;
    }
  }, []);

  const updateHeartbeat = useCallback((threat: number) => {
    const ctx = getCtx();
    if (!ctx || !globalHeartbeatOsc || !globalHeartbeatGain) return;

    const now = ctx.currentTime;
    // Volume: fades in from threat 20
    const targetGain = threat < 20 ? 0 : (threat - 20) / 100 * 0.4;
    globalHeartbeatGain.gain.setTargetAtTime(targetGain, now, 0.5);

    // BPM Simulator: frequency between 40Hz and 120Hz based on threat
    const targetFreq = 40 + (threat / 100) * 80;
    globalHeartbeatOsc.frequency.setTargetAtTime(targetFreq, now, 1.0);
  }, [getCtx]);

  const initSounds = useCallback(() => {
    if (typeof window === 'undefined' || ambientSound) return;

    hoverSound = new Audio('/sounds/hover.mp3');
    clickSound = new Audio('/sounds/click.mp3');
    successSound = new Audio('/sounds/success.mp3');
    ambientSound = new Audio('/sounds/ambient.mp3');

    if (hoverSound) hoverSound.volume = 0.15;
    if (clickSound) clickSound.volume = 0.25;
    if (successSound) successSound.volume = 0.2;
    if (ambientSound) {
      ambientSound.volume = 0.075;
      ambientSound.loop = true;
    }

    const ctx = getCtx();
    if (ctx && ambientSound && !ambientSource) {
      // Conectar ambient a un filtro para el efecto de degradación
      ambientSource = ctx.createMediaElementSource(ambientSound);
      ambientFilter = ctx.createBiquadFilter();
      ambientFilter.type = 'lowpass';
      ambientFilter.frequency.value = 20000; // start totally open
      
      ambientSource.connect(ambientFilter);
      ambientFilter.connect(ctx.destination);
    }
  }, [getCtx]);

  // Hover: sonido orgánico húmedo (membrana)
  const playHover = useCallback(() => {
    const ctx = getCtx();
    if (ctx) playOrganicHoverSound(ctx, 0.4);
  }, [getCtx]);

  // Click: metálico oxidado
  const playClick = useCallback(() => {
    const ctx = getCtx();
    if (ctx) playMetalClickSound(ctx, 0.4);
  }, [getCtx]);

  // Éxito / incorporar biomod: glitch ascendente + latido
  const playSuccess = useCallback(() => {
    const ctx = getCtx();
    if (ctx) playSuccessSound(ctx, 0.4);
  }, [getCtx]);

  // Latido puro (para uso directo si se necesita)
  const playHeartbeat = useCallback((threat = 0) => {
    const ctx = getCtx();
    if (ctx) {
      // Volumen base 0.3, sube hasta 0.8 con amenaza al 100%
      const volume = 0.3 + (threat / 100) * 0.5;
      playHeartbeatSound(ctx, volume);
    }
  }, [getCtx]);

  // Glitch estático neural
  const playGlitch = useCallback(() => {
    const ctx = getCtx();
    if (ctx) playGlitchSound(ctx, 0.4);
  }, [getCtx]);

  // Susurros neurales
  const playWhisper = useCallback((threat = 0) => {
    const ctx = getCtx();
    if (ctx) {
      const volume = 0.2 + (threat / 100) * 0.4;
      playWhisperSound(ctx, volume);
    }
  }, [getCtx]);

  // Tecleo sintético - clic corto de teclado mecánico
  const playKeyClick = useCallback(() => {
    const ctx = getCtx();
    if (!ctx) return;
    const now = ctx.currentTime;
    const bufferSize = ctx.sampleRate * 0.04;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 4);
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 4000;
    filter.Q.value = 2;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.16, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start(now);
  }, [getCtx]);

  // Alarma aterradora — exposición crítica
  const playAlarm = useCallback(() => {
    const ctx = getCtx();
    if (ctx) playAlarmSound(ctx, 0.4);
  }, [getCtx]);

  // Sonido estable — post ADN
  const playStable = useCallback(() => {
    const ctx = getCtx();
    if (ctx) playStableSound(ctx, 0.4);
  }, [getCtx]);

  const playAmbient = useCallback(() => {
    if (ambientSound) {
      ambientSound.play().catch(() => {});
    }
  }, []);

  const stopAmbient = useCallback(() => {
    if (ambientSound) {
      ambientSound.pause();
      ambientSound.currentTime = 0;
    }
  }, []);

  const setDegradation = useCallback((level: number) => {
    if (ambientFilter) {
      // level de 0 a 100
      // 0 = 20000hz, 100 = 300hz
      const minFreq = 300;
      const maxFreq = 20000;
      const freq = maxFreq - ((maxFreq - minFreq) * (Math.min(level, 100) / 100));
      ambientFilter.frequency.setTargetAtTime(freq, getCtx()!.currentTime, 0.5);
    }
  }, [getCtx]);

  return {
    initSounds,
    playHover,
    playClick,
    playSuccess,
    playHeartbeat,
    playGlitch,
    playKeyClick,
    playAlarm,
    playStable,
    playWhisper,
    playAmbient,
    stopAmbient,
    setDegradation,
    startHeartbeatLoop,
    stopHeartbeatLoop,
    updateHeartbeat,
  };
}
