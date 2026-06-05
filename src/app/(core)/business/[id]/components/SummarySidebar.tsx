"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { Product } from "@/lib/api/types";
import { cn } from "@/lib/utils";
import { formatPrice, formatDuration } from "@/utils/utils";
import { ArrowRight, Clock, ShoppingBag, Sparkles } from "lucide-react";

interface SummarySidebarProps {
  selectedProducts: Product[];
  total: number;
  handleContinue: () => void;
}

const FALLBACK_IMAGE =
  "https://hips.hearstapps.com/hmg-prod/images/le-maise-9-1672919228.jpg";

export default function SummarySidebar({
  selectedProducts,
  total,
  handleContinue,
}: SummarySidebarProps) {
  const isEmpty = selectedProducts.length === 0;

  return (
    <div className="bg-card rounded-2xl border border-border/60 overflow-hidden sticky top-28 shadow-sm">
      {/* Encabezado */}
      <div className="px-5 py-4 border-b border-border/60 bg-muted/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="size-4 text-primary" />
            <h2 className="font-semibold tracking-tight">Mi selección</h2>
          </div>
          {!isEmpty && (
            <span className="inline-flex items-center justify-center size-5 rounded-full bg-primary text-primary-foreground text-xs font-bold">
              {selectedProducts.length}
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {isEmpty
            ? "Ningún servicio seleccionado aún"
            : `${selectedProducts.length} ${selectedProducts.length === 1 ? "servicio" : "servicios"} en tu reserva`}
        </p>
      </div>

      {/* Lista de productos */}
      {!isEmpty ? (
        <div className="divide-y divide-border/60">
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
                  {formatDuration(product.estimated_delivery_time)}
                </div>
                <p className="font-semibold text-sm mt-0.5 text-primary">
                  {formatPrice(product.price)}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="px-5 py-10 flex flex-col items-center text-center gap-2">
          <div className="size-10 rounded-full bg-muted flex items-center justify-center">
            <Sparkles className="size-4 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium text-muted-foreground">
            Selecciona servicios
          </p>
          <p className="text-xs text-muted-foreground/70 max-w-[180px]">
            Elige uno o más del catálogo y aparecerán aquí
          </p>
        </div>
      )}

      {/* Total y CTA */}
      <div className="p-4 bg-muted/30 border-t border-border/60 space-y-3">
        {!isEmpty && (
          <>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">{formatPrice(total)}</span>
            </div>
            <Separator className="border-border/60" />
            <div className="flex justify-between items-center">
              <span className="font-semibold text-sm">Total</span>
              <span className="font-bold text-xl">{formatPrice(total)}</span>
            </div>
          </>
        )}
        <Button
          className={cn("w-full rounded-full gap-2 cursor-pointer font-medium")}
          size="lg"
          disabled={isEmpty}
          onClick={handleContinue}
        >
          Continuar al horario
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
