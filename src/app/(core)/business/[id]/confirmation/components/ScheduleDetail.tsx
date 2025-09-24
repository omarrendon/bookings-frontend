// Components
import Image from "next/image";
// Icons
import { Calendar, Clock3 } from "lucide-react";

export default function ScheduleDetail() {
  return (
    <div className="w-full flex flex-col px-4 bg-white  rounded-lg border p-4 gap-2">
      <h2 className="text-black text-xl font-semibold">Detalles de la Cita</h2>
      <div className="w-full flex flex-row gap-4 mt-2">
        <Image
          src="https://hips.hearstapps.com/hmg-prod/images/le-maise-9-1672919228.jpg"
          alt="Corte de Cabello"
          width={120}
          height={80}
          className="rounded-md object-cover"
        />
        <div className="flex flex-col">
          <span className="font-semibold">Nombre del negocio</span>
          <span className="text-sm text-gray-600">
            Paynani 112 Col. Postal Oaxaca de Juarez, Oaxaca.
          </span>
        </div>
      </div>
      <div className="border-t m-2" />
      <div className="w-full flex flex-row justify-between gap-6  bg-pink-50 p-4 rounded-lg">
        <div className="flex flex-col flex-1 items-center justify-center gap-2 ">
          <div className="w-full flex flex-row gap-2 justify-start ">
            <Calendar className="text-pink-600" />
            <span className="font-semibold text-gray-600">Fecha</span>
          </div>
          <div className="w-full flex flex-row gap-2 justify-start ">
            <span>20 de diciembre, 2025</span>
          </div>
        </div>
        <div className="flex flex-col md:flex-1 items-center justify-center gap-2">
          <div className="w-full flex flex-row gap-2 justify-start ">
            <Clock3 className="text-pink-600" />
            <span className="font-semibold text-gray-600">Hora</span>
          </div>
          <div className="w-full flex flex-row gap-2 justify-start">
            <span>10:00 AM</span>
          </div>
        </div>
      </div>
    </div>
  );
}
