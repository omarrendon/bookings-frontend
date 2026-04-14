// Components
import Link from "next/link";
import Footer from "@/components/ui/Footer";
import ScheduleDetail from "./components/ScheduleDetail";
// Icons
import { CheckCircle2, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BusinessConfirmationPageProps {
  params: Promise<{ id: string }>;
}

export default async function BusinessConfirmationPage({
  params,
}: BusinessConfirmationPageProps) {
  const { id } = await params;

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 pt-20 pb-20 px-6 sm:px-10 lg:px-16">
        <div className="max-w-2xl mx-auto">

          {/* Success header */}
          <div className="flex flex-col items-center text-center mb-10">
            <div className="size-20 rounded-full bg-green-500/10 flex items-center justify-center mb-5">
              <CheckCircle2 className="size-10 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">
              ¡Reserva confirmada!
            </h1>
            <p className="text-muted-foreground mt-2 text-sm max-w-sm">
              Tu cita ha sido reservada con éxito. Recibirás un correo con los
              detalles de tu reservación.
            </p>
          </div>

          {/* Booking details */}
          <ScheduleDetail />

          {/* Actions */}
          <div className="mt-8 flex justify-center">
            <Button asChild variant="outline" className="rounded-full gap-2">
              <Link href={`/business/${id}`}>
                <Home className="size-4" />
                Volver al negocio
              </Link>
            </Button>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
