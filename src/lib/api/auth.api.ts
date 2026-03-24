import { apiClient } from "./client";
import type {
  AuthResponse,
  LoginRequest,
  SignUpRequest,
  RequestPasswordResetRequest,
  ResetPasswordRequest,
} from "./types";

export const authApi = {
  login: (data: LoginRequest) =>
    apiClient.post<AuthResponse>("/auth/login", data),

  signUp: (data: SignUpRequest) =>
    apiClient.post<AuthResponse>("/auth/register", data),

  requestPasswordReset: (data: RequestPasswordResetRequest) =>
    apiClient.post<void>("/auth/request-password-reset", data),

  resetPassword: (data: ResetPasswordRequest) =>
    apiClient.post<void>("/auth/reset-password", data),

  logout: () =>
    apiClient.post<void>("/auth/logout", {}),
};
