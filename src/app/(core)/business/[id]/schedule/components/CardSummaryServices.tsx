"use client";
import Image from "next/image";
import { Clock, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
    (sum, product) => sum + product.price,
    0,
  );

  const handleRedirectToFormConfirm = () => {
    router.push(`/business/${selectedProducts[0].business_id}/form-confirm`);
  };

  return (
    <div className="bg-card rounded-2xl border overflow-hidden sticky top-28">
      {/* Header */}
      <div className="px-5 py-4 border-b">
        <h2 className="font-semibold tracking-tight">Resumen de reserva</h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          {selectedProducts.length}{" "}
          {selectedProducts.length === 1
            ? "servicio seleccionado"
            : "servicios seleccionados"}
        </p>
      </div>

      {/* Services list */}
      <div className="divide-y">
        {selectedProducts.map(product => (
          <div key={product.id} className="flex gap-3 p-4">
            <div className="relative size-14 rounded-xl overflow-hidden flex-shrink-0">
              <Image
                src={product.gallery_images?.[0] ?? FALLBACK_IMAGE}
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
              <p className="font-bold text-sm mt-1">
                {formatPrice(product.price)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Totals + CTA */}
      <div className="p-4 bg-muted/40 border-t space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium">{formatPrice(total)}</span>
        </div>
        <Separator />
        <div className="flex justify-between items-center">
          <span className="font-semibold">Total</span>
          <span className="font-bold text-xl">{formatPrice(total)}</span>
        </div>
        <Button
          className="w-full rounded-full gap-2 hover:cursor-pointer"
          size="lg"
          disabled={!canConfirm}
          onClick={handleRedirectToFormConfirm}
        >
          <CreditCard className="size-4" />
          Confirmar reserva
        </Button>
      </div>
    </div>
  );
}
