import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/lib/api/types";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setSession: (user: User, token: string) => void;
  clearSession: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setSession: (user, token) => set({ user, token, isAuthenticated: true }),

      clearSession: () =>
        set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      // Esta clave DEBE coincidir con la usada en client.ts → getToken()
      name: "bookea-auth",
      // Solo persistimos los datos, no las funciones
      partialize: state => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
