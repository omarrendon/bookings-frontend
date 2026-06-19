"use client";

import { useCartStore } from "@/store/cart.store";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { formatPrice, formatDuration } from "@/utils/utils";
import { CalendarDays, Clock, ShoppingBag } from "lucide-react";

const FALLBACK_IMAGE =
  "https://hips.hearstapps.com/hmg-prod/images/le-maise-9-1672919228.jpg";

export default function BookingSummary() {
  const { selectedProducts, selectedDate, selectedTime } = useCartStore();
  const total = selectedProducts.reduce((sum, p) => sum + Number(p.price), 0);

  const formattedDate = selectedDate
    ? new Date(selectedDate + "T12:00:00").toLocaleDateString("es-ES", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div className="bg-card rounded-2xl border border-border/60 overflow-hidden sticky top-28 shadow-sm">
      {/* Encabezado */}
      <div className="px-5 py-4 border-b border-border/60 bg-muted/20">
        <div className="flex items-center gap-2">
          <ShoppingBag className="size-4 text-primary" />
          <h2 className="font-semibold tracking-tight">Tu reserva</h2>
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">
          {selectedProducts.length === 0
            ? "Ningún servicio seleccionado"
            : `${selectedProducts.length} ${selectedProducts.length === 1 ? "servicio" : "servicios"}`}
        </p>
      </div>

      {/* Fecha y hora */}
      <div className="px-5 py-4 border-b border-border/60 space-y-3">
        <div className="flex items-start gap-3">
          <div className="size-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
            <CalendarDays className="size-3.5 text-primary" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Fecha
            </p>
            <p className="text-sm font-medium capitalize mt-0.5">
              {formattedDate ?? (
                <span className="text-muted-foreground italic">
                  No seleccionada
                </span>
              )}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="size-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
            <Clock className="size-3.5 text-primary" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Hora
            </p>
            <p className="text-sm font-medium mt-0.5">
              {selectedTime ?? (
                <span className="text-muted-foreground italic">
                  No seleccionada
                </span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Lista de productos */}
      {selectedProducts.length > 0 && (
        <div className="divide-y divide-border/60">
          {selectedProducts.map(product => (
            <div key={product.id} className="flex gap-3 p-4">
              <div className="relative size-11 rounded-xl overflow-hidden flex-shrink-0">
                <Image
                  src={product.images?.[0]?.url ?? FALLBACK_IMAGE}
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
      )}

      {/* Total */}
      {selectedProducts.length > 0 && (
        <div className="px-5 py-4 bg-muted/30 border-t border-border/60 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium">{formatPrice(total)}</span>
          </div>
          <Separator className="border-border/60" />
          <div className="flex justify-between items-center">
            <span className="font-semibold text-sm">Total</span>
            <span className="font-bold text-xl">{formatPrice(total)}</span>
          </div>
          <Badge
            variant="secondary"
            className="w-full justify-center bg-primary/5 text-primary border-0 text-xs py-1"
          >
            Pago en el establecimiento
          </Badge>
        </div>
      )}
    </div>
  );
}
