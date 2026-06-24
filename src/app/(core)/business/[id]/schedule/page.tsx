import Link from "next/link";
import SchedulePicker from "./components/SchedulePicker";
import CardSummaryServices from "./components/CardSummaryServices";
import BookingStepBar from "../components/BookingStepBar";
import { ArrowLeft } from "lucide-react";

interface BusinessSchedulePageProps {
  params: Promise<{ id: string }>;
}

export default async function BusinessSchedulePage({
  params,
}: BusinessSchedulePageProps) {
  const { id } = await params;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1 pt-20 pb-20 px-4 sm:px-10 lg:px-16">
        <div className="max-w-6xl mx-auto">
          {/* Volver */}
          <Link
            href={`/business/${id}/products`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="size-4" />
            Volver a los servicios
          </Link>

          {/* Barra de pasos */}
          <BookingStepBar currentStep={2} />

          {/* Encabezado */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">
              Elige tu horario
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Selecciona la fecha y hora que mejor se ajuste a ti
            </p>
          </div>

          {/* Grid principal */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <SchedulePicker businessId={id} />
            </div>
            <div>
              <CardSummaryServices />
            </div>
          </div>
        </div>
      </main>


    </div>
  );
}
