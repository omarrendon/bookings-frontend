import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderBusinessProps {
  id: string;
  businessName?: string;
  description?: string;
  imageUrl?: string;
}

const FALLBACK_IMAGE =
  "https://hips.hearstapps.com/hmg-prod/images/le-maise-9-1672919228.jpg";

export default function HeaderBusiness({
  id,
  businessName = "Sin nombre",
  description,
  imageUrl,
}: HeaderBusinessProps) {
  return (
    <div id="nosotros" className="relative w-full h-[88vh] min-h-[520px] overflow-hidden">
      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${imageUrl ?? FALLBACK_IMAGE})` }}
      />

      {/* Gradiente de abajo hacia arriba */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

      {/* Contenido alineado a la parte inferior izquierda */}
      <div className="relative z-10 flex flex-col justify-end h-full w-full px-6 sm:px-10 lg:px-16 pb-14 max-w-6xl mx-auto">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-3 drop-shadow-md">
            {businessName}
          </h1>
          {description && (
            <p className="text-white/75 text-base sm:text-lg leading-relaxed mb-8 line-clamp-2">
              {description}
            </p>
          )}
          <Button
            asChild
            size="lg"
            className="rounded-full px-8 font-semibold shadow-lg gap-2"
          >
            <Link href={`/business/${id}/schedule`}>
              <CalendarDays className="size-4" />
              Reservar ahora
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
