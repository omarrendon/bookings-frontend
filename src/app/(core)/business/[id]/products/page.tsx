import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
// API
import { productsApi } from "@/lib/api/products.api";
import { ApiError } from "@/lib/api/client";
// Components
import NavigationBar from "@/components/ui/NavigationBar";
import Footer from "@/components/ui/Footer";
import ProductsSelector from "./components/ProductsSelector";

interface BusinessProductsPageProps {
  params: Promise<{ id: string }>;
}

export default async function BusinessProductsPage({
  params,
}: BusinessProductsPageProps) {
  const { id } = await params;

  let products;
  try {
    const response = await productsApi.getById(id);
    products = response.data;
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }
    throw error;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar id={id} />

      <main className="flex-1 pt-28 pb-20 px-6 sm:px-10 lg:px-16">
        <div className="max-w-6xl mx-auto">
          {/* Back + heading */}
          <div className="mb-10">
            <Link
              href={`/business/${id}`}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-5"
            >
              <ArrowLeft className="size-4" />
              Volver al negocio
            </Link>
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
