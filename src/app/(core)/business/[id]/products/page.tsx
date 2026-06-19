import Link from "next/link";
import Footer from "@/components/ui/Footer";
import ProductsSelector from "./components/ProductsSelector";
import BookingStepBar from "../components/BookingStepBar";
import { productsApi } from "@/lib/api/products.api";
import { ApiError } from "@/lib/api/client";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

interface BusinessProductsPageProps {
  params: Promise<{ id: string }>;
}

export default async function BusinessProductsPage({
  params,
}: BusinessProductsPageProps) {
  const { id } = await params;

  let products;
  try {
    const response = await productsApi.getByBusiness(id);
    products = response.data;
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }
    throw error;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1 pt-20 pb-20 px-4 sm:px-10 lg:px-16">
        <div className="max-w-6xl mx-auto">
          {/* Volver */}
          <Link
            href={`/business/${id}`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="size-4" />
            Volver al negocio
          </Link>

          {/* Barra de pasos */}
          <BookingStepBar currentStep={1} />

          {/* Encabezado */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">
              Elige tus servicios
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Selecciona uno o más servicios para incluir en tu cita
            </p>
          </div>

          <ProductsSelector products={products ?? []} businessId={id} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
