import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Función de detección mejorada
    const checkMobile = () => {
      const windowWidth = window.innerWidth;
      const isTouchDevice = () => {
        return (('ontouchstart' in window) ||
                (navigator.maxTouchPoints > 0) ||
                ((navigator as any).msMaxTouchPoints > 0));
      };
      // Mobile si: ancho < breakpoint O es dispositivo táctil con pantalla pequeña
      return windowWidth < MOBILE_BREAKPOINT || (isTouchDevice() && windowWidth < 1024);
    };

    // Media query listener para cambios en tiempo real
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    const onChange = () => {
      setIsMobile(checkMobile())
    }
    
    mql.addEventListener("change", onChange)
    setIsMobile(checkMobile())
    
    return () => {
      mql.removeEventListener("change", onChange)
    }
  }, [])

  return !!isMobile
}
