const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

// Lee el token del store de Zustand persistido en localStorage.
// La clave "bookea-auth" debe coincidir con el nombre del store en auth.store.ts.
const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("bookea-auth");
    if (!raw) return null;
    return (
      (JSON.parse(raw) as { state?: { token?: string } })?.state?.token ?? null
    );
  } catch {
    return null;
  }
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
