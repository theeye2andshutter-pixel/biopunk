// ============================================
// MODAL DEL CARRITO - BIOMODS
// ============================================

import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { useBioSounds } from '@/hooks/useBioSounds';
import { X, Plus, Minus, Trash2, Dna } from 'lucide-react';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStabilize?: () => void;
  onBiohacked?: () => void;
  onAddThreat?: (amount: number) => void;
}

export function CartModal({ isOpen, onClose, onStabilize, onBiohacked, onAddThreat }: CartModalProps) {
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice, getContaminationLevel, hasIllegalItems } = useCartStore();
  const { playClick, playHover, playGlitch } = useBioSounds();
  const [showOverload, setShowOverload] = useState(false);

  const contamination = getContaminationLevel();
  const illegal = hasIllegalItems();
  const contaminationColor = contamination < 40 ? '#39ff14' : contamination < 70 ? '#ccff00' : '#ff00ff';
  const contaminationLabel = contamination < 30 ? 'ESTABLE' : contamination < 60 ? 'MODERADA' : contamination < 85 ? 'CRÍTICA' : 'LETAL';

  if (!isOpen) return null;

  const handleIncorporate = () => {
    if (items.length === 0) return;
    playGlitch();
    setShowOverload(true);

    const hasVRVisor = items.some((i) => i.id === 'rv-study-visor');
    const currentContamination = getContaminationLevel();
    // Cada biomod incorporado suma 15% de amenaza
    const threatIncrease = items.reduce((sum, item) => sum + item.quantity * 15, 0);

    if (illegal) {
      // ilegales ya se manejan via onAddThreat
    }

    setTimeout(() => {
      clearCart();
      setShowOverload(false);
      onClose();

      // Añadir amenaza por biomods incorporados
      if (onAddThreat) onAddThreat(threatIncrease);

      // Si contaminación era 100% → biohacked (a menos que lleve el Visor RV)
      if (currentContamination >= 100 && !hasVRVisor && onBiohacked) {
        onBiohacked();
        return;
      }

      // El Visor RV siempre estabiliza el sistema (sale del biohacked)
      if (hasVRVisor) {
        onStabilize?.();
      }

      // Modal de YouTube post-incorporación
      if (document.getElementById('bio-youtube-overlay')) return;
      const modal = document.createElement('div');
      modal.id = 'bio-youtube-overlay';
      modal.style.cssText = 'position:fixed;inset:0;z-index:999999;background:black;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:1rem;cursor:auto;';
      const borderColor = hasVRVisor ? '#39ff14' : '#ff00ff';
      const msg = hasVRVisor
        ? '✓ VISOR RV INCORPORADO — SISTEMA ESTABILIZADO ✓'
        : '⚠ INCORPORACIÓN COMPLETADA — BIENVENIDO A LA NUEVA CARNE ⚠';
      modal.innerHTML = `
        <p style="color:${borderColor};font-family:monospace;font-size:0.75rem;letter-spacing:0.3em;margin-bottom:1rem;">${msg}</p>
        <div style="position:relative;width:100%;max-width:900px;aspect-ratio:16/9;border:2px solid ${borderColor};">
          <iframe src="https://www.youtube.com/embed/XjU0eXC-ef8?autoplay=1" style="position:absolute;inset:0;width:100%;height:100%;border:none;" allow="autoplay;encrypted-media" allowfullscreen></iframe>
        </div>
        <button onclick="document.getElementById('bio-youtube-overlay').remove()" style="margin-top:1rem;color:#39ff14;font-family:monospace;font-size:0.75rem;border:1px solid #39ff14;padding:0.5rem 1.5rem;background:black;cursor:pointer;">CERRAR TRANSMISIÓN</button>
      `;
      document.body.appendChild(modal);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[99995] flex justify-end">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Sidebar */}
      <div className="relative w-full max-w-md h-full overflow-y-auto bg-gradient-to-b from-[#0a0a0a] to-[#050505] border-l border-[#39ff14]/50 shadow-[-20px_0_50px_rgba(57,255,20,0.1)] flex flex-col p-6 animate-[slideInRight_0.3s_ease-out_forwards]">

        {/* Sobrecarga neural */}
        {showOverload && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black animate-pulse">
            <p className="text-[#ff00ff] font-mono text-lg tracking-widest text-center px-4">⚠ SOBRECARGA NEURAL</p>
            <p className="text-[#39ff14] font-mono text-xs mt-2 tracking-widest animate-pulse">REINICIANDO BIOMASA...</p>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#39ff14]/30">
          <div className="flex items-center gap-3">
            <Dna className="w-6 h-6 text-[#ff00ff]" />
            <h2 className="text-xl font-bold text-[#39ff14] tracking-wider">BIOMODS SELECCIONADOS</h2>
          </div>
          <button
            onMouseEnter={playHover}
            onClick={() => { playClick(); onClose(); }}
            className="text-[#39ff14]/60 hover:text-[#39ff14] transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Barra de contaminación */}
        {items.length > 0 && (
          <div className="mb-5 p-3 border border-[#39ff14]/20 bg-black/40">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] font-mono text-[#39ff14]/50 tracking-widest">NIVEL DE CONTAMINACIÓN CORPORAL</span>
              <span className="text-[10px] font-mono font-bold" style={{ color: contaminationColor }}>
                {Math.floor(contamination)}% — {contaminationLabel}
              </span>
            </div>
            <div className="h-2 bg-black border border-[#39ff14]/20 overflow-hidden">
              <div
                className="h-full transition-all duration-500"
                style={{
                  width: `${contamination}%`,
                  background: `linear-gradient(90deg, #39ff14, ${contaminationColor})`,
                  boxShadow: `0 0 8px ${contaminationColor}`,
                }}
              />
            </div>
            {illegal && (
              <p className="text-[10px] text-[#ff00ff] mt-1 font-mono animate-pulse">
                ⚠ IMPLANTES ILEGALES DETECTADOS — RIESGO DE INTERVENCIÓN CORPORATIVA
              </p>
            )}
          </div>
        )}

        {/* Items */}
        {items.length === 0 ? (
          <div className="text-center py-12">
            <Dna className="w-16 h-16 text-[#39ff14]/20 mx-auto mb-4" />
            <p className="text-[#39ff14]/60">TU BIOMASA ESTÁ VACÍA</p>
            <p className="text-xs text-[#39ff14]/40 mt-2">Selecciona mejoras para incorporar a tu carne</p>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 bg-black/50 border border-[#39ff14]/20 rounded">
                  <div className="w-16 h-16 bg-[#39ff14]/10 border border-[#39ff14]/30 flex items-center justify-center flex-shrink-0">
                    <Dna className="w-8 h-8 text-[#39ff14]/50" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-[#39ff14] truncate">{item.name}</h3>
                    <p className="text-xs text-[#39ff14]/60 mt-1">{item.category.toUpperCase()}</p>
                    <p className="text-sm text-[#ff00ff] mt-1 font-mono">{item.price.toLocaleString()} HTS</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => { playClick(); updateQuantity(item.id, item.quantity - 1); }}
                      onMouseEnter={playHover}
                      className="p-1 text-[#39ff14]/60 hover:text-[#39ff14] border border-[#39ff14]/30 hover:border-[#39ff14] transition-all"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center text-[#39ff14] font-mono">{item.quantity}</span>
                    <button
                      onClick={() => { playClick(); updateQuantity(item.id, item.quantity + 1); }}
                      onMouseEnter={playHover}
                      className="p-1 text-[#39ff14]/60 hover:text-[#39ff14] border border-[#39ff14]/30 hover:border-[#39ff14] transition-all"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => { playGlitch(); removeItem(item.id); }}
                    onMouseEnter={playHover}
                    className="p-2 text-[#ff00ff]/60 hover:text-[#ff00ff] transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-[#39ff14]/30 pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[#39ff14]/60">TOTAL DE BIOMASA:</span>
                <span className="text-2xl font-bold text-[#ff00ff] font-mono">
                  {getTotalPrice().toLocaleString()} <span className="text-sm text-[#ff00ff]/60">HTS</span>
                </span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => { playGlitch(); clearCart(); }}
                  onMouseEnter={playHover}
                  className="flex-1 py-3 border border-[#ff00ff]/50 text-[#ff00ff]/70 hover:text-[#ff00ff] hover:border-[#ff00ff] transition-all text-sm tracking-wider"
                >
                  PURGAR
                </button>
                <button
                  onClick={handleIncorporate}
                  onMouseEnter={playHover}
                  className="flex-1 px-6 py-3 font-bold uppercase tracking-wider border border-[#ff00ff] text-[#ff00ff] bg-[#ff00ff]/10 hover:bg-[#ff00ff]/20 hover:shadow-[0_0_20px_rgba(255,0,255,0.5)] active:scale-95 transition-all text-center text-sm"
                >
                  INCORPORAR A LA CARNE
                </button>
              </div>
            </div>
          </>
        )}

        <div className="absolute top-0 right-0 w-32 h-32 bg-[#39ff14]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#ff00ff]/5 rounded-full blur-3xl pointer-events-none" />
      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
