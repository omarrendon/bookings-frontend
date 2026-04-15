"use client";
// Components
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/api/types";
import { Separator } from "@/components/ui/separator";
// Utils
import { cn } from "@/lib/utils";
import { formatPrice } from "@/utils/utils";
// Icons
import { ArrowRight, Clock, ShoppingBag } from "lucide-react";

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
  return (
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
                    {product.estimated_delivery_time} hrs
                  </div>
                  <p className="font-bold text-sm mt-0.5">
                    {formatPrice(product.price)}
                  </p>
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
                <span className="font-medium">{formatPrice(total)}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-xl">{formatPrice(total)}</span>
              </div>
            </>
          )}
          <Button
            className={cn("w-full rounded-full gap-2 cursor-pointer")}
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
  );
}
