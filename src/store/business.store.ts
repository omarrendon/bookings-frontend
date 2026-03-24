import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Business } from "@/lib/api/types";

interface BusinessState {
  // ── Estado ────────────────────────────────────────────────────────────────
  business: Business | null;
  hasSetup: boolean;

  // ── Acciones ──────────────────────────────────────────────────────────────
  setBusiness: (business: Business) => void;
  updateBusiness: (partial: Partial<Business>) => void;
  clearBusiness: () => void;
}

export const useBusinessStore = create<BusinessState>()(
  persist(
    set => ({
      business: null,
      hasSetup: false,

      setBusiness: business =>
        set({ business, hasSetup: true }),

      updateBusiness: partial =>
        set(state => ({
          business: state.business ? { ...state.business, ...partial } : null,
        })),

      clearBusiness: () =>
        set({ business: null, hasSetup: false }),
    }),
    {
      name: "bookea-business",
      partialize: state => ({
        business: state.business,
        hasSetup: state.hasSetup,
      }),
    },
  ),
);
