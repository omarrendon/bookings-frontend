"use client";

import { useEffect } from "react";
import { authApi } from "@/lib/api/auth.api";
import { useAuthStore } from "@/store/auth.store";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setSession, clearSession, setAuthLoading } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      try {
        // Intenta renovar la sesión usando la cookie httpOnly del refreshToken.
        // Si el usuario ya había iniciado sesión antes, esto restaura el access token
        // en memoria sin pedirle que vuelva a ingresar sus credenciales.
        const response = await authApi.refresh();
        setSession(response.data.user, response.data.token);
      } catch {
        // No hay cookie válida o expiró → sesión limpia, el usuario debe hacer login.
        clearSession();
      } finally {
        setAuthLoading(false);
      }
    };

    initAuth();
  }, [setSession, clearSession, setAuthLoading]);

  return <>{children}</>;
}
