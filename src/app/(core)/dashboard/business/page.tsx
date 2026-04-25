// Components
import Title from "@/components/ui/Title";
import BusinessSetupForm from "./components/BusinessSetupForm";

export default function BusinessPage() {
  return (
    <div className="flex w-full flex-col gap-6">
      <div>
        <Title text="Mi Negocio" />
        <p className="text-sm text-muted-foreground mt-1">
          Completa la información de tu negocio. Los campos marcados con{" "}
          <span className="text-destructive font-medium">*</span> son
          obligatorios.
        </p>
      </div>
      <div className="max-w-6xl w-full">
        <BusinessSetupForm />
      </div>
    </div>
  );
}
