"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Minus,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice, formatDuration } from "@/utils/utils";
import type { ProductImage } from "@/lib/api/types";

const FALLBACK_IMAGE =
  "https://hips.hearstapps.com/hmg-prod/images/le-maise-9-1672919228.jpg";

interface ProductCardProps {
  images?: ProductImage[];
  name: string;
  description?: string;
  price: string | number;
  estimated_delivery_time: string | number;
  businessId: string;
  selectable?: boolean;
  selected?: boolean;
  onToggle?: () => void;
}

export default function ProductCard({
  images,
  name,
  description,
  price,
  estimated_delivery_time,
  businessId,
  selectable = false,
  selected = false,
  onToggle,
}: ProductCardProps) {
  const sorted = [...(images ?? [])].sort((a, b) => a.order - b.order);
  const hasMultiple = sorted.length > 1;
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentUrl = sorted[currentIndex]?.url ?? FALLBACK_IMAGE;

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex(i => (i - 1 + sorted.length) % sorted.length);
  };

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex(i => (i + 1) % sorted.length);
  };

  return (
    <div
      onClick={selectable ? onToggle : undefined}
      className={cn(
        "group bg-card rounded-2xl border overflow-hidden transition-all duration-200 flex flex-col",
        selectable ? "cursor-pointer" : "",
        selectable && selected
          ? "border-primary ring-2 ring-primary/20 shadow-md"
          : "border-border/60 hover:shadow-md hover:border-border",
      )}
    >
      {/* Imagen / galería */}
      <div className="relative aspect-square overflow-hidden shrink-0">
        <Image
          src={currentUrl}
          alt={`${name} — imagen ${currentIndex + 1}`}
          fill
          className={cn(
            "object-cover transition-transform duration-500",
            selected ? "scale-105" : "group-hover:scale-105",
          )}
        />

        {/* Gradiente inferior */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

        {/* Precio flotante */}
        <div className="absolute bottom-3 left-3 pointer-events-none">
          <span className="inline-flex items-center bg-white/95 backdrop-blur-sm text-foreground text-sm font-bold px-2.5 py-1 rounded-full shadow-sm">
            {formatPrice(price)}
          </span>
        </div>

        {/* Duración flotante */}
        <div
          className="absolute bottom-3 pointer-events-none"
          style={{ right: hasMultiple ? "2.5rem" : "0.75rem" }}
        >
          <span className="inline-flex items-center gap-1 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
            <Clock className="size-3" />
            {formatDuration(estimated_delivery_time)}
          </span>
        </div>

        {/* Check de selección */}
        {selectable && selected && (
          <div className="absolute top-3 right-3 size-7 rounded-full bg-primary flex items-center justify-center shadow-md">
            <Check className="size-4 text-primary-foreground" />
          </div>
        )}

        {/* Sin imagen badge */}
        {sorted.length === 0 && (
          <Badge
            variant="secondary"
            className="absolute top-3 left-3 text-xs border-0 bg-muted/80 backdrop-blur-sm"
          >
            Sin imagen
          </Badge>
        )}

        {/* Controles de galería */}
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
            <div className="absolute bottom-2 right-2 flex gap-1">
              {sorted.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={e => {
                    e.stopPropagation();
                    setCurrentIndex(i);
                  }}
                  className={cn(
                    "size-1.5 rounded-full transition-colors",
                    i === currentIndex
                      ? "bg-white"
                      : "bg-white/50 hover:bg-white/80",
                  )}
                  aria-label={`Ir a imagen ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Contenido */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-base line-clamp-1 mb-1">{name}</h3>
        {description && (
          <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
            {description}
          </p>
        )}

        <div className="mt-3 pt-3 border-t border-border/60">
          {selectable ? (
            <Button
              size="sm"
              variant={selected ? "default" : "outline"}
              className="w-full rounded-full text-xs gap-1.5 pointer-events-none"
              tabIndex={-1}
            >
              {selected ? (
                <>
                  <Minus className="size-3" />
                  Quitar del resumen
                </>
              ) : (
                <>
                  <Plus className="size-3" />
                  Agregar a mi selección
                </>
              )}
            </Button>
          ) : (
            <Button
              size="sm"
              variant="outline"
              className="w-full rounded-full text-xs gap-1.5 border-border/60 hover:border-primary/40"
              asChild
            >
              <Link href={`/business/${businessId}/products`}>
                Reservar este servicio
                <ChevronRight className="size-3" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
