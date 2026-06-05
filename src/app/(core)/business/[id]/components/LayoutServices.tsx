import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/api/types";
import ProductCard from "./ProductCard";

interface LayoutServicesProps {
  products: Product[] | null;
  businessId: string;
}

export default function LayoutServices({
  products,
  businessId,
}: LayoutServicesProps) {
  if (!products || products.length === 0) return null;

  return (
    <section id="servicios" className="py-16 px-6 sm:px-10 lg:px-16">
      <div className="max-w-6xl mx-auto">
        {/* Encabezado de sección */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-medium mb-3">
              <Sparkles className="size-3" />
              Catálogo
            </div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Nuestros servicios
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {products.length}{" "}
              {products.length === 1
                ? "servicio disponible"
                : "servicios disponibles"}
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="gap-2 rounded-full border-border/60 self-start sm:self-auto shrink-0"
          >
            <Link href={`/business/${businessId}/products`}>
              Ver todos y reservar
              <ArrowRight className="size-3.5" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map(product => (
            <ProductCard
              key={product.id}
              gallery_images={product.gallery_images}
              name={product.name}
              description={product.description}
              price={product.price}
              estimated_delivery_time={product.estimated_delivery_time}
              businessId={businessId}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
