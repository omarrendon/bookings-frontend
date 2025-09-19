// Components
import Image from "next/image";

export default function CardSummaryServices() {
  return (
    <div className="w-full flex flex-col my-6 gap-4">
      <h2 className="text-lg md:text-xl text-center text-pink-400 font-medium">
        Servicios Seleccionados
      </h2>
      <div className="p-4 rounded-lg  grid gap-4 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1">
        <div className="w-full flex row gap-3 p-4 border rounded-lg">
          <Image
            src="https://hips.hearstapps.com/hmg-prod/images/le-maise-9-1672919228.jpg"
            alt="Corte de Cabello"
            width={120}
            height={80}
            className="rounded-md object-cover"
          />
          <div className="flex flex-col">
            <span className="font-semibold">Corte de Cabello</span>
            <span className="text-sm text-gray-600">Duración: 30 mins</span>
            <span className="font-bold">$20</span>
          </div>
        </div>
        <div className="w-full flex row gap-3 p-4 border rounded-lg">
          <Image
            src="https://hips.hearstapps.com/hmg-prod/images/le-maise-9-1672919228.jpg"
            alt="Corte de Cabello"
            width={120}
            height={80}
            className="rounded-md object-cover"
          />
          <div className="flex flex-col">
            <span className="font-semibold">Corte de Cabello</span>
            <span className="text-sm text-gray-600">Duración: 30 mins</span>
            <span className="font-bold">$20</span>
          </div>
        </div>
        <div className="w-full flex row gap-3 p-4 border rounded-lg">
          <Image
            src="https://hips.hearstapps.com/hmg-prod/images/le-maise-9-1672919228.jpg"
            alt="Corte de Cabello"
            width={120}
            height={80}
            className="rounded-md object-cover"
          />
          <div className="flex flex-col">
            <span className="font-semibold">Corte de Cabello</span>
            <span className="text-sm text-gray-600">Duración: 30 mins</span>
            <span className="font-bold">$20</span>
          </div>
        </div>
        <div className="w-full flex row gap-3 p-4 border rounded-lg">
          <Image
            src="https://hips.hearstapps.com/hmg-prod/images/le-maise-9-1672919228.jpg"
            alt="Corte de Cabello"
            width={120}
            height={80}
            className="rounded-md object-cover"
          />
          <div className="flex flex-col">
            <span className="font-semibold">Corte de Cabello</span>
            <span className="text-sm text-gray-600">Duración: 30 mins</span>
            <span className="font-bold">$20</span>
          </div>
        </div>
      </div>
    </div>
  );
}
