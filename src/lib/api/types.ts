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

export interface UpdateProfileRequest {
  name: string;
  last_name: string;
  email: string;
}

export interface UpdateProfileResponse {
  success: boolean;
  message: string;
  data: LoginUser;
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
  price: string; // el backend lo devuelve como "150.00"
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

export type ReservationStatus = "pending" | "confirmed" | "cancelled" | "completed" | "rescheduled";

export type ProofOfPaymentStatus = "pending" | "approved" | "rejected";

export interface ProofOfPaymentItem {
  id: number;
  url: string;
  status: ProofOfPaymentStatus;
  uploaded_by: string | null;
  created_at: string;
}

export interface ReservationProduct {
  id: number;
  name: string;
  price: string;
  estimated_delivery_time: number;
  ReservationProduct: {
    quantity: number;
  };
}

export interface Reservation {
  id: number;
  business_id: number;
  user_id: string | null;
  reservation_date: string;
  status: ReservationStatus;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  proof_of_payment: string | null; // campo legacy
  notes: string | null;
  start_time: string;
  end_time: string;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
  products: ReservationProduct[];
  proof_of_payments: ProofOfPaymentItem[];
}

export interface ReservationsFilters {
  status?: string[];        // e.g. ['pending', 'confirmed']
  date_from?: string;       // YYYY-MM-DD
  date_to?: string;         // YYYY-MM-DD
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
}

export interface ReservationsListResponse {
  message: string;
  data: Reservation[];
  meta: {
    total: number;
    page: number;
    limit: number;
    [key: string]: unknown; // filtros activos reflejados en meta
  };
  success: boolean;
}

export interface CreateReservationRequest {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  proof_of_payment_url: string;
  scheduled_at: string;
}

// ── Update status (PATCH /api/reservations/:id/status) ───────────────────────

export interface UpdateStatusResponse {
  message: string;
  data: Reservation;
  success: boolean;
}

// ── Reschedule (PATCH /api/reservations/:id/reschedule) ──────────────────────

export interface RescheduleRequest {
  new_date: string; // YYYY-MM-DD
  new_time: string; // HH:mm
}

export interface RescheduleResponse {
  message: string;
  data: Reservation;
  success: boolean;
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
  start_time: string; // ISO 8601 — "2026-04-15T10:00:00.000Z"
  products: BookingProductItem[];
  proof_of_payment?: string; // URL del comprobante (obtenida tras upload)
  notes?: string;
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

export interface CreateScheduleHour {
  day: string;
  open_time: string | null;
  close_time: string | null;
}

export interface CreateScheduleRequest {
  business_id: number;
  date_from: string;
  date_to: string;
  slot_duration_minutes: number;
  hours: CreateScheduleHour[];
}

// Shape returned by GET /schedules/:businessId
export interface Schedule {
  id: number;
  date: string;                  // "YYYY-MM-DD"
  open_time: string;             // "HH:MM:SS"
  close_time: string;            // "HH:MM:SS"
  slot_duration_minutes: number;
  business_id: number;
}

export interface SchedulesListResponse {
  success: boolean;
  message: string;
  data: Schedule[];
}

// ── Derived types (used by calendar/picker components) ────────────────────────

export interface TimeSlot {
  start: string;       // "HH:MM"
  end?: string;        // "HH:MM" — opcional, no siempre viene del backend
  isBooked: boolean;
  scheduleId?: number;
}

export interface DaySlots {
  date: string; // "YYYY-MM-DD"
  slots: TimeSlot[];
}

export interface SlotsMonthResponse {
  data: {
    month: string;
    slots: DaySlots[];
  };
  message: string;
  success: boolean;
}

// ── File Upload ───────────────────────────────────────────────────────────────

export interface GalleryImageItem {
  id: number;
  url: string;
  order: number;
}

export interface UploadResponse {
  success: boolean;
  data: { url: string };
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
