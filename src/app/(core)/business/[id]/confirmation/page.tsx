// Icons
import { CircleCheck } from "lucide-react";
import CardSummaryServices from "../schedule/components/CardSummaryServices";
import ScheduleDetail from "./components/ScheduleDetail";
import Link from "next/link";

export default function page() {
  return (
    <div className="w-full flex flex-col my-10 px-4 rounded-lg p-4 gap-6">
      <div className="flex flex-col items-center bg-blend-color p-2 rounded-lg gap-4">
        <CircleCheck size={64} color="green" />
        <h2 className="text-black text-2xl font-semibold">
          ¡Reserva Confirmada!
        </h2>
        <p className="text-black text-center w-full ">
          Tu cita ha sido reservada con éxito. Recibirás un correo de
          confirmación con los detalles de tu reservación.
        </p>
      </div>
      <ScheduleDetail />
      <CardSummaryServices />
      <div className="w-full flex flex-col items-center bg-blend-color p-4 rounded-lg gap-4">
        <Link href="/" className="text-pink-600 font-semibold hover:underline">
          Volver a la página principal
        </Link>
      </div>
    </div>
  );
}
