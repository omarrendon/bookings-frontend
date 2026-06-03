// ── Auth ─────────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  name: string;
  last_name: string;
  email: string;
  created_at: string;
}

// Usuario devuelto por el endpoint de login (shape reducido)
export interface LoginUser {
  id: number;
  name: string;
  last_name: string;
  email: string;
  role: string;
}

// Wrapper estándar de respuesta exitosa del backend
export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: LoginUser;
  };
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
  role: string;
}

export interface RequestPasswordResetRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
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

export interface UpdateBusinessResponse {
  success: boolean;
  data: {
    updatedBusiness: Business;
  };
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

export interface ProductImage {
  id: number;
  product_id: number;
  order: number;
  public_id: string;
  url: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: number;
  business_id: number;
  category_id: number | null;
  name: string;
  description?: string;
  price: string;            // el backend lo devuelve como "150.00"
  stock: number;
  estimated_delivery_time: string; // minutos en decimal: "30.00"
  gallery_images: string[] | null;
  images: ProductImage[];
  created_at: string;
  updated_at: string;
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
  estimated_delivery_time: number; // total en minutos
  business_id: string;
  stock?: number;
  category_id?: string;
  gallery_images?: string[];
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

// ── Booking (POST /api/reservations) ──────────────────────────────────────────

export interface BookingProductItem {
  product_id: string;
  quantity?: number;
}

export interface CreateBookingRequest {
  business_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  start_time: string;        // ISO 8601 — "2026-04-15T10:00:00.000Z"
  products: BookingProductItem[];
  user_id?: string;
  proof_of_payment?: string; // URL del comprobante
}

export interface BookingResponse {
  success: boolean;
  message: string;
  data: {
    reservation: Reservation;
    products: Product[];
  };
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
  message: string;
  success: boolean;
  data: {
    month: string; // ISO — "2026-04-01T00:00:00.000Z"
    slots: DaySlots[];
  };
}

// ── File Upload ───────────────────────────────────────────────────────────────

export interface GalleryImageItem {
  id: number;
  url: string;
  order: number;
}

export interface UploadGalleryResponse {
  success: boolean;
  data: GalleryImageItem[];
}

export interface DeleteImageResponse {
  success: boolean;
  message: string;
}

export interface DeleteProductResponse {
  success: boolean;
  message: string;
}
