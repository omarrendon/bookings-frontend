"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authApi } from "@/lib/api/auth.api";
import { ApiError } from "@/lib/api/client";
import { useAuthStore } from "@/store/auth.store";
import { useBusinessStore } from "@/store/business.store";
import type {
  LoginRequest,
  SignUpRequest,
  RequestPasswordResetRequest,
  ResetPasswordRequest,
} from "@/lib/api/types";

export function useLogin() {
  const router = useRouter();
  const setSession = useAuthStore(state => state.setSession);

  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (response) => {
      setSession(response.data.user, response.data.token);
      toast.success("Sesión iniciada correctamente");
      router.push("/dashboard");
    },
    onError: (error: unknown) => {
      if (error instanceof ApiError) {
        switch (error.status) {
          case 401:
            toast.error("Correo o contraseña incorrectos.");
            break;
          case 429:
            toast.error("Demasiados intentos. Espera unos minutos e intenta de nuevo.");
            break;
          default:
            toast.error("No se pudo iniciar sesión. Inténtalo de nuevo.");
        }
      } else {
        toast.error("No se pudo iniciar sesión. Inténtalo de nuevo.");
      }
    },
  });
}

export function useSignUp() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: SignUpRequest) => authApi.signUp(data),
    onSuccess: () => {
      toast.success("Cuenta creada correctamente. ¡Bienvenido!");
      router.push("/login");
    },
    onError: (error: unknown) => {
      if (error instanceof ApiError && error.status === 409) {
        toast.error("Ya existe una cuenta con ese correo electrónico.");
      } else {
        toast.error("No se pudo crear la cuenta. Inténtalo de nuevo.");
      }
    },
  });
}

export function useRequestPasswordReset() {
  return useMutation({
    mutationFn: (data: RequestPasswordResetRequest) =>
      authApi.requestPasswordReset(data),
    onSuccess: () => {
      toast.success("Revisa tu correo para restablecer tu contraseña.");
    },
    onError: () => {
      toast.error("No se pudo enviar el correo. Inténtalo de nuevo.");
    },
  });
}

export function useResetPassword() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: ResetPasswordRequest) => authApi.resetPassword(data),
    onSuccess: () => {
      toast.success("Contraseña restablecida correctamente.");
      router.push("/login");
    },
    onError: () => {
      toast.error(
        "No se pudo restablecer la contraseña. El enlace puede haber expirado.",
      );
    },
  });
}

export function useLogout() {
  const router = useRouter();
  const clearSession = useAuthStore(state => state.clearSession);
  const clearBusiness = useBusinessStore(state => state.clearBusiness);

  const logout = async () => {
    try {
      await authApi.logout();
    } finally {
      // Limpiamos el estado local independientemente de si el API responde
      clearSession();
      clearBusiness();
      router.push("/login");
    }
  };

  return { logout };
}
