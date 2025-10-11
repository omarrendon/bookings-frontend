// Components
import SubTitle from "@/components/ui/SubTitle";
import Title from "@/components/ui/Title";
import { BadgePlus } from "lucide-react";
import AddProductModal from "./AddProductModal";

export default function NoFoundProducts() {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-6 ">
      <Title text="No cuentas con productos" className="!text-2xl" />
      <BadgePlus
        size={60}
        className="text-primary hover:cursor-pointer hover:scale-110 transition-all"
      />
      <SubTitle
        text="Comienza agregando productos para que tus clientes puedan verlos y reservarlos."
        className="!text-center"
      />
      <AddProductModal isOpen={true} onClose={() => {}} />
    </div>
  );
}
