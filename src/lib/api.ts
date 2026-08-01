/**
 * Thin fetch wrapper around the Express backend.
 * Base URL comes from VITE_API_BASE_URL (see .env.example) so it can point
 * at localhost during development and the Render URL in production.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const TOKEN_KEY = "talent_pathway_token";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

/**
 * Decodes the role out of the JWT payload without a network call, for fast
 * client-side route guards. This is a UX convenience only — it is NOT a
 * security boundary. The real enforcement is server-side, in
 * backend/middleware/auth.js (authorize()). A user could edit this token or
 * fake a role client-side and it would change nothing, because every
 * protected API route re-verifies the JWT and role on the server.
 */
export function getTokenRole(): "provider" | "admin" | null {
  const token = getToken();
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role ?? null;
  } catch {
    return null;
  }
}

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    ...(options.body && !(options.body instanceof FormData) ? { "Content-Type": "application/json" } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers as Record<string, string> | undefined),
  };

  const res = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new ApiError(data.error || `Request failed with status ${res.status}`, res.status);
  }
  return data as T;
}

export interface AuthUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: "provider" | "admin";
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

export const api = {
  register: (payload: { name: string; email: string; phone: string; password: string; category?: string }) =>
    request<AuthResponse>("/auth/register", { method: "POST", body: JSON.stringify(payload) }),

  login: (payload: { email: string; password: string }) =>
    request<AuthResponse>("/auth/login", { method: "POST", body: JSON.stringify(payload) }),

  me: () => request<{ user: AuthUser }>("/auth/me"),

  getProviderProfile: () => request("/provider/profile"),

  updateProviderProfile: (payload: Record<string, unknown>) =>
    request("/provider/profile", { method: "PUT", body: JSON.stringify(payload) }),

  uploadDocument: (label: string, file: File) => {
    const formData = new FormData();
    formData.append("label", label);
    formData.append("document", file);
    return request("/provider/documents", { method: "POST", body: formData });
  },

  submitApplication: () => request("/provider/submit", { method: "POST" }),

  adminListProviders: (params?: { status?: string; category?: string; search?: string }) => {
    const qs = params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : "";
    return request(`/admin/providers${qs}`);
  },

  adminUpdateStatus: (id: string, status: string, remarks?: string) =>
    request(`/admin/providers/${id}/status`, { method: "PUT", body: JSON.stringify({ status, remarks }) }),
};
