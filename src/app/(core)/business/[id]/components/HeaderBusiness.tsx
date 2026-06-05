import Link from "next/link";
import { CalendarDays, ChevronDown } from "lucide-react";
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
    <div
      id="nosotros"
      className="relative w-full h-[90vh] min-h-[560px] overflow-hidden"
    >
      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: `url(${imageUrl ?? FALLBACK_IMAGE})` }}
      />

      {/* Capas de gradiente para profundidad */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/5" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

      {/* Contenido */}
      <div className="relative z-10 flex flex-col justify-end h-full w-full px-6 sm:px-10 lg:px-16 pb-16 max-w-6xl mx-auto">
        <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Badge de disponibilidad */}
          <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm text-white border border-white/20 px-3 py-1 rounded-full text-xs font-medium mb-5">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Reservas disponibles
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-3 drop-shadow-md">
            {businessName}
          </h1>

          {description && (
            <p className="text-white/75 text-base sm:text-lg leading-relaxed mb-8 line-clamp-2 max-w-xl">
              {description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 font-semibold shadow-lg gap-2"
            >
              <Link href={`/business/${id}/products`}>
                <CalendarDays className="size-4" />
                Reservar ahora
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full px-6 font-medium gap-2 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 hover:text-white"
            >
              <a href="#servicios">Ver servicios</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Indicador de scroll */}
      <a
        href="#servicios"
        aria-label="Ir a servicios"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 opacity-40 hover:opacity-70 transition-opacity"
      >
        <ChevronDown className="size-5 text-white animate-bounce" />
      </a>
    </div>
  );
}
