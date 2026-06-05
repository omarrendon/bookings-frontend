"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart.store";
import ProductCard from "@/app/(core)/business/[id]/components/ProductCard";
import SummarySidebar from "../../components/SummarySidebar";
import type { Product } from "@/lib/api/types";
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

  const {
    businessId: storedBusinessId,
    selectedProducts,
    setBusinessId,
    toggleProduct,
    clearCart,
  } = useCartStore();

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
      {/* Grilla de productos */}
      <div className="lg:col-span-2">
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-3">
            <div className="rounded-full bg-muted p-4">
              <ShoppingBag className="size-8 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <p className="font-medium">Sin servicios disponibles</p>
              <p className="text-sm text-muted-foreground max-w-xs">
                Este negocio aún no ha publicado sus servicios. Vuelve pronto.
              </p>
            </div>
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

      {/* Sidebar de resumen */}
      <SummarySidebar
        selectedProducts={selectedProducts}
        total={total}
        handleContinue={handleContinue}
      />
    </div>
  );
}
