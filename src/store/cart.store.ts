import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/lib/api/types";

interface CartState {
  // ── Estado ────────────────────────────────────────────────────────────────
  businessId: string | null;
  selectedProducts: Product[];
  selectedDate: string | null;  // "YYYY-MM-DD"
  selectedTime: string | null;  // "09:00"

  // ── Acciones ──────────────────────────────────────────────────────────────
  setBusinessId: (id: string) => void;
  toggleProduct: (product: Product) => void;
  setSelectedDate: (date: string) => void;
  setSelectedTime: (time: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    set => ({
      businessId: null,
      selectedProducts: [],
      selectedDate: null,
      selectedTime: null,

      setBusinessId: id =>
        set({ businessId: id }),

      toggleProduct: product =>
        set(state => {
          const exists = state.selectedProducts.some(p => p.id === product.id);
          return {
            selectedProducts: exists
              ? state.selectedProducts.filter(p => p.id !== product.id)
              : [...state.selectedProducts, product],
          };
        }),

      // Al cambiar la fecha se limpia la hora para forzar nueva selección
      setSelectedDate: date =>
        set({ selectedDate: date, selectedTime: null }),

      setSelectedTime: time =>
        set({ selectedTime: time }),

      clearCart: () =>
        set({ selectedProducts: [], businessId: null, selectedDate: null, selectedTime: null }),
    }),
    {
      name: "bookea-cart",
      partialize: state => ({
        businessId: state.businessId,
        selectedProducts: state.selectedProducts,
        selectedDate: state.selectedDate,
        selectedTime: state.selectedTime,
      }),
    },
  ),
);
