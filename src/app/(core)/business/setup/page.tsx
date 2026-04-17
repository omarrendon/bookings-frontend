// Components
import Link from "next/link";
import Footer from "@/components/ui/Footer";
import BusinessSetupForm from "./components/BusinessSetupForm";
// Icons
import { GalleryVerticalEnd } from "lucide-react";

export default function BusinessSetupPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <header className="px-6 sm:px-10 lg:px-16 py-5 border-b">
        <Link href="/" className="flex items-center gap-2 font-semibold w-fit">
          <div className="bg-primary text-primary-foreground flex size-7 items-center justify-center rounded-lg">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Bookea.me
        </Link>
      </header>

      <main className="flex-1 py-12 px-6 sm:px-10 lg:px-16">
        <div className="max-w-2xl mx-auto">

          {/* Page header */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold tracking-tight">
              Configura tu negocio
            </h1>
            <p className="text-muted-foreground mt-2 text-sm">
              Completa la información para empezar a recibir reservaciones. Los campos marcados con{" "}
              <span className="text-destructive font-medium">*</span> son obligatorios.
            </p>
          </div>

          <BusinessSetupForm />
        </div>
      </main>

      <Footer />
    </div>
  );
}
