"use client";
// Components
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
// Hooks & store
import { useDeleteProduct, productKeys } from "@/hooks/useProducts";
import { useBusinessStore } from "@/store/business.store";
import { useQueryClient } from "@tanstack/react-query";
// API
import { productsApi } from "@/lib/api/products.api";
// Types
import type { Product } from "@/lib/api/types";
// Icons
import { Trash2 } from "lucide-react";

interface DeleteProductModalProps {
  isOpen: boolean;
  product: Product | null;
  onClose: () => void;
}

export default function DeleteProductModal({
  isOpen,
  product,
  onClose,
}: DeleteProductModalProps) {
  const business = useBusinessStore(state => state.business);
  const businessId = business?.id?.toString() ?? "";
  const deleteProduct = useDeleteProduct(businessId);
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    if (!product) return;

    try {
      // 1. Eliminar todas las imágenes del producto en paralelo
      if (product.images.length > 0) {
        await Promise.all(product.images.map(img => productsApi.deleteImage(img.id)));
      }

      // 2. Eliminar el producto
      await deleteProduct.mutateAsync(product.id.toString());

      // 3. Refetch de la lista actualizada
      await queryClient.invalidateQueries({
        queryKey: productKeys.byBusiness(businessId),
      });

      onClose();
    } catch {
      // El hook ya muestra el toast de error
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm flex flex-col gap-0 p-0 overflow-hidden">
        <DialogHeader className="px-6 py-5 border-b">
          <div className="flex flex-col items-center gap-3">
            <div className="size-10 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
              <Trash2 className="size-5 text-destructive" />
            </div>
            <DialogTitle className="text-base font-semibold">
              Eliminar servicio
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground text-center">
              ¿Estás seguro de que deseas eliminar este producto?
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="flex gap-3 px-6 py-4 border-t">
          <Button
            type="button"
            variant="outline"
            className="flex-1 rounded-full"
            onClick={onClose}
            disabled={deleteProduct.isPending}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            variant="destructive"
            className="flex-1 rounded-full gap-1.5"
            onClick={handleDelete}
            disabled={deleteProduct.isPending}
          >
            <Trash2 className="size-3.5" />
            {deleteProduct.isPending ? "Eliminando..." : "Eliminar servicio"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
