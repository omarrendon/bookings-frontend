"use client";
// Dependencies
import { useState } from "react";
// Components
import NoFoundProducts from "./NoFoundProducts";
import ServiceCard from "@/components/ui/ServiceCard";

export default function LayoutProducts() {
  const [products, setProducts] = useState([10, 20, 30]); // Example products array

  return (
    <div className="flex h-full w-full flex-col p-4">
      {products && products.length > 0 ? (
        <div className="grid h-full w-full grid-cols-1 gap-6 lg:grid-cols-3 ">
          {products.map((product, index) => (
            <ServiceCard
              key={index}
              description="Descripción del producto"
              price="$100"
              time="30 minutos"
              title={`Producto ${index + 1}`}
            />
          ))}
        </div>
      ) : (
        <NoFoundProducts />
      )}
    </div>
  );
}
