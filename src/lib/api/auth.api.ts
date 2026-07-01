import { apiClient } from "./client";
import type {
  AuthResponse,
  LoginRequest,
  SignUpRequest,
  RequestPasswordResetRequest,
  ResetPasswordRequest,
  UpdateProfileRequest,
  UpdateProfileResponse,
} from "./types";

export const authApi = {
  login: (data: LoginRequest) =>
    apiClient.post<AuthResponse>("/auth/login", data),

  signUp: (data: SignUpRequest) =>
    apiClient.post<AuthResponse>("/auth/signup", data),

  requestPasswordReset: (data: RequestPasswordResetRequest) =>
    apiClient.post<void>("/auth/reset-password", data),

  resetPassword: (data: ResetPasswordRequest) =>
    apiClient.post<void>("/auth/password-update", data),

  updateProfile: (data: UpdateProfileRequest) =>
    apiClient.put<UpdateProfileResponse>("/users/me", data),

  googleLogin: (idToken: string) =>
    apiClient.post<AuthResponse>("/auth/google", { id_token: idToken }),

  // Usa la cookie httpOnly del refreshToken para obtener un nuevo access token
  refresh: () =>
    apiClient.post<AuthResponse>("/auth/refresh", {}),

  logout: () =>
    apiClient.post<void>("/auth/logout", {}),
};
