import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/lib/api/types";

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
}

interface CartState {
  // ── Estado ────────────────────────────────────────────────────────────────
  businessId: string | null;
  selectedProducts: Product[];
  selectedDate: string | null;  // "YYYY-MM-DD"
  selectedTime: string | null;  // "09:00"
  customerInfo: CustomerInfo | null;

  // ── Acciones ──────────────────────────────────────────────────────────────
  setBusinessId: (id: string) => void;
  toggleProduct: (product: Product) => void;
  setSelectedDate: (date: string) => void;
  setSelectedTime: (time: string) => void;
  setCustomerInfo: (info: CustomerInfo) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    set => ({
      businessId: null,
      selectedProducts: [],
      selectedDate: null,
      selectedTime: null,
      customerInfo: null,

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

      setCustomerInfo: info =>
        set({ customerInfo: info }),

      clearCart: () =>
        set({ selectedProducts: [], businessId: null, selectedDate: null, selectedTime: null, customerInfo: null }),
    }),
    {
      name: "bookea-cart",
      partialize: state => ({
        businessId: state.businessId,
        selectedProducts: state.selectedProducts,
        selectedDate: state.selectedDate,
        selectedTime: state.selectedTime,
        customerInfo: state.customerInfo,
      }),
    },
  ),
);
