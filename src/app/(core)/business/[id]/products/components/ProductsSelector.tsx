"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Check,
  Clock,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/api/types";

const FALLBACK_IMAGE =
  "https://hips.hearstapps.com/hmg-prod/images/le-maise-9-1672919228.jpg";

interface ProductsSelectorProps {
  products: Product[];
  businessId: string;
}

export default function ProductsSelector({
  products,
  businessId,
}: ProductsSelectorProps) {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectedProducts = products.filter(p => selectedIds.has(p.id));
  const total = selectedProducts.reduce((sum, p) => sum + p.price, 0);

  const handleContinue = () => {
    const ids = [...selectedIds].join(",");
    router.push(`/business/${businessId}/schedule?products=${ids}`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      {/* ── Products grid ── */}
      <div className="lg:col-span-2">
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground">
            <ShoppingBag className="size-10 mb-3 opacity-30" />
            <p className="font-medium">Sin servicios disponibles</p>
            <p className="text-sm mt-1">
              Este negocio aún no ha publicado servicios.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {products.map(product => {
              const selected = selectedIds.has(product.id);
              return (
                <div
                  key={product.id}
                  onClick={() => toggle(product.id)}
                  className={cn(
                    "group bg-card rounded-2xl border overflow-hidden cursor-pointer transition-all duration-200",
                    selected
                      ? "border-primary ring-2 ring-primary/20 shadow-md"
                      : "hover:shadow-md hover:border-muted-foreground/30",
                  )}
                >
                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={product.gallery_images?.[0] ?? FALLBACK_IMAGE}
                      alt={product.name}
                      fill
                      className={cn(
                        "object-cover transition-transform duration-500",
                        selected
                          ? "scale-105"
                          : "group-hover:scale-105",
                      )}
                    />
                    {selected && (
                      <div className="absolute top-3 right-3 size-7 rounded-full bg-primary flex items-center justify-center shadow-md">
                        <Check className="size-4 text-primary-foreground" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-semibold text-base mb-1 line-clamp-1">
                      {product.name}
                    </h3>
                    {product.description && (
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {product.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between pt-3 border-t">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-lg font-bold text-primary">
                          ${product.price}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="size-3" />
                          {product.estimated_delivery_time} min
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant={selected ? "default" : "outline"}
                        className="rounded-full text-xs gap-1 pointer-events-none"
                        tabIndex={-1}
                      >
                        {selected ? (
                          <>
                            <Minus className="size-3" />
                            Quitar
                          </>
                        ) : (
                          <>
                            <Plus className="size-3" />
                            Agregar
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Summary sidebar ── */}
      <div>
        <div className="bg-card rounded-2xl border overflow-hidden sticky top-28">
          <div className="px-5 py-4 border-b">
            <div className="flex items-center gap-2">
              <ShoppingBag className="size-4 text-primary" />
              <h2 className="font-semibold tracking-tight">Mi selección</h2>
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">
              {selectedProducts.length === 0
                ? "Ningún servicio seleccionado"
                : `${selectedProducts.length} ${selectedProducts.length === 1 ? "servicio" : "servicios"}`}
            </p>
          </div>

          {selectedProducts.length > 0 ? (
            <div className="divide-y">
              {selectedProducts.map(product => (
                <div key={product.id} className="flex gap-3 p-4">
                  <div className="relative size-12 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={product.gallery_images?.[0] ?? FALLBACK_IMAGE}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm line-clamp-1">
                      {product.name}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                      <Clock className="size-3" />
                      {product.estimated_delivery_time} min
                    </div>
                    <p className="font-bold text-sm mt-0.5">${product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-5 py-10 text-center text-sm text-muted-foreground">
              Selecciona servicios del catálogo para agregarlos aquí
            </div>
          )}

          <div className="p-4 bg-muted/40 border-t space-y-3">
            {selectedProducts.length > 0 && (
              <>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${total}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-xl">${total}</span>
                </div>
              </>
            )}
            <Button
              className="w-full rounded-full gap-2 cursor-pointer"
              size="lg"
              disabled={selectedProducts.length === 0}
              onClick={handleContinue}
            >
              Continuar
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
