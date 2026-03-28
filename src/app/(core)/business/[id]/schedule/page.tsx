// Components
import Link from "next/link";
import Footer from "@/components/ui/Footer";
import CardSummaryServices from "./components/CardSummaryServices";
import SchedulePicker from "./components/SchedulePicker";
// Icons
import { ArrowLeft } from "lucide-react";

interface BusinessSchedulePageProps {
  params: Promise<{ id: string }>;
}

export default async function BusinessSchedulePage({
  params,
}: BusinessSchedulePageProps) {
  const { id } = await params;

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 pt-20 pb-20 px-6 sm:px-10 lg:px-16">
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
            <h1 className="text-3xl font-bold tracking-tight">Reservar cita</h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Selecciona fecha, hora y confirma tu reserva
            </p>
          </div>

          {/* Main grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Calendar + times */}
            <div className="lg:col-span-2">
              <SchedulePicker />
            </div>

            {/* Order summary */}
            <div>
              <CardSummaryServices />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
