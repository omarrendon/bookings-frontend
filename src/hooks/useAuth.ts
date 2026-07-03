"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authApi } from "@/lib/api/auth.api";
import { businessApi } from "@/lib/api/business.api";
import { ApiError } from "@/lib/api/client";
import { useAuthStore } from "@/store/auth.store";
import { useBusinessStore } from "@/store/business.store";
import type {
  LoginRequest,
  SignUpRequest,
  RequestPasswordResetRequest,
  ResetPasswordRequest,
  UpdateProfileRequest,
} from "@/lib/api/types";

export function useUpdateProfile() {
  const updateUser = useAuthStore(state => state.updateUser);

  return useMutation({
    mutationFn: (data: UpdateProfileRequest) => authApi.updateProfile(data),
    onSuccess: response => {
      updateUser(response.data);
      toast.success("Perfil actualizado correctamente.");
    },
    onError: (error: unknown) => {
      if (error instanceof ApiError && error.status === 409) {
        toast.error("Ese correo electrónico ya está en uso.");
      } else {
        toast.error("No se pudo actualizar el perfil. Inténtalo de nuevo.");
      }
    },
  });
}

export function useGoogleAuth() {
  const router = useRouter();
  const setSession = useAuthStore(state => state.setSession);
  const setBusiness = useBusinessStore(state => state.setBusiness);

  return useMutation({
    mutationFn: (idToken: string) => authApi.googleLogin(idToken),
    onSuccess: async response => {
      // Guardar sesión con user completo (incluye avatar_url y auth_provider)
      setSession(response.data.user, response.data.token);

      // Cargar el negocio para que los componentes del dashboard tengan datos
      try {
        const businessResponse = await businessApi.getMy();
        setBusiness(businessResponse.data);
      } catch {
        // Cuenta nueva sin negocio — flujo normal
      }

      toast.success("Sesión iniciada con Google correctamente");
      router.push("/dashboard");
    },
    onError: (error: unknown) => {
      if (error instanceof ApiError) {
        switch (error.status) {
          case 400:
            toast.error("No se pudo autenticar con Google. Inténtalo de nuevo.");
            break;
          case 401:
            toast.error("Token de Google inválido. Inténtalo de nuevo.");
            break;
          default:
            toast.error("No se pudo iniciar sesión. Inténtalo de nuevo.");
        }
      } else {
        toast.error("No se pudo iniciar sesión con Google. Inténtalo de nuevo.");
      }
    },
  });
}

export function useLogin() {
  const router = useRouter();
  const setSession = useAuthStore(state => state.setSession);

  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: response => {
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
            toast.error(
              "Demasiados intentos. Espera unos minutos e intenta de nuevo.",
            );
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
  const setSession = useAuthStore(state => state.setSession);
  const setPostAuthRedirect = useAuthStore(state => state.setPostAuthRedirect);

  return useMutation({
    mutationFn: (data: SignUpRequest) => authApi.signUp(data),
    onSuccess: response => {
      setPostAuthRedirect("/dashboard/business");
      setSession(response.data.user, response.data.token);
      toast.success("Cuenta creada correctamente. ¡Bienvenido!");
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
    onError: (error: unknown) => {
      if (error instanceof ApiError && error.status === 400) {
        toast.error("El enlace expiró o ya fue utilizado. Solicita uno nuevo.");
        router.push("/login/reset-password");
      } else {
        toast.error(
          "No se pudo restablecer la contraseña. Inténtalo de nuevo.",
        );
      }
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
      clearSession();
      clearBusiness();
      router.push("/login");
    }
  };

  return { logout };
}
