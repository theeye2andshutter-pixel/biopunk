import { StrictMode, Component } from 'react'
import type { ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null };
  static getDerivedStateFromError(error: Error) { return { error }; }
  render() {
    if (this.state.error) {
      return (
        <div style={{ background: '#050505', color: '#39ff14', fontFamily: 'monospace', padding: '2rem', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ color: '#ff00ff', fontSize: '1.2rem', marginBottom: '1rem' }}>⚠ ERROR CRÍTICO DEL SISTEMA</p>
          <p style={{ color: '#ff0000', fontSize: '0.75rem', maxWidth: '600px', textAlign: 'center' }}>{String(this.state.error)}</p>
          <button onClick={() => { localStorage.clear(); sessionStorage.clear(); window.location.reload(); }}
            style={{ marginTop: '2rem', border: '1px solid #39ff14', color: '#39ff14', background: 'transparent', padding: '0.5rem 1.5rem', cursor: 'pointer', fontFamily: 'monospace' }}>
            REINICIAR SISTEMA
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
