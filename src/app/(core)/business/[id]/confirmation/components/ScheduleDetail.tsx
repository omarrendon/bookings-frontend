"use client";
// Store
import { useCartStore } from "@/store/cart.store";
// Components
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
// Utils
import { formatPrice, formatDuration } from "@/utils/utils";
// Icons
import { CalendarDays, Clock, ShoppingBag, User, Mail, Phone } from "lucide-react";

const FALLBACK_IMAGE =
  "https://hips.hearstapps.com/hmg-prod/images/le-maise-9-1672919228.jpg";

export default function ScheduleDetail() {
  const { selectedProducts, selectedDate, selectedTime, customerInfo } =
    useCartStore();

  const total = selectedProducts.reduce((sum, p) => sum + p.price, 0);

  const formattedDate = selectedDate
    ? new Date(selectedDate + "T12:00:00").toLocaleDateString("es-ES", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "—";

  return (
    <div className="flex flex-col gap-4">

      {/* Date & Time */}
      <div className="bg-card rounded-2xl border overflow-hidden">
        <div className="px-5 py-4 border-b flex items-center gap-2">
          <CalendarDays className="size-4 text-primary" />
          <h2 className="font-semibold tracking-tight">Fecha y hora</h2>
        </div>
        <div className="grid grid-cols-2 divide-x">
          <div className="px-5 py-4 flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">Fecha</span>
            <span className="text-sm font-medium capitalize">
              {formattedDate}
            </span>
          </div>
          <div className="px-5 py-4 flex flex-col gap-1">
            <div className="flex items-center gap-1.5">
              <Clock className="size-3 text-primary" />
              <span className="text-xs text-muted-foreground">Hora</span>
            </div>
            <span className="text-sm font-medium">
              {selectedTime ?? "—"}
            </span>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="bg-card rounded-2xl border overflow-hidden">
        <div className="px-5 py-4 border-b flex items-center gap-2">
          <ShoppingBag className="size-4 text-primary" />
          <h2 className="font-semibold tracking-tight">Servicios</h2>
          <span className="ml-auto text-xs text-muted-foreground">
            {selectedProducts.length}{" "}
            {selectedProducts.length === 1 ? "servicio" : "servicios"}
          </span>
        </div>
        {selectedProducts.length > 0 ? (
          <>
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
            <div className="px-5 py-4 bg-muted/40 border-t space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">{formatPrice(total)}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-xl">{formatPrice(total)}</span>
              </div>
            </div>
          </>
        ) : (
          <p className="px-5 py-6 text-sm text-muted-foreground text-center">
            Sin servicios registrados
          </p>
        )}
      </div>

      {/* Customer info */}
      <div className="bg-card rounded-2xl border overflow-hidden">
        <div className="px-5 py-4 border-b flex items-center gap-2">
          <User className="size-4 text-primary" />
          <h2 className="font-semibold tracking-tight">Datos del cliente</h2>
        </div>
        <div className="divide-y">
          <div className="flex items-center gap-3 px-5 py-3.5">
            <User className="size-4 text-muted-foreground flex-shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Nombre</p>
              <p className="text-sm font-medium">
                {customerInfo?.name ?? "—"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-5 py-3.5">
            <Mail className="size-4 text-muted-foreground flex-shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Correo</p>
              <p className="text-sm font-medium">
                {customerInfo?.email ?? "—"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-5 py-3.5">
            <Phone className="size-4 text-muted-foreground flex-shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Teléfono</p>
              <p className="text-sm font-medium">
                {customerInfo?.phone ?? "—"}
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
