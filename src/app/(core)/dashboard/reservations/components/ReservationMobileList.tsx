"use client";
import { useState } from "react";
import type { Reservation } from "@/lib/api/types";
import { STATUS_CONFIG } from "./ColumnsReservationTable";
import ReservationDetailModal from "./ReservationDetailModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ITEMS_PER_PAGE = 8;

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map(n => n[0])
    .join("")
    .toUpperCase();
}

function formatTime(isoString: string) {
  const date = new Date(isoString);
  return {
    date: date.toLocaleDateString("es-MX", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }),
    time: date.toLocaleTimeString("es-MX", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
}

interface ReservationMobileListProps {
  reservations: Reservation[];
  businessId: string;
  isLoading?: boolean;
}

export default function ReservationMobileList({
  reservations,
  businessId,
  isLoading = false,
}: ReservationMobileListProps) {
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<Reservation | null>(null);

  const pageCount = Math.ceil(reservations.length / ITEMS_PER_PAGE);
  const pageItems = reservations.slice(
    page * ITEMS_PER_PAGE,
    (page + 1) * ITEMS_PER_PAGE,
  );

  if (isLoading) {
    return (
      <div className="space-y-2 md:hidden">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="w-full bg-card border border-border/60 rounded-xl px-4 py-3.5 flex items-center gap-3 animate-pulse"
          >
            <div className="size-10 rounded-full bg-muted shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-3.5 bg-muted rounded w-1/2" />
              <div className="h-3 bg-muted rounded w-2/3" />
            </div>
            <div className="h-5 bg-muted rounded-full w-20 shrink-0" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3 md:hidden">
      {/* Card list */}
      <div className="space-y-2">
        {pageItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center space-y-3">
            <div className="rounded-full bg-muted p-4">
              <CalendarDays className="size-7 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">
              No hay reservas para mostrar
            </p>
          </div>
        ) : (
          pageItems.map(reservation => {
            const config = STATUS_CONFIG[reservation.status];
            const { date, time } = formatTime(reservation.start_time);
            return (
              <button
                key={reservation.id}
                type="button"
                onClick={() => setSelected(reservation)}
                className="w-full text-left bg-card border border-border/60 rounded-xl px-4 py-3.5 flex items-center gap-3 hover:bg-muted/30 active:bg-muted/50 transition-colors shadow-sm cursor-pointer"
                aria-label={`Ver detalles de ${reservation.customer_name}`}
              >
                {/* Avatar */}
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold select-none">
                  {getInitials(reservation.customer_name)}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium truncate">
                      {reservation.customer_name}
                    </p>
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-xs shrink-0 font-medium whitespace-nowrap",
                        config.className,
                      )}
                    >
                      {config.label}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 mt-0.5 text-xs text-muted-foreground">
                    <CalendarDays className="size-3 shrink-0" />
                    <span>{date}</span>
                    <span className="mx-0.5">·</span>
                    <Clock className="size-3 shrink-0" />
                    <span>{time}</span>
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>

      {/* Pagination */}
      {reservations.length > 0 && (
        <div className="flex items-center justify-between px-1 pt-1">
          <p className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">
              {reservations.length}
            </span>{" "}
            reserva(s)
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              Pág{" "}
              <span className="font-medium text-foreground">{page + 1}</span> de{" "}
              <span className="font-medium text-foreground">{pageCount}</span>
            </span>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                className="size-8 border-border/60"
                onClick={() => setPage(0)}
                disabled={page === 0}
                aria-label="Primera página"
              >
                <ChevronsLeft className="size-3.5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="size-8 border-border/60"
                onClick={() => setPage(p => Math.max(0, p - 1))}
                disabled={page === 0}
                aria-label="Página anterior"
              >
                <ChevronLeft className="size-3.5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="size-8 border-border/60"
                onClick={() => setPage(p => Math.min(pageCount - 1, p + 1))}
                disabled={page >= pageCount - 1}
                aria-label="Página siguiente"
              >
                <ChevronRight className="size-3.5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="size-8 border-border/60"
                onClick={() => setPage(pageCount - 1)}
                disabled={page >= pageCount - 1}
                aria-label="Última página"
              >
                <ChevronsRight className="size-3.5" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Detail modal — shared component */}
      <ReservationDetailModal
        reservation={selected}
        businessId={businessId}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}
