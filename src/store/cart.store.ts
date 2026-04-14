import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/lib/api/types";

interface CartState {
  // ── Estado ────────────────────────────────────────────────────────────────
  businessId: string | null;
  selectedProducts: Product[];

  // ── Acciones ──────────────────────────────────────────────────────────────
  setBusinessId: (id: string) => void;
  toggleProduct: (product: Product) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    set => ({
      businessId: null,
      selectedProducts: [],

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

      clearCart: () =>
        set({ selectedProducts: [], businessId: null }),
    }),
    {
      name: "bookea-cart",
      partialize: state => ({
        businessId: state.businessId,
        selectedProducts: state.selectedProducts,
      }),
    },
  ),
);
