"use client";
// Dependencies
import { useState } from "react";
// Components
import NoFoundProducts from "./NoFoundProducts";

export default function LayoutProducts() {
  const [products, setProducts] = useState([]);

  return (
    <div className="flex h-full w-full flex-col p-4">
      {products && products.length > 0 ? (
        <div className="grid h-full w-full grid-cols-1 gap-6 lg:grid-cols-3 ">
          {/* Aquí va la lista de productos */}
          <p>Aquí puedes ver y gestionar tus productos.</p>
        </div>
      ) : (
        <NoFoundProducts />
      )}
    </div>
  );
}
