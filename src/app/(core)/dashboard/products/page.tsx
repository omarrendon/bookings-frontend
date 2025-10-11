import Title from "@/components/ui/Title";
import LayoutProducts from "./components/LayoutProducts";

export default function ProductsPage() {
  return (
    <div className="flex w-full flex-col gap-6 ">
      <Title text="Mis Productos" />
      <div className="flex w-full flex-col gap-6 ">
        <LayoutProducts />
      </div>
    </div>
  );
}
