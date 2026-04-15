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
