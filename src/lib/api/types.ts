// ── Auth ─────────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  name: string;
  last_name: string;
  email: string;
  created_at: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface RequestPasswordResetRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  new_password: string;
}

// ── Business ──────────────────────────────────────────────────────────────────

export interface SocialLink {
  platform: string;
  url: string;
}

export interface Business {
  id: string;
  name: string;
  description?: string;
  phone_number?: string;
  website?: string;
  street: string;
  external_number: string;
  internal_number?: string;
  neighborhood?: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  social_links?: SocialLink[];
  main_image_url?: string;
  gallery_images?: string[];
  created_at: string;
}
export interface BusinessResponse {
  data: Business;
  message: string;
  success: boolean;
}

export interface CreateBusinessRequest {
  name: string;
  description?: string;
  phone_number?: string;
  website?: string;
  street: string;
  external_number: string;
  internal_number?: string;
  neighborhood?: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  social_links?: SocialLink[];
  main_image_url?: string;
  gallery_images?: string[];
}

export type UpdateBusinessRequest = Partial<CreateBusinessRequest>;

// ── Products ──────────────────────────────────────────────────────────────────

export interface Product {
  id: string;
  business_id: string;
  name: string;
  description?: string;
  price: number;
  gallery_images?: string[];
  estimated_delivery_time: number;
  created_at: string;
}

export interface ProductResponse {
  data: Product;
  message: string;
  success: boolean;
}

export interface ProductsListResponse {
  data: Product[];
  message: string;
  success: boolean;
}

export interface CreateProductRequest {
  name: string;
  description?: string;
  price: number;
  gallery_images?: string[];
  estimated_delivery_hours: number;
  estimated_delivery_minutes?: number;
}

export type UpdateProductRequest = Partial<CreateProductRequest>;

// ── Reservations ──────────────────────────────────────────────────────────────

export type ReservationStatus = "pending" | "confirmed" | "cancelled";

export interface Reservation {
  id: string;
  business_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  proof_of_payment_url: string;
  scheduled_at: string;
  status: ReservationStatus;
  created_at: string;
}

export interface CreateReservationRequest {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  proof_of_payment_url: string;
  scheduled_at: string;
}

// ── Schedules ─────────────────────────────────────────────────────────────────

export interface TimeSlot {
  start: string; // "09:00"
  end: string; // "10:00"
  isBooked: boolean;
}

export interface DaySlots {
  date: string; // "YYYY-MM-DD"
  slots: TimeSlot[];
}

export interface MonthSlotsResponse {
  data: {
    slots: DaySlots[];
  };
  message: string;
  success: boolean;
}

// ── File Upload ───────────────────────────────────────────────────────────────

export interface UploadResponse {
  url: string;
}
