import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { LoginUser } from "@/lib/api/types";

interface AuthState {
  user: LoginUser | null;
  token: string | null;        // solo en memoria — nunca persiste a localStorage
  isAuthenticated: boolean;
  isAuthLoading: boolean;      // true mientras se ejecuta el silent refresh inicial
  postAuthRedirect: string | null; // destino de redirección tras autenticación
  setSession: (user: LoginUser, token: string) => void;
  clearSession: () => void;
  setAuthLoading: (loading: boolean) => void;
  setPostAuthRedirect: (path: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isAuthLoading: true, // se resetea a true en cada carga de página
      postAuthRedirect: null,

      setSession: (user, token) =>
        set({ user, token, isAuthenticated: true }),

      clearSession: () =>
        set({ user: null, token: null, isAuthenticated: false }),

      setAuthLoading: (isAuthLoading) => set({ isAuthLoading }),

      setPostAuthRedirect: (path) => set({ postAuthRedirect: path }),
    }),
    {
      name: "bookea-auth",
      // Solo persistimos el usuario para mostrar nombre/email en la UI.
      // El token NO persiste — se recupera via silent refresh con la cookie httpOnly.
      partialize: state => ({
        user: state.user,
      }),
    },
  ),
);
