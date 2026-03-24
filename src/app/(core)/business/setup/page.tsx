// Components
import Link from "next/link";
import { GalleryVerticalEnd } from "lucide-react";
import BusinessSetupForm from "./components/BusinessSetupForm";

export default function BusinessSetupPage() {
  return (
    <div className="min-h-svh flex flex-col">
      <div className="p-6 md:p-10">
        <Link href="/" className="flex items-center gap-2 font-medium w-fit">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Bookea.me
        </Link>
      </div>
      <div className="flex flex-1 items-start justify-center px-6 pb-10 md:px-10">
        <div className="w-full max-w-2xl">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold">Configura tu negocio</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Completa la información para empezar a recibir reservaciones.
            </p>
          </div>
          <div className="rounded-xl border p-6">
            <BusinessSetupForm />
          </div>
        </div>
      </div>
    </div>
  );
}
