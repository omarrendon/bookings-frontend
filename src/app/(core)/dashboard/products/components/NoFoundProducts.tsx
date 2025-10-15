"use client";
// Components
import Title from "@/components/ui/Title";
import SubTitle from "@/components/ui/SubTitle";
// Icons
import { BadgePlus } from "lucide-react";

interface NoFoundProductsProps {
  setIsOpenModalProduct: (isOpen: boolean) => void;
}

export default function NoFoundProducts({
  setIsOpenModalProduct,
}: NoFoundProductsProps) {
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
    </div>
  );
}
