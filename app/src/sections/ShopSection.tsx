import { AlertTriangle, Lock } from 'lucide-react';
import { GlitchText } from '@/components/GlitchText';

export function ShopSection() {
  return (
    <section id="tienda" className="section-biohorror section-reveal py-24 px-4 relative overflow-hidden">
      {/* Cinta de precaución estilo policía - Neon Orange / Black */}
      <div className="absolute top-0 left-[-10%] w-[120%] h-12 bg-[#ff6600] flex items-center justify-around transform -rotate-2 z-10 border-y-4 border-black font-black text-black tracking-[0.3em] opacity-80" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(0,0,0,0.4) 40px, rgba(0,0,0,0.4) 80px)' }}>
        <span>ZONA SELLADA POR BIOMODS CORP</span>
        <span>NO CRUZAR</span>
        <span>ZONA SELLADA POR BIOMODS CORP</span>
        <span>NO CRUZAR</span>
      </div>
      <div className="absolute bottom-10 left-[-10%] w-[120%] h-12 bg-[#ff6600] flex items-center justify-around transform rotate-3 z-10 border-y-4 border-black font-black text-black tracking-[0.3em] opacity-80" style={{ backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 40px, rgba(0,0,0,0.4) 40px, rgba(0,0,0,0.4) 80px)' }}>
        <span>ÁREA RESTRINGIDA</span>
        <span>PELIGRO BIOLÓGICO</span>
        <span>ÁREA RESTRINGIDA</span>
        <span>PELIGRO BIOLÓGICO</span>
      </div>

      <div className="max-w-4xl mx-auto relative z-20 mt-12 bg-black/90 border-4 border-[#ff6600] p-8 text-center animate-pulse-slow shadow-[0_0_50px_rgba(255,102,0,0.4)]">
        <div className="flex justify-center mb-6">
          <Lock className="w-20 h-20 text-[#ff6600]" />
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-[#ff6600] tracking-tighter mb-4">
          <GlitchText text="[ ACCESO DENEGADO ]" duration={600} />
        </h2>
        <div className="flex items-center justify-center gap-2 mb-8">
          <AlertTriangle className="w-6 h-6 text-[#ff6600]" />
          <p className="text-xl text-[#ff6600] font-mono tracking-widest font-bold">ZONA SELLADA POR EL CÁRTEL DE LA BIOMASA</p>
          <AlertTriangle className="w-6 h-6 text-[#ff6600]" />
        </div>
        
        <p className="text-[#ff6600]/80 font-mono text-sm leading-loose max-w-2xl mx-auto">
          EL COMERCIO CLANDESTINO NO ESTÁ AUTORIZADO. TODA TRANSACCIÓN DE IMPLANTES NEURALES HA SIDO BLOQUEADA. 
          <br /><br />
          LA NUEVA CARNE NO SE COMPRA, SE EVOLUCIONA.
        </p>
      </div>
    </section>
  );
}
