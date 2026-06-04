"use client";

import { useEffect } from "react";
import { authApi } from "@/lib/api/auth.api";
import { businessApi } from "@/lib/api/business.api";
import { useAuthStore } from "@/store/auth.store";
import { useBusinessStore } from "@/store/business.store";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setSession, clearSession, setAuthLoading } = useAuthStore();
  const { setBusiness, business } = useBusinessStore();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const response = await authApi.refresh();
        setSession(response.data.user, response.data.token);

        // Si el negocio no está en el store (ej: después de logout), lo cargamos desde la API
        if (!business) {
          try {
            const businessResponse = await businessApi.getMy();
            setBusiness(businessResponse.data);
          } catch {
            // El usuario aún no tiene negocio registrado — flujo normal para cuentas nuevas
          }
        }
      } catch {
        clearSession();
      } finally {
        setAuthLoading(false);
      }
    };

    initAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
}
