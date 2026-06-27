// ============================================
// STORE DEL CARRITO - BIOHORROR
// ============================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { BioMod, CartItem } from '@/types';

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  corporateControl: number;
  addItem: (item: BioMod) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setCartOpen: (open: boolean) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getContaminationLevel: () => number;
  hasIllegalItems: () => boolean;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      corporateControl: 0,

      addItem: (item: BioMod) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);
          const increase = item.category === 'illegal' ? 0 : 5;
          const newControl = Math.min(100, state.corporateControl + increase);
          if (existingItem) {
            return {
              corporateControl: newControl,
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: Math.min(i.quantity + 1, item.stock) } : i
              ),
            };
          }
          return {
            corporateControl: newControl,
            items: [...state.items, { ...item, quantity: 1 }],
          };
        });
      },

      removeItem: (id: string) => {
        set((state) => {
          const item = state.items.find((i) => i.id === id);
          const decrease = item && item.category !== 'illegal' ? 5 : 0;
          return {
            items: state.items.filter((i) => i.id !== id),
            corporateControl: Math.max(0, state.corporateControl - decrease),
          };
        });
      },

      updateQuantity: (id: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity } : i
          ),
        }));
      },

      clearCart: () => set({ items: [], corporateControl: 0 }),

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      setCartOpen: (open: boolean) => set({ isOpen: open }),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      // % de contaminación: cada ítem suma según categoría
      getContaminationLevel: () => {
        const items = get().items;
        if (items.length === 0) return 0;
        const weights = { illegal: 30, neural: 20, physical: 15, visual: 10 };
        const total = items.reduce((sum, item) => sum + (weights[item.category] ?? 10) * item.quantity, 0);
        return Math.min(100, total);
      },

      hasIllegalItems: () => {
        return get().items.some((i) => i.category === 'illegal');
      },
    }),
    {
      name: 'haters-cart-storage',
      partialize: (state) => ({ items: state.items }),
    }
  )
);
