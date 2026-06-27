// ============================================
// FOOTER - PIE DE PÁGINA BIOHORROR
// ============================================

import { useState } from 'react';
import { useBioSounds } from '@/hooks/useBioSounds';
import { CORRUPTED_TEXTS, SOCIAL_COLORS } from '@/data/bioData';
import { Skull, AlertTriangle, Instagram, Music2, Youtube, Lock, Terminal, Facebook } from 'lucide-react';

const SECRET_CODE = 'biohorror';



function AccessWidget({ onClearThreat }: { onClearThreat?: () => void }) {
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'error' | 'success'>('idle');
  const [active, setActive] = useState(false);

  const applyMode = (on: boolean) => {
    const html = document.documentElement;
    if (on) {
      html.classList.add('biohorror-mode');
      document.querySelectorAll<HTMLElement>('p, span, h2, h3, li').forEach((el) => {
        if (
          el.children.length === 0 &&
          el.textContent && el.textContent.trim().length > 3 &&
          !el.closest('input') && !el.closest('button') &&
          !el.closest('[data-no-corrupt]') && !el.getAttribute('data-original')
        ) {
          el.setAttribute('data-original', el.textContent);
          el.textContent = CORRUPTED_TEXTS[Math.floor(Math.random() * CORRUPTED_TEXTS.length)];
        }
      });
    } else {
      html.classList.remove('biohorror-mode');
      document.querySelectorAll<HTMLElement>('[data-original]').forEach((el) => {
        el.textContent = el.getAttribute('data-original') || '';
        el.removeAttribute('data-original');
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (active) {
      // Ya está activo — desactivar sin necesidad de contraseña
      setActive(false);
      setStatus('success');
      applyMode(false);
      setTimeout(() => setStatus('idle'), 2000);
    } else if (password.toLowerCase() === SECRET_CODE) {
      // Activar con contraseña correcta
      setActive(true);
      setStatus('success');
      applyMode(true);
      onClearThreat?.();
      setTimeout(() => setStatus('idle'), 2000);
    } else {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 1500);
    }
    setPassword('');
  };

  return (
    <div className="border border-[#39ff14]/20 bg-black/60 p-4 font-mono" data-no-corrupt>
      <div className="flex items-center gap-2 mb-3 border-b border-[#39ff14]/10 pb-2">
        <Terminal className="w-3 h-3 text-[#39ff14]/50" />
        <span className="text-[10px] text-[#39ff14]/50 tracking-widest">ACCESO RESTRINGIDO — NIVEL 9</span>
        {active && <span className="text-[10px] text-[#ff0000] ml-auto animate-pulse font-bold">● MODO ACTIVO</span>}
      </div>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[#39ff14]/40 w-20 flex-shrink-0">USUARIO:</span>
          <input type="text" value="Odiantes26" readOnly
            className="flex-1 bg-[#39ff14]/5 border border-[#39ff14]/20 px-2 py-1 text-[10px] text-[#39ff14]/50 font-mono cursor-not-allowed" />
          <Lock className="w-3 h-3 text-[#39ff14]/30 flex-shrink-0" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[#39ff14]/40 w-20 flex-shrink-0">CLAVE:</span>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••" autoComplete="off"
            className={`flex-1 bg-black border px-2 py-1 text-[10px] font-mono outline-none ${
              status === 'error' ? 'border-[#ff0000] text-[#ff0000]' :
              status === 'success' ? 'border-[#39ff14] text-[#39ff14]' :
              'border-[#39ff14]/30 text-[#39ff14]'
            }`} />
        </div>
        <div className="flex items-center justify-between pt-1">
          <span className="text-[9px] text-[#39ff14]/20">
            {status === 'error' ? '> ACCESO DENEGADO' :
             status === 'success' ? `> PROTOCOLO ${active ? 'ACTIVADO' : 'DESACTIVADO'}` :
             active ? '> SISTEMA COMPROMETIDO' : '> ESPERANDO AUTENTICACIÓN...'}
          </span>
          <button type="submit"
            className={`text-[9px] border px-2 py-0.5 transition-all ${
              active ? 'border-[#ff0000]/60 text-[#ff0000]/60 hover:text-[#ff0000] hover:border-[#ff0000]'
                     : 'border-[#39ff14]/30 text-[#39ff14]/60 hover:text-[#39ff14] hover:border-[#39ff14]'
            }`}>
            {active ? 'DESACTIVAR' : 'ACCEDER'}
          </button>
        </div>
      </form>
    </div>
  );
}

export function Footer({ onClearThreat }: { onClearThreat?: () => void }) {
  const currentYear = new Date().getFullYear();
  const { playHover, playClick } = useBioSounds();

  return (
    <footer className="relative py-16 px-4 border-t border-[#39ff14]/20 bg-black" data-no-corrupt>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo y descripción */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12">
                <img src="/images/haters-logo.png" alt="HATERS"
                  className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(57,255,20,0.5)]" />
              </div>
              <span className="text-3xl font-black tracking-[0.15em] terminal-font glow-toxic"
                style={{ color: '#39ff14' }}>
                H.A.T.E.R_S
              </span>
            </div>
            <p className="text-sm text-[#39ff14]/60 mb-4">
              Humanos Atacados por Tecnologías de Evolución Radical Sustentable. Sector Cusco 2099.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a href="https://www.instagram.com/h.a.t.e.r_s/" target="_blank" rel="noopener noreferrer"
                onMouseEnter={playHover} onClick={playClick}
                className="p-3 border border-[#E1306C]/30 bg-[#E1306C]/10 hover:bg-[#E1306C]/30 hover:border-[#E1306C] transition-all">
                <Instagram className="w-5 h-5" style={{ color: SOCIAL_COLORS.instagram }} />
              </a>
              <a href="https://www.tiktok.com/@h.a.t.e.r_s" target="_blank" rel="noopener noreferrer"
                onMouseEnter={playHover} onClick={playClick}
                className="p-3 border border-[#00f2ea]/30 bg-[#00f2ea]/10 hover:bg-[#00f2ea]/30 hover:border-[#00f2ea] transition-all">
                <Music2 className="w-5 h-5" style={{ color: SOCIAL_COLORS.tiktok }} />
              </a>
              <a href="https://www.youtube.com/watch?v=XjU0eXC-ef8" target="_blank" rel="noopener noreferrer"
                onMouseEnter={playHover} onClick={playClick}
                className="p-3 border border-[#ff0000]/30 bg-[#ff0000]/10 hover:bg-[#ff0000]/30 hover:border-[#ff0000] transition-all">
                <Youtube className="w-5 h-5" style={{ color: SOCIAL_COLORS.youtube }} />
              </a>

              <a href="https://www.facebook.com/hatersbiopunk" target="_blank" rel="noopener noreferrer"
                onMouseEnter={playHover} onClick={playClick}
                className="p-3 border border-[#1877F2]/30 bg-[#1877F2]/10 hover:bg-[#1877F2]/30 hover:border-[#1877F2] transition-all">
                <Facebook className="w-5 h-5" style={{ color: SOCIAL_COLORS.facebook }} />
              </a>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#ff00ff]/60 mt-4">
              <AlertTriangle className="w-4 h-4" />
              <span>CLASIFICADO: NIVEL 5</span>
            </div>
          </div>

          {/* Links rápidos */}
          <div>
            <h4 className="text-sm font-bold text-[#39ff14] mb-4 tracking-wider">ACCESO RÁPIDO</h4>
            <ul className="space-y-2">
              {[
                { id: 'hero', label: 'Inicio' }, { id: 'bio', label: 'Archivos' },
                { id: 'musica', label: 'Frecuencias' }, { id: 'foro', label: 'Comunidad' },
                { id: 'transmision', label: 'Transmisiones' }, { id: 'tienda', label: 'BioMods' },
              ].map((link) => (
                <li key={link.id}>
                  <button onClick={() => { playClick(); document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' }); }}
                    onMouseEnter={playHover} className="text-sm text-[#39ff14]/60 hover:text-[#39ff14] transition-colors">
                    {'>'} {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Status */}
          <div>
            <h4 className="text-sm font-bold text-[#39ff14] mb-4 tracking-wider">ESTADO DEL SISTEMA</h4>
            <div className="space-y-2 font-mono text-xs">
              {[['NODO:', 'ONLINE', '#39ff14'], ['LATENCIA:', '12ms', '#39ff14'],
                ['ENCRIPTACIÓN:', 'AES-4096', '#ff00ff'], ['MUTACIONES:', '8,492', '#39ff14']].map(([k, v, c]) => (
                <div key={k} className="flex justify-between">
                  <span className="text-[#39ff14]/40">{k}</span>
                  <span style={{ color: c }}>{v}</span>
                </div>
              ))}
              <div className="flex justify-between">
                <span className="text-[#39ff14]/40">ÚLTIMO PING:</span>
                <span className="text-[#39ff14]">{new Date().toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#39ff14]/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-xs text-[#39ff14]/40">
              <Skull className="w-4 h-4" />
              <span>© {currentYear} SECTOR CUSCO 2099</span>
              <span>|</span>
              <span>LA NUEVA CARNE NO PIDE PERMISO</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#39ff14] rounded-full animate-pulse" />
              <span className="text-xs text-[#39ff14]/60 font-mono">SISTEMA OPERATIVO</span>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-[10px] text-[#39ff14]/20 tracking-[0.5em]">EL METAL · LA CARNE · EL FIN LLEGA</p>
        </div>

        <div className="mt-8 max-w-xs mx-auto">
          <AccessWidget onClearThreat={onClearThreat} />
          <p className="text-[9px] text-[#39ff14]/10 tracking-widest mt-2 font-mono text-center">
            {'>'} PISTA: DOS PALABRAS. UNA BIOLOGÍA. UN TERROR.
          </p>
        </div>
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-[#39ff14]/5 rounded-full blur-3xl pointer-events-none" />
    </footer>
  );
}
