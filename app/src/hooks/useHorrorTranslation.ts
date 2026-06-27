import { useCallback, useState, useEffect } from 'react';

// Mapeo de traducciones de horror para el estado "Reborn" (100% contaminación)
const REBORN_MAP: Record<string, string> = {
  // Navegación
  'COLECCIÓN': 'NÁUSEAS',
  'TRANSMISIÓN': 'NECESIDAD',
  'TIENDA': 'DISECCIÓN',
  'FORO': 'BIOMASA',
  'BIO': 'MUTACIÓN',
  
  // Cabeceras de Sección
  'BIOMODS': 'DISECCIONES DISPONIBLES',
  'TRANSMISIÓN SATELITAL': 'VOCES DE LA CARNE',
  'FORA DE LA NUEVA CARNE': 'GANGRENA COLECTIVA',
  'ARCHIVOS CLASIFICADOS': 'MEMORIA CELULAR',
  
  // Botones y Otros
  'INCORPORAR': 'CONSUMIR',
  'VER DETALLES': 'EXAMINAR TEJIDO',
  'AGREGAR AL SISTEMA': 'INFECTAR',
  'TODOS': 'LIGNINA',
  'PAGO': 'SACRIFICIO',
  'CARRITO': 'EXTRACCIÓN',
};

export function useHorrorTranslation(isReborn: boolean) {
  const [glitchActive, setGlitchActive] = useState(false);

  // Activar glitch de traducción de forma eventual: cada 8-15 segundos, dura 2-4 segundos
  useEffect(() => {
    if (!isReborn) return;
    
    const scheduleGlitch = () => {
      const delayBeforeGlitch = 8000 + Math.random() * 7000; // 8-15s
      const glitchDuration = 2000 + Math.random() * 2000; // 2-4s
      
      const timeoutGlitch = setTimeout(() => {
        setGlitchActive(true);
        const timeoutEnd = setTimeout(() => {
          setGlitchActive(false);
          scheduleGlitch(); // Reiniciar el ciclo
        }, glitchDuration);
        return () => clearTimeout(timeoutEnd);
      }, delayBeforeGlitch);
      
      return () => clearTimeout(timeoutGlitch);
    };
    
    return scheduleGlitch();
  }, [isReborn]);

  const translate = useCallback((original: string) => {
    if (!isReborn || !glitchActive) return original;
    const upper = original.toUpperCase();
    return REBORN_MAP[upper] || REBORN_MAP[original] || original;
  }, [isReborn, glitchActive]);

  return { translate };
}
