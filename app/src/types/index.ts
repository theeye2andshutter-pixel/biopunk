// ============================================
// TIPOS BIOHORROR - HATERS SECTOR CUSCO 2099
// ============================================

// Productos de BioMods (Tienda)
export interface BioMod {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'visual' | 'neural' | 'physical' | 'illegal';
  stock: number;
  sideEffects: string[];
}

// Item del carrito
export interface CartItem extends BioMod {
  quantity: number;
}

// Estado del carrito
export interface CartState {
  items: CartItem[];
  total: number;
}

// Canciones para Frecuencia de Óxido
export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  description: string;
  url?: string;
}

// Mensajes del foro La Nueva Carne
export interface ForumMessage {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
  isUser: boolean;
  mutationLevel: number;
}

// Estado del boot sequence
export interface BootState {
  isComplete: boolean;
  currentStep: number;
  logs: string[];
}

// Estado del reproductor
export interface PlayerState {
  isPlaying: boolean;
  currentTrack: number;
  progress: number;
}

// Acciones del carrito
export type CartAction =
  | { type: 'ADD_ITEM'; payload: BioMod }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' };
