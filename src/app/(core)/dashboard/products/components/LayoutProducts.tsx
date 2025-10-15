"use client";
// Dependencies
import { useState } from "react";
// Components
import NoFoundProducts from "./NoFoundProducts";
import ServiceCard from "@/components/ui/ServiceCard";
import AddProductModal from "./AddProductModal";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import PrimaryButton from "@/components/ui/PrimaryButton";

export default function LayoutProducts() {
  const [products, setProducts] = useState([10, 20, 30]);
  const [isOpenModalProduct, setIsOpenModalProduct] = useState(false);
  const [isEditableModal, setIsEditableModal] = useState(false);

  const handleEditProduct = (productName: string) => {
    setIsEditableModal(true);
    setIsOpenModalProduct(true);
    toast.info(`Editando ${productName}`, {
      description: "Se ha abierto el modal de edición",
    });
  };

  const handleAddProduct = () => {
    setIsEditableModal(false);
    setIsOpenModalProduct(true);
  };

  const handleProductSuccess = () => {
    // Aquí podrías actualizar la lista de productos
    // Por ahora solo mostramos una notificación adicional
    toast.info("Actualizando lista de productos...");
  };

  const handleReserveProduct = (productName: string) => {
    toast.success(`${productName} reservado`, {
      description: "Tu reserva se ha procesado correctamente",
    });
  };

  const handleDeleteProduct = (productName: string, index: number) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
    toast.success(`${productName} eliminado`, {
      description: "El producto se ha eliminado correctamente",
    });
  };

  return (
    <div className="flex h-full w-full flex-col p-4">
      <Toaster position="bottom-right" richColors duration={3000} />
      {products && products.length > 0 ? (
        <div className="grid h-full w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <ServiceCard
              key={index}
              description="Descripción del producto"
              price="$100"
              time="30 minutos"
              title={`Producto ${index + 1}`}
              isEditable
              onEdit={() => handleEditProduct(`Producto ${index + 1}`)}
              onDelete={() =>
                handleDeleteProduct(`Producto ${index + 1}`, index)
              }
              onReserve={() => handleReserveProduct(`Producto ${index + 1}`)}
            />
          ))}
        </div>
      ) : (
        <NoFoundProducts setIsOpenModalProduct={handleAddProduct} />
      )}
      <AddProductModal
        isOpen={isOpenModalProduct}
        onClose={() => setIsOpenModalProduct(false)}
        isEditable={isEditableModal}
        onSuccess={handleProductSuccess}
      />
    </div>
  );
}
