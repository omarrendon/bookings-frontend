// Components
import Link from "next/link";
import Footer from "@/components/ui/Footer";
import CustomerForm from "./components/CustomerForm";
import BookingSummary from "./components/BookingSummary";
// Icons
import { ArrowLeft } from "lucide-react";

interface BusinessFormConfirmPageProps {
  params: Promise<{ id: string }>;
}

export default async function BusinessFormConfirmPage({
  params,
}: BusinessFormConfirmPageProps) {
  const { id } = await params;

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 pt-20 pb-20 px-6 sm:px-10 lg:px-16">
        <div className="max-w-6xl mx-auto">
          {/* Back + heading */}
          <div className="mb-10">
            <Link
              href={`/business/${id}/schedule`}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-5"
            >
              <ArrowLeft className="size-4" />
              Volver a seleccionar horario
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">
              Confirmar reserva
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Completa tus datos y adjunta tu comprobante de pago
            </p>
          </div>

          {/* Main grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <CustomerForm businessId={id} />
            </div>
            <div>
              <BookingSummary />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
