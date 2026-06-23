"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { reservationsApi } from "@/lib/api/reservations.api";
import { ApiError } from "@/lib/api/client";
import type {
  CreateReservationRequest,
  CreateBookingRequest,
  ReservationStatus,
  RescheduleRequest,
} from "@/lib/api/types";

export const reservationKeys = {
  all: ["reservations"] as const,
  byBusiness: (businessId: string) => ["reservations", businessId] as const,
  detail: (businessId: string, id: string) =>
    ["reservations", businessId, id] as const,
};

export function useGetReservations(businessId: string) {
  return useQuery({
    queryKey: reservationKeys.byBusiness(businessId),
    queryFn: () => reservationsApi.getByBusiness(businessId),
    enabled: !!businessId,
    select: res => res.data,
  });
}

export function useCreateReservation(businessId: string) {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: CreateReservationRequest) =>
      reservationsApi.create(data),
    onSuccess: () => {
      router.push(`/business/${businessId}/confirmation`);
    },
    onError: () => {
      toast.error("No se pudo enviar la reserva. Inténtalo de nuevo.");
    },
  });
}

export function useBookReservation() {
  return useMutation({
    mutationFn: (data: CreateBookingRequest) => reservationsApi.book(data),
    onError: (error: unknown) => {
      if (error instanceof ApiError) {
        switch (error.status) {
          case 400:
            toast.error("No se pudo crear la reserva", {
              description: error.message,
            });
            break;
          case 404:
            toast.error("El negocio no fue encontrado.");
            break;
          case 409:
            toast.error("Horario no disponible", {
              description: "Ya existe una reserva en ese horario. Elige otro.",
            });
            break;
          default:
            toast.error("Error inesperado. Inténtalo de nuevo.");
        }
      } else {
        toast.error("No se pudo enviar la reserva. Inténtalo de nuevo.");
      }
    },
  });
}

export function useUpdateReservationStatus(businessId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      reservationId,
      status,
    }: {
      reservationId: string;
      status: ReservationStatus;
    }) => reservationsApi.updateStatus(reservationId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: reservationKeys.byBusiness(businessId),
      });
      toast.success("Estado de la reserva actualizado.");
    },
    onError: (error: unknown) => {
      if (error instanceof ApiError) {
        switch (error.status) {
          case 400:
            toast.error("Cambio de estado no permitido", {
              description: error.message,
            });
            break;
          case 403:
            toast.error("No tienes permiso para modificar esta reserva.");
            break;
          case 404:
            toast.error("Reservación no encontrada.");
            break;
          case 422:
            toast.error("No se puede cambiar el estado", {
              description: "La reserva ya fue cancelada o completada.",
            });
            break;
          default:
            toast.error("Error inesperado. Inténtalo de nuevo.");
        }
      } else {
        toast.error("No se pudo actualizar el estado. Inténtalo de nuevo.");
      }
    },
  });
}

export function useRescheduleReservation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      reservationId,
      data,
    }: {
      reservationId: string | number;
      data: RescheduleRequest;
    }) => reservationsApi.reschedule(reservationId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reservationKeys.all });
    },
    onError: (error: unknown) => {
      if (error instanceof ApiError) {
        switch (error.status) {
          case 400:
            toast.error("No se pudo reprogramar", { description: error.message });
            break;
          case 403:
            toast.error("No tienes permiso para reprogramar esta cita.");
            break;
          case 404:
            toast.error("Reservación no encontrada.");
            break;
          case 409:
            toast.error("Conflicto de horario", {
              description: "Ya existe otra reserva en ese horario.",
            });
            break;
          case 422:
            toast.error("La reserva ya fue cancelada o completada y no puede reprogramarse.");
            break;
          default:
            toast.error("Error inesperado. Inténtalo de nuevo.");
        }
      } else {
        toast.error("No se pudo reprogramar la cita. Inténtalo de nuevo.");
      }
    },
  });
}
