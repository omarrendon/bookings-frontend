"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { ProductImage } from "@/lib/api/types";
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
    <Card className="border-border/60 bg-card shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col">
      {/* Imagen / galería */}
      <div className="relative w-full aspect-video bg-muted overflow-hidden group">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={currentUrl}
          alt={`${title} — imagen ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-opacity duration-200"
        />

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
      <CardContent className="flex flex-col flex-1 p-5 gap-3">
        <div className="space-y-1">
          <h3 className="text-base font-semibold leading-tight">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <Badge
            variant="secondary"
            className="bg-primary/10 text-primary border-0 font-semibold px-2.5"
          >
            {price}
          </Badge>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="size-3.5" />
            <span>{time}</span>
          </div>
        </div>

        {isEditable ? (
          <Button
            size="sm"
            variant="outline"
            className="w-full gap-2 mt-auto"
            onClick={onEdit}
            aria-label={`Editar ${title}`}
          >
            <Pencil className="size-3.5" />
            Editar
          </Button>
        ) : (
          <Button size="sm" className="w-full mt-auto" onClick={onReserve}>
            Reservar
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
