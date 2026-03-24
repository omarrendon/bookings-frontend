"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { reservationsApi } from "@/lib/api/reservations.api";
import type { CreateReservationRequest, ReservationStatus } from "@/lib/api/types";

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
  });
}

export function useCreateReservation(businessId: string) {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: CreateReservationRequest) =>
      reservationsApi.create(businessId, data),
    onSuccess: () => {
      router.push(`/business/${businessId}/confirmation`);
    },
    onError: () => {
      toast.error("No se pudo enviar la reserva. Inténtalo de nuevo.");
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
    }) => reservationsApi.updateStatus(businessId, reservationId, status),
    onSuccess: () => {
      // Invalida la caché para que la lista se refresque automáticamente
      queryClient.invalidateQueries({
        queryKey: reservationKeys.byBusiness(businessId),
      });
      toast.success("Estado de la reserva actualizado.");
    },
    onError: () => {
      toast.error("No se pudo actualizar el estado. Inténtalo de nuevo.");
    },
  });
}
