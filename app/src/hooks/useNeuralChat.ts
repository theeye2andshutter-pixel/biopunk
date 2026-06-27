import { useCallback, useState } from 'react';

// Usar Render backend en producción
const getApiUrl = () => {
  if (import.meta.env.DEV) {
    // Local development
    return 'http://localhost:5000';
  }
  // Production - Reemplaza con tu URL de Render
  return 'https://your-render-app.onrender.com';
};

export function useNeuralChat() {
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (userMessage: string, userAlias: string) => {
    if (!userMessage.trim()) return null;

    setIsLoading(true);
    try {
      const apiUrl = getApiUrl();
      const response = await fetch(`${apiUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userMessage,
          userAlias,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.reply;
    } catch (error) {
      console.error('Error al conectar con el nodo neural:', error);
      return '> ERR_CONEXION: No hay conexión con el nodo neural. Intenta más tarde.';
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { sendMessage, isLoading };
}
