// Components
import Image from "next/image";

export default function CardSummaryServices() {
  return (
    <div className="w-full flex flex-col gap-4">
      <h2 className="text-lg md:text-xl text-center text-pink-400 font-medium">
        Servicios Seleccionados
      </h2>
      <div className="p-4 rounded-lg grid gap-4 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1">
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
      <div className="w-full flex row gap-3  justify-between px-4 bg-pink-50 p-4  rounded-lg">
        <div className="flex flex-col items-start">
          <span className="font-bold text-md text-gray-600">Total a pagar</span>
          <span className="font-bold text-2xl">$60</span>
        </div>
        <div className="flex flex-col items-start">
          <span className="font-bold text-md.  text-gray-600">
            Tiempo total
          </span>
          <span className="font-bold text-lg">1 hr 30 mins</span>
        </div>
      </div>
    </div>
  );
}
