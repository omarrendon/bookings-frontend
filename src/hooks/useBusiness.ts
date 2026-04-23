"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { businessApi } from "@/lib/api/business.api";
import { useBusinessStore } from "@/store/business.store";
import type { CreateBusinessRequest, UpdateBusinessRequest } from "@/lib/api/types";

// Query keys centralizadas — evita strings duplicados en toda la app
export const businessKeys = {
  all: ["businesses"] as const,
  detail: (id: string) => ["businesses", id] as const,
};

export function useGetBusiness(id: string) {
  return useQuery({
    queryKey: businessKeys.detail(id),
    queryFn: () => businessApi.getById(id),
    enabled: !!id, // no ejecuta si id está vacío
  });
}

export function useCreateBusiness() {
  const router = useRouter();
  const setBusiness = useBusinessStore(state => state.setBusiness);

  return useMutation({
    mutationFn: (data: CreateBusinessRequest) => businessApi.create(data),
    onSuccess: response => {
      setBusiness(response.data);
      toast.success("Negocio configurado correctamente. ¡Bienvenido!");
      router.push("/dashboard");
    },
    onError: () => {
      toast.error("No se pudo guardar la configuración. Inténtalo de nuevo.");
    },
  });
}

export function useUpdateBusiness(id: string) {
  const queryClient = useQueryClient();
  const updateBusiness = useBusinessStore(state => state.updateBusiness);

  return useMutation({
    mutationFn: (data: UpdateBusinessRequest) => businessApi.update(id, data),
    onSuccess: response => {
      // Actualiza el store de Zustand
      updateBusiness(response.data);
      // Actualiza también la caché de React Query sin hacer un refetch
      queryClient.setQueryData(businessKeys.detail(id), response);
      toast.success("Negocio actualizado correctamente.");
    },
    onError: () => {
      toast.error("No se pudo actualizar el negocio. Inténtalo de nuevo.");
    },
  });
}
