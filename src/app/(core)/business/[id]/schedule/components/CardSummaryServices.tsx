"use client";

import Image from "next/image";
import { CalendarDays, Clock, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store/cart.store";
import { formatPrice, formatDuration } from "@/utils/utils";
import { useRouter } from "next/navigation";

const FALLBACK_IMAGE =
  "https://hips.hearstapps.com/hmg-prod/images/le-maise-9-1672919228.jpg";

export default function CardSummaryServices() {
  const router = useRouter();
  const { selectedProducts, selectedDate, selectedTime } = useCartStore();
  const canConfirm = !!selectedDate && !!selectedTime;
  const total = selectedProducts.reduce(
    (sum, product) => sum + Number(product.price),
    0,
  );

  const formattedDate = selectedDate
    ? new Date(selectedDate + "T12:00:00").toLocaleDateString("es-ES", {
        weekday: "short",
        day: "numeric",
        month: "long",
      })
    : null;

  const handleRedirectToFormConfirm = () => {
    router.push(`/business/${selectedProducts[0].business_id}/form-confirm`);
  };

  return (
    <div className="bg-card rounded-2xl border border-border/60 overflow-hidden sticky top-28 shadow-sm">
      {/* Encabezado */}
      <div className="px-5 py-4 border-b border-border/60 bg-muted/20">
        <h2 className="font-semibold tracking-tight">Resumen de reserva</h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          {selectedProducts.length}{" "}
          {selectedProducts.length === 1
            ? "servicio seleccionado"
            : "servicios seleccionados"}
        </p>
      </div>

      {/* Fecha y hora seleccionadas */}
      <div className="px-5 py-3.5 border-b border-border/60 bg-primary/5">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <CalendarDays className="size-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            {formattedDate ? (
              <p className="text-sm font-medium capitalize">{formattedDate}</p>
            ) : (
              <p className="text-sm text-muted-foreground italic">
                Sin fecha seleccionada
              </p>
            )}
            {selectedTime ? (
              <div className="flex items-center gap-1 mt-0.5">
                <Clock className="size-3 text-primary" />
                <p className="text-xs font-medium text-primary">
                  {selectedTime}
                </p>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground italic mt-0.5">
                Sin hora seleccionada
              </p>
            )}
          </div>
          {canConfirm && (
            <Badge
              variant="secondary"
              className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-0 text-xs shrink-0"
            >
              Listo
            </Badge>
          )}
        </div>
      </div>

      {/* Lista de servicios */}
      <div className="divide-y divide-border/60">
        {selectedProducts.map(product => (
          <div key={product.id} className="flex gap-3 p-4">
            <div className="relative size-12 rounded-xl overflow-hidden flex-shrink-0">
              <Image
                src={product.images?.[0]?.url ?? FALLBACK_IMAGE}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm line-clamp-1">{product.name}</p>
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

      {/* Total y CTA */}
      <div className="p-4 bg-muted/30 border-t border-border/60 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium">{formatPrice(total)}</span>
        </div>
        <Separator className="border-border/60" />
        <div className="flex justify-between items-center">
          <span className="font-semibold text-sm">Total</span>
          <span className="font-bold text-xl">{formatPrice(total)}</span>
        </div>
        <Button
          className="w-full rounded-full gap-2 cursor-pointer font-medium"
          size="lg"
          disabled={!canConfirm}
          onClick={handleRedirectToFormConfirm}
        >
          <CreditCard className="size-4" />
          Confirmar reserva
        </Button>
        {!canConfirm && (
          <p className="text-center text-xs text-muted-foreground">
            Selecciona una fecha y hora para continuar
          </p>
        )}
      </div>
    </div>
  );
}
