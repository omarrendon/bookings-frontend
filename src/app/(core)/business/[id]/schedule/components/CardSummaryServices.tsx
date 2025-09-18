// Components
import Image from "next/image";

export default function CardSummaryServices() {
  return (
    <div className="w-full  p-4 rounded-lg my-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1">
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
  );
}
