// Components
import BusinessSetupForm from "./components/BusinessSetupForm";
// Icons
import { Building2 } from "lucide-react";

export default function BusinessPage() {
  return (
    <div className="flex w-full flex-col gap-8">
      {/* Page header */}
      <div className="flex items-center gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
          <Building2 className="size-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Mi Negocio</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Configura la información pública de tu negocio. Los campos marcados
            con <span className="text-destructive font-medium">*</span> son
            obligatorios.
          </p>
        </div>
      </div>

      <div className="max-w-6xl w-full">
        <BusinessSetupForm />
      </div>
    </div>
  );
}
