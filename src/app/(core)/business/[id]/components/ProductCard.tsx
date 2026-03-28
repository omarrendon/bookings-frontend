"use client";
// Components
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
// Icons
import { Check, ChevronRight, Clock, Minus, Plus } from "lucide-react";
// Utils
import { cn } from "@/lib/utils";
import { formatPrice } from "@/utils/utils";

interface ProductCardProps {
  gallery_images?: string[];
  name: string;
  description?: string;
  price: number;
  estimated_delivery_time: number;
  businessId: string;
  // Selectable variant
  selectable?: boolean;
  selected?: boolean;
  onToggle?: () => void;
}

const FALLBACK_IMAGE =
  "https://hips.hearstapps.com/hmg-prod/images/le-maise-9-1672919228.jpg";

export default function ProductCard({
  gallery_images,
  name,
  description,
  price,
  estimated_delivery_time,
  businessId,
  selectable = false,
  selected = false,
  onToggle,
}: ProductCardProps) {
  return (
    <div
      onClick={selectable ? onToggle : undefined}
      className={cn(
        "group bg-card rounded-2xl border overflow-hidden transition-all duration-200",
        selectable ? "cursor-pointer" : "hover:shadow-md",
        selectable && selected
          ? "border-primary ring-2 ring-primary/20 shadow-md"
          : selectable
            ? "hover:shadow-md hover:border-muted-foreground/30"
            : "",
      )}
    >
      {/* Imagen */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={gallery_images?.[0] ?? FALLBACK_IMAGE}
          alt={name}
          fill
          className={cn(
            "object-cover transition-transform duration-500",
            selected ? "scale-105" : "group-hover:scale-105",
          )}
        />
        {selectable && selected && (
          <div className="absolute top-3 right-3 size-7 rounded-full bg-primary flex items-center justify-center shadow-md">
            <Check className="size-4 text-primary-foreground" />
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-5">
        <h3 className="font-semibold text-base mb-1 line-clamp-1">{name}</h3>
        {description && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {description}
          </p>
        )}
        <div className="flex items-center justify-between mt-auto pt-3 border-t">
          <div className="flex flex-col gap-0.5">
            <span className="text-lg font-bold text-primary">
              {formatPrice(price)}
            </span>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="size-3" />
              {estimated_delivery_time} hrs
            </div>
          </div>

          {selectable ? (
            <Button
              size="sm"
              variant={selected ? "default" : "outline"}
              className="rounded-full text-xs gap-1 pointer-events-none"
              tabIndex={-1}
            >
              {selected ? (
                <>
                  <Minus className="size-3" />
                  Quitar
                </>
              ) : (
                <>
                  <Plus className="size-3" />
                  Agregar
                </>
              )}
            </Button>
          ) : (
            <Button
              size="sm"
              variant="outline"
              className="rounded-full text-xs gap-1"
              asChild
            >
              <Link href={`/business/${businessId}/products`}>
                Reservar
                <ChevronRight className="size-3" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
