// Components
import Footer from "@/components/ui/Footer";
import ScheduleDetail from "./components/ScheduleDetail";
import BackToBusinessButton from "./components/BackToBusinessButton";
// Icons
import { CheckCircle2 } from "lucide-react";

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
            <BackToBusinessButton businessId={id} />
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
