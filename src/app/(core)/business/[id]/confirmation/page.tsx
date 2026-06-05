import { businessApi } from "@/lib/api/business.api";
import { formatAdress } from "@/utils/utils";
import Footer from "@/components/ui/Footer";
import ScheduleDetail from "./components/ScheduleDetail";
import BackToBusinessButton from "./components/BackToBusinessButton";
import BusinessContactCard from "./components/BusinessContactCard";
import { CheckCircle2, Mail } from "lucide-react";

interface BusinessConfirmationPageProps {
  params: Promise<{ id: string }>;
}

export default async function BusinessConfirmationPage({
  params,
}: BusinessConfirmationPageProps) {
  const { id } = await params;

  const businessRes = await businessApi.getById(id);
  const business = businessRes.data;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1 pt-20 pb-20 px-4 sm:px-10 lg:px-16">
        <div className="max-w-2xl mx-auto">
          {/* Encabezado de éxito */}
          <div className="flex flex-col items-center text-center mb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Icono de éxito con anillo */}
            <div className="relative mb-6">
              <div className="size-24 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <div className="size-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <CheckCircle2 className="size-9 text-emerald-500" />
                </div>
              </div>
              {/* Anillo exterior decorativo */}
              <div className="absolute inset-0 rounded-full border-2 border-emerald-500/20 animate-ping opacity-30" />
            </div>

            <h1 className="text-3xl font-bold tracking-tight mb-2">
              ¡Reserva confirmada!
            </h1>
            <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
              Tu cita ha sido reservada con éxito. Revisa tu correo electrónico
              para ver los detalles de tu reservación.
            </p>

            {/* Aviso de email */}
            <div className="flex items-center gap-2 mt-4 px-4 py-2.5 rounded-full bg-primary/5 border border-primary/20">
              <Mail className="size-3.5 text-primary" />
              <p className="text-xs text-primary font-medium">
                Confirmación enviada a tu correo
              </p>
            </div>
          </div>

          {/* Detalles de la reserva */}
          <ScheduleDetail />

          {/* Contacto del negocio */}
          <div className="mt-4">
            <BusinessContactCard
              phone={business.phone_number}
              address={formatAdress(business)}
              socialLinks={business.social_links}
            />
          </div>

          {/* Acciones */}
          <div className="mt-8 flex justify-center">
            <BackToBusinessButton businessId={id} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
