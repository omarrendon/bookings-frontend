import { apiClient } from "./client";
import type {
  Reservation,
  ReservationsListResponse,
  ReservationsFilters,
  CreateReservationRequest,
  CreateBookingRequest,
  BookingResponse,
  ReservationStatus,
  UpdateStatusResponse,
  RescheduleRequest,
  RescheduleResponse,
  UploadResponse,
} from "./types";

export const reservationsApi = {
  getByBusiness: (
    businessId: string,
    filters: ReservationsFilters = {},
    page = 1,
    limit = 20,
  ) => {
    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("limit", String(limit));
    if (filters.status?.length) params.set("status", filters.status.join(","));
    if (filters.date_from) params.set("date_from", filters.date_from);
    if (filters.date_to) params.set("date_to", filters.date_to);
    if (filters.customer_name) params.set("customer_name", filters.customer_name);
    if (filters.customer_email) params.set("customer_email", filters.customer_email);
    if (filters.customer_phone) params.set("customer_phone", filters.customer_phone);
    return apiClient.get<ReservationsListResponse>(
      `/reservations/${businessId}?${params.toString()}`,
    );
  },

  getById: (reservationId: string) =>
    apiClient.get<Reservation>(`/reservations/${reservationId}`),

  create: (data: CreateReservationRequest) =>
    apiClient.post<Reservation>(`/reservations`, data),

  updateStatus: (reservationId: string, status: ReservationStatus) =>
    apiClient.put<UpdateStatusResponse>(`/reservations/${reservationId}`, {
      status,
    }),

  book: (data: CreateBookingRequest) =>
    apiClient.post<BookingResponse>("/reservations", data),

  reschedule: (reservationId: string | number, data: RescheduleRequest) =>
    apiClient.patch<RescheduleResponse>(
      `/reservations/${reservationId}/reschedule`,
      data,
    ),

  uploadProofOfPayment: (reservationId: string, file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return apiClient.upload<UploadResponse>(
      `/reservations/${reservationId}/upload-proof`,
      formData,
    );
  },
};
