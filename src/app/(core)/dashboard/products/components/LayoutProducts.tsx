"use client";
// Dependencies
import { useState } from "react";
// Hooks
import { useGetProducts } from "@/hooks/useProducts";
import { useBusinessStore } from "@/store/business.store";
// Components
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import NoFoundProducts from "./NoFoundProducts";
import ServiceCard from "@/components/ui/ServiceCard";
import AddProductModal from "./AddProductModal";
import DeleteProductModal from "./DeleteProductModal";
// Types
import type { Product } from "@/lib/api/types";
// Utils
import { formatDuration } from "@/utils/utils";
// Icons
import { Plus } from "lucide-react";

export default function LayoutProducts() {
  const business = useBusinessStore(state => state.business);
  const businessId = business?.id?.toString() ?? "";

  const { data, isLoading, isError } = useGetProducts(businessId);
  const products = data?.data ?? [];

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);

  const handleAdd = () => {
    setEditingProduct(null);
    setIsOpenModal(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsOpenModal(true);
  };

  const handleClose = () => {
    setIsOpenModal(false);
    setEditingProduct(null);
  };

  return (
    <div className="flex w-full flex-col gap-6">
      {/* ── Header ── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-primary">Mis Productos</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Administra los productos que ofrece tu negocio.
          </p>
        </div>
        <Button onClick={handleAdd} className="rounded-full gap-1.5 shrink-0">
          <Plus className="size-4" />
          Agregar producto
        </Button>
      </div>

      {/* ── Content ── */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map(i => (
            <div
              key={i}
              className="rounded-2xl border overflow-hidden flex flex-col"
            >
              <Skeleton className="w-full aspect-video" />
              <div className="p-4 flex flex-col gap-3">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-8 w-full rounded-full mt-1" />
              </div>
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center justify-center py-16 text-center gap-2 rounded-2xl border-2 border-dashed border-border">
          <p className="text-sm font-medium text-destructive">
            No se pudieron cargar los servicios.
          </p>
          <p className="text-xs text-muted-foreground">
            Verifica tu conexión e intenta de nuevo.
          </p>
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map(product => (
            <ServiceCard
              key={product.id}
              title={product.name}
              description={product.description ?? ""}
              price={`$${parseFloat(product.price).toLocaleString("es-MX", { minimumFractionDigits: 2 })}`}
              time={formatDuration(parseFloat(product.estimated_delivery_time))}
              images={product.images}
              isEditable
              onEdit={() => handleEdit(product)}
              onDelete={() => setDeletingProduct(product)}
            />
          ))}
        </div>
      ) : (
        <NoFoundProducts onAdd={handleAdd} />
      )}

      <AddProductModal
        isOpen={isOpenModal}
        onClose={handleClose}
        product={editingProduct}
      />

      <DeleteProductModal
        isOpen={!!deletingProduct}
        product={deletingProduct}
        onClose={() => setDeletingProduct(null)}
      />
    </div>
  );
}
