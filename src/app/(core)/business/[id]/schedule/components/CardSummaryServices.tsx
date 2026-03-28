import Image from "next/image";
import { Clock, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const FALLBACK_IMAGE =
  "https://hips.hearstapps.com/hmg-prod/images/le-maise-9-1672919228.jpg";

const MOCK_SERVICES = [
  { id: 1, name: "Corte de Cabello", duration: "30 mins", price: 20 },
  { id: 2, name: "Coloración", duration: "60 mins", price: 40 },
];

export default function CardSummaryServices() {
  const total = MOCK_SERVICES.reduce((sum, s) => sum + s.price, 0);

  return (
    <div className="bg-card rounded-2xl border overflow-hidden sticky top-28">
      {/* Header */}
      <div className="px-5 py-4 border-b">
        <h2 className="font-semibold tracking-tight">Resumen de reserva</h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          {MOCK_SERVICES.length}{" "}
          {MOCK_SERVICES.length === 1
            ? "servicio seleccionado"
            : "servicios seleccionados"}
        </p>
      </div>

      {/* Services list */}
      <div className="divide-y">
        {MOCK_SERVICES.map(service => (
          <div key={service.id} className="flex gap-3 p-4">
            <div className="relative size-14 rounded-xl overflow-hidden flex-shrink-0">
              <Image
                src={FALLBACK_IMAGE}
                alt={service.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm line-clamp-1">{service.name}</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                <Clock className="size-3" />
                {service.duration}
              </div>
              <p className="font-bold text-sm mt-1">${service.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Totals + CTA */}
      <div className="p-4 bg-muted/40 border-t space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium">${total}</span>
        </div>
        <Separator />
        <div className="flex justify-between items-center">
          <span className="font-semibold">Total</span>
          <span className="font-bold text-xl">${total}</span>
        </div>
        <Button className="w-full rounded-full gap-2 cursor-pointer" size="lg">
          <CreditCard className="size-4" />
          Confirmar reserva
        </Button>
      </div>
    </div>
  );
}
