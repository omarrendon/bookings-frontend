"use client";
// Dependencies
import { useState } from "react";
// Components
import Title from "@/components/ui/Title";
import SubTitle from "@/components/ui/SubTitle";
import AddProductModal from "./AddProductModal";
// Icons
import { BadgePlus } from "lucide-react";

export default function NoFoundProducts() {
  const [isOpenModalProduct, setIsOpenModalProduct] = useState(false);

  return (
    <div className="w-full flex flex-col justify-center items-center gap-6 ">
      <Title text="No cuentas con productos" className="!text-2xl" />
      <BadgePlus
        size={60}
        className="text-primary hover:cursor-pointer hover:scale-110 transition-all"
        onClick={() => setIsOpenModalProduct(true)}
      />
      <SubTitle
        text="Comienza agregando productos para que tus clientes puedan verlos y reservarlos."
        className="!text-center"
      />
      <AddProductModal
        isOpen={isOpenModalProduct}
        onClose={() => setIsOpenModalProduct(!isOpenModalProduct)}
      />
    </div>
  );
}
