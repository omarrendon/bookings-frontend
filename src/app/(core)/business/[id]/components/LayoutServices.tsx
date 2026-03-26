import Link from "next/link";
import Image from "next/image";
import { Clock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/api/types";

const FALLBACK_IMAGE =
  "https://hips.hearstapps.com/hmg-prod/images/le-maise-9-1672919228.jpg";

interface LayoutServicesProps {
  products: Product[] | null;
  businessId: string;
}

const formatTime = (hours: number, minutes?: number): string => {
  const parts: string[] = [];
  if (hours > 0) parts.push(`${hours} hr${hours !== 1 ? "s" : ""}`);
  if (minutes && minutes > 0) parts.push(`${minutes} min`);
  return parts.length > 0 ? parts.join(" ") : "—";
};

export default function LayoutServices({
  products,
  businessId,
}: LayoutServicesProps) {
  if (!products || products.length === 0) return null;

  return (
    <section id="servicios" className="py-14 px-6 sm:px-10 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight">Servicios</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {products.length}{" "}
            {products.length === 1
              ? "servicio disponible"
              : "servicios disponibles"}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products &&
            products.length > 0 &&
            products.map(product => (
              <div
                key={product.id}
                className="group bg-card rounded-2xl border overflow-hidden hover:shadow-md transition-all duration-300"
              >
                {/* Imagen */}
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={product.gallery_images?.[0] ?? FALLBACK_IMAGE}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Contenido */}
                <div className="p-5">
                  <h3 className="font-semibold text-base mb-1 line-clamp-1">
                    {product.name}
                  </h3>
                  {product.description && (
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {product.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between mt-auto pt-3 border-t">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-lg font-bold text-primary">
                        ${product.price}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="size-3" />
                        {formatTime(product.estimated_delivery_time)}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-full text-xs gap-1"
                      asChild
                    >
                      <Link href={`/business/${businessId}/schedule`}>
                        Reservar
                        <ChevronRight className="size-3" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
