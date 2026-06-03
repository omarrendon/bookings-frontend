"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { productsApi } from "@/lib/api/products.api";
import type {
  CreateProductRequest,
  UpdateProductRequest,
} from "@/lib/api/types";

export const productKeys = {
  all: ["products"] as const,
  byBusiness: (businessId: string) => ["products", businessId] as const,
  detail: (businessId: string, id: string) =>
    ["products", businessId, id] as const,
};

export function useGetProducts(businessId: string) {
  return useQuery({
    queryKey: productKeys.byBusiness(businessId),
    queryFn: () => productsApi.getByBusiness(businessId),
    enabled: !!businessId,
  });
}

export function useCreateProduct(businessId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProductRequest) => productsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productKeys.byBusiness(businessId),
      });
      toast.success("Producto creado correctamente.");
    },
    onError: () => {
      toast.error("No se pudo crear el producto. Inténtalo de nuevo.");
    },
  });
}

export function useUpdateProduct(businessId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productId,
      data,
    }: {
      productId: string;
      data: UpdateProductRequest;
    }) => productsApi.update(productId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productKeys.byBusiness(businessId),
      });
      toast.success("Producto actualizado correctamente.");
    },
    onError: () => {
      toast.error("No se pudo actualizar el producto. Inténtalo de nuevo.");
    },
  });
}

export function useDeleteProduct(businessId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) =>
      productsApi.delete(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productKeys.byBusiness(businessId),
      });
      toast.success("Producto eliminado correctamente.");
    },
    onError: () => {
      toast.error("No se pudo eliminar el producto. Inténtalo de nuevo.");
    },
  });
}
