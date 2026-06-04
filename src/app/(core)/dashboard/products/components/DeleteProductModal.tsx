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
import { AlertTriangle, ImageOff, Loader2, Trash2 } from "lucide-react";

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
      if (product.images.length > 0) {
        await Promise.all(
          product.images.map(img => productsApi.deleteImage(img.id)),
        );
      }

      await deleteProduct.mutateAsync(product.id.toString());

      await queryClient.invalidateQueries({
        queryKey: productKeys.byBusiness(businessId),
      });

      onClose();
    } catch {
      // El hook ya muestra el toast de error
    }
  };

  const isPending = deleteProduct.isPending;
  const firstImage = product?.images?.sort((a, b) => a.order - b.order)[0];
  const imageCount = product?.images?.length ?? 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm flex flex-col gap-0 p-0 overflow-hidden">
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-5 border-b">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10 ring-4 ring-destructive/5">
              <Trash2 className="size-5 text-destructive" />
            </div>
            <div className="space-y-1">
              <DialogTitle className="text-lg font-semibold">
                Eliminar servicio
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                Esta acción es permanente y no se puede deshacer.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Cuerpo */}
        <div className="flex flex-col gap-4 px-6 py-5">
          {/* Preview del producto que se va a eliminar */}
          {product && (
            <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-muted/40 p-3">
              {firstImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={firstImage.url}
                  alt={product.name}
                  className="size-12 rounded-lg object-cover shrink-0 border border-border/40"
                />
              ) : (
                <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-muted border border-border/40">
                  <ImageOff className="size-5 text-muted-foreground" />
                </div>
              )}
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-sm font-medium leading-tight truncate">
                  {product.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {imageCount > 0
                    ? `${imageCount} ${imageCount === 1 ? "imagen" : "imágenes"} asociada${imageCount === 1 ? "" : "s"}`
                    : "Sin imágenes"}
                </span>
              </div>
            </div>
          )}

          {/* Advertencia de consecuencias */}
          {imageCount > 0 && (
            <div
              role="alert"
              className="flex items-start gap-2.5 rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2.5"
            >
              <AlertTriangle className="size-4 text-destructive shrink-0 mt-0.5" />
              <p className="text-sm text-destructive/80 leading-snug">
                Se eliminarán también las{" "}
                <span className="font-medium">
                  {imageCount} {imageCount === 1 ? "imagen" : "imágenes"}
                </span>{" "}
                asociadas a este servicio.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 py-4 border-t bg-muted/30">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={onClose}
            disabled={isPending}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            variant="destructive"
            className="flex-1 gap-2"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Trash2 className="size-4" />
            )}
            {isPending ? "Eliminando..." : "Eliminar"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
