import { apiClient } from "./client";
import type {
  Reservation,
  CreateReservationRequest,
  CreateBookingRequest,
  BookingResponse,
  ReservationStatus,
  UploadResponse,
} from "./types";

export const reservationsApi = {
  getByBusiness: (businessId: string) =>
    apiClient.get<Reservation[]>(`/businesses/${businessId}/reservations`),

  getById: (businessId: string, reservationId: string) =>
    apiClient.get<Reservation>(
      `/businesses/${businessId}/reservations/${reservationId}`,
    ),

  create: (businessId: string, data: CreateReservationRequest) =>
    apiClient.post<Reservation>(
      `/businesses/${businessId}/reservations`,
      data,
    ),

  updateStatus: (
    businessId: string,
    reservationId: string,
    status: ReservationStatus,
  ) =>
    apiClient.patch<Reservation>(
      `/businesses/${businessId}/reservations/${reservationId}/status`,
      { status },
    ),

  book: (data: CreateBookingRequest) =>
    apiClient.post<BookingResponse>("/reservations", data),

  uploadProofOfPayment: (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return apiClient.upload<UploadResponse>("/reservations/upload-proof", formData);
  },
};
