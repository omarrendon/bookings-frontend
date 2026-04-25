"use client";
// Dependencies
import { useState } from "react";
// Components
import { Button } from "@/components/ui/button";
// Types
import type { ProductImage } from "@/lib/api/types";
// Icons
import { ChevronLeft, ChevronRight, Clock, Pencil, Trash2 } from "lucide-react";

const DEFAULT_IMAGE =
  "https://res.cloudinary.com/dv34psubp/image/upload/v1776917555/Bookeame/bookeame_p0vklp.png";

interface ServiceCardProps {
  title: string;
  description: string;
  price: string;
  time: string;
  images?: ProductImage[];
  isEditable?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onReserve?: () => void;
}

export default function ServiceCard({
  title,
  description,
  price,
  time,
  images,
  isEditable = false,
  onEdit,
  onDelete,
  onReserve,
}: ServiceCardProps) {
  const sorted = [...(images ?? [])].sort((a, b) => a.order - b.order);
  const hasMultiple = sorted.length > 1;

  const [currentIndex, setCurrentIndex] = useState(0);

  const currentUrl = sorted[currentIndex]?.url ?? DEFAULT_IMAGE;

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex(i => (i - 1 + sorted.length) % sorted.length);
  };

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex(i => (i + 1) % sorted.length);
  };

  return (
    <div className="bg-card rounded-2xl border overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-200">

      {/* Imagen / galería */}
      <div className="relative w-full aspect-video bg-muted overflow-hidden group">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={currentUrl}
          alt={`${title} — imagen ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-opacity duration-200"
        />

        {/* Flechas de navegación — sólo si hay más de una imagen */}
        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 size-7 rounded-full bg-background/80 hover:bg-background flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 size-7 rounded-full bg-background/80 hover:bg-background flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Imagen siguiente"
            >
              <ChevronRight className="size-4" />
            </button>

            {/* Dots indicadores */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {sorted.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={e => { e.stopPropagation(); setCurrentIndex(i); }}
                  className={`size-1.5 rounded-full transition-colors ${
                    i === currentIndex ? "bg-white" : "bg-white/50 hover:bg-white/80"
                  }`}
                  aria-label={`Ir a imagen ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Botón eliminar */}
        {isEditable && (
          <button
            type="button"
            onClick={onDelete}
            className="absolute top-2 right-2 size-7 rounded-full bg-background/80 hover:bg-destructive/10 hover:text-destructive flex items-center justify-center transition-colors shadow-sm"
            aria-label="Eliminar servicio"
          >
            <Trash2 className="size-3.5" />
          </button>
        )}
      </div>

      {/* Contenido */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-sm leading-tight">{title}</h3>
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{description}</p>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-primary font-bold text-sm">{price}</span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="size-3" />
            {time}
          </span>
        </div>

        {isEditable ? (
          <Button
            size="sm"
            variant="outline"
            className="w-full rounded-full gap-1.5"
            onClick={onEdit}
          >
            <Pencil className="size-3.5" />
            Editar
          </Button>
        ) : (
          <Button
            size="sm"
            className="w-full rounded-full"
            onClick={onReserve}
          >
            Reservar
          </Button>
        )}
      </div>
    </div>
  );
}
