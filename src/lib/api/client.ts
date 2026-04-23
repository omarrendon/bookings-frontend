import { useAuthStore } from "@/store/auth.store";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

// Lee el token directamente del estado en memoria de Zustand.
// El token nunca se persiste en localStorage — vive solo en memoria por seguridad.
const getToken = (): string | null => {
  return useAuthStore.getState().token;
};

// ── Error tipado ──────────────────────────────────────────────────────────────

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// ── Request core ──────────────────────────────────────────────────────────────

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
};

async function request<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const token = getToken();
  const { body, headers, ...rest } = options;

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...rest,
    credentials: "include", // necesario para enviar/recibir cookies httpOnly (refreshToken)
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });

  if (!response.ok) {
    const errorBody = await response
      .json()
      .catch(() => ({ message: "Error desconocido" }));
    throw new ApiError(
      response.status,
      (errorBody as { message?: string }).message ?? "Error en el servidor",
    );
  }

  // 204 No Content — no hay cuerpo que parsear
  if (response.status === 204) return undefined as T;

  return response.json() as Promise<T>;
}

// ── Métodos públicos ──────────────────────────────────────────────────────────

export const apiClient = {
  get: <T>(endpoint: string, options?: Omit<RequestOptions, "body">) =>
    request<T>(endpoint, { ...options, method: "GET" }),

  post: <T>(endpoint: string, body: unknown, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: "POST", body }),

  put: <T>(endpoint: string, body: unknown, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: "PUT", body }),

  patch: <T>(endpoint: string, body: unknown, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: "PATCH", body }),

  delete: <T>(endpoint: string, options?: Omit<RequestOptions, "body">) =>
    request<T>(endpoint, { ...options, method: "DELETE" }),

  // Para subir archivos — no usa Content-Type: application/json
  upload: async <T>(endpoint: string, formData: FormData): Promise<T> => {
    const token = getToken();
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      credentials: "include", // necesario para enviar/recibir cookies httpOnly (refreshToken)
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    });
    if (!res.ok) {
      const err = await res
        .json()
        .catch(() => ({ message: "Error al subir archivo" }));
      throw new ApiError(
        res.status,
        (err as { message?: string }).message ?? "Error al subir archivo",
      );
    }
    return res.json() as Promise<T>;
  },
};
