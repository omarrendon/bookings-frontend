"use client";
// Dependencies
import { useEffect } from "react";
import { useRouter } from "next/navigation";
// Store
import { useCartStore } from "@/store/cart.store";
// Components
import ProductCard from "@/app/(core)/business/[id]/components/ProductCard";
import SummarySidebar from "../../components/SummarySidebar";
// Types
import type { Product } from "@/lib/api/types";
// Icons
import { ShoppingBag } from "lucide-react";

interface ProductsSelectorProps {
  products: Product[];
  businessId: string;
}

export default function ProductsSelector({
  products,
  businessId,
}: ProductsSelectorProps) {
  const router = useRouter();

  const { businessId: storedBusinessId, selectedProducts, setBusinessId, toggleProduct, clearCart } =
    useCartStore();

  // Si el negocio cambió, limpiamos el carrito anterior
  useEffect(() => {
    if (storedBusinessId && storedBusinessId !== businessId) {
      clearCart();
    }
    setBusinessId(businessId);
  }, [businessId, storedBusinessId, clearCart, setBusinessId]);

  const total = selectedProducts.reduce((sum, p) => sum + p.price, 0);

  const handleContinue = () => {
    router.push(`/business/${businessId}/schedule`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      {/* ── Products grid ── */}
      <div className="lg:col-span-2">
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground">
            <ShoppingBag className="size-10 mb-3 opacity-30" />
            <p className="font-medium">Sin servicios disponibles</p>
            <p className="text-sm mt-1">
              Este negocio aún no ha publicado servicios.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {products.map(product => (
              <ProductCard
                key={product.id}
                gallery_images={product.gallery_images}
                name={product.name}
                description={product.description}
                price={product.price}
                estimated_delivery_time={product.estimated_delivery_time}
                businessId={businessId}
                selectable
                selected={selectedProducts.some(p => p.id === product.id)}
                onToggle={() => toggleProduct(product)}
              />
            ))}
          </div>
        )}
      </div>
      {/* ── Summary sidebar ── */}
      <SummarySidebar
        selectedProducts={selectedProducts}
        total={total}
        handleContinue={handleContinue}
      />
    </div>
  );
}
