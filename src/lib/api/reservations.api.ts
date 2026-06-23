import { apiClient } from "./client";
import type {
  Reservation,
  ReservationsListResponse,
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
  getByBusiness: (businessId: string) =>
    apiClient.get<ReservationsListResponse>(`/reservations/${businessId}`),

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
