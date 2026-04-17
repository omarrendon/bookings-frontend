"use client";
// Store
import { useCartStore } from "@/store/cart.store";
// Components
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
// Utils
import { formatPrice, formatDuration } from "@/utils/utils";
// Icons
import { CalendarDays, Clock, ShoppingBag } from "lucide-react";

const FALLBACK_IMAGE =
  "https://hips.hearstapps.com/hmg-prod/images/le-maise-9-1672919228.jpg";

export default function BookingSummary() {
  const { selectedProducts, selectedDate, selectedTime } = useCartStore();
  const total = selectedProducts.reduce((sum, p) => sum + p.price, 0);

  const formattedDate = selectedDate
    ? new Date(selectedDate + "T12:00:00").toLocaleDateString("es-ES", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div className="bg-card rounded-2xl border overflow-hidden sticky top-28">
      {/* Header */}
      <div className="px-5 py-4 border-b">
        <div className="flex items-center gap-2">
          <ShoppingBag className="size-4 text-primary" />
          <h2 className="font-semibold tracking-tight">Resumen de reserva</h2>
        </div>
        <p className="text-sm text-muted-foreground mt-0.5">
          {selectedProducts.length === 0
            ? "Ningún servicio seleccionado"
            : `${selectedProducts.length} ${selectedProducts.length === 1 ? "servicio" : "servicios"}`}
        </p>
      </div>

      {/* Products */}
      {selectedProducts.length > 0 && (
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
                  {formatDuration(product.estimated_delivery_time)}
                </div>
                <p className="font-bold text-sm mt-0.5">
                  {formatPrice(product.price)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Date + Time */}
      <div className="px-5 py-4 border-t space-y-3">
        <div className="flex items-start gap-3">
          <CalendarDays className="size-4 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs text-muted-foreground">Fecha</p>
            <p className="text-sm font-medium capitalize">
              {formattedDate ?? (
                <span className="text-muted-foreground italic">No seleccionada</span>
              )}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Clock className="size-4 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs text-muted-foreground">Hora</p>
            <p className="text-sm font-medium">
              {selectedTime ?? (
                <span className="text-muted-foreground italic">No seleccionada</span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Total */}
      {selectedProducts.length > 0 && (
        <div className="px-5 pb-5 space-y-3">
          <Separator />
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium">{formatPrice(total)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold">Total</span>
            <span className="font-bold text-xl">{formatPrice(total)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
