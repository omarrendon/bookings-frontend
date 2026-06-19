"use client";
import { useState } from "react";
import { Reservation } from "@/types/Reservation";
import { reservationData } from "./data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Clock,
  Mail,
  Phone,
  XCircle,
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

const STATUS_CONFIG: Record<
  Reservation["status"],
  { label: string; className: string }
> = {
  pending: {
    label: "Pendiente",
    className:
      "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200/50",
  },
  confirmed: {
    label: "Confirmada",
    className: "bg-primary/10 text-primary border-primary/20",
  },
  canceled: {
    label: "Cancelada",
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
  completed: {
    label: "Completada",
    className:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200/50",
  },
  rescheduled: {
    label: "Reprogramada",
    className:
      "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-200/50",
  },
};

export default function ReservationMobileList() {
  const [data, setData] = useState<Reservation[]>(reservationData);
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<Reservation | null>(null);
  const [pendingStatus, setPendingStatus] = useState<Reservation["status"] | null>(null);

  const pageCount = Math.ceil(data.length / ITEMS_PER_PAGE);
  const pageItems = data.slice(
    page * ITEMS_PER_PAGE,
    (page + 1) * ITEMS_PER_PAGE
  );

  const closeModal = () => {
    setSelected(null);
    setPendingStatus(null);
  };

  const confirmStatusChange = () => {
    if (!selected || !pendingStatus) return;
    setData(prev =>
      prev.map(r => (r.id === selected.id ? { ...r, status: pendingStatus } : r))
    );
    setSelected(prev =>
      prev ? { ...prev, status: pendingStatus } : null
    );
    setPendingStatus(null);
  };

  return (
    <div className="space-y-3 md:hidden">
      {/* Card list */}
      <div className="space-y-2">
        {pageItems.map(reservation => {
          const config = STATUS_CONFIG[reservation.status];
          return (
            <button
              key={reservation.id}
              type="button"
              onClick={() => setSelected(reservation)}
              className="w-full text-left bg-card border border-border/60 rounded-xl px-4 py-3.5 flex items-center gap-3 hover:bg-muted/30 active:bg-muted/50 transition-colors shadow-sm cursor-pointer"
              aria-label={`Ver detalles de ${reservation.customerName}`}
            >
              {/* Avatar */}
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold select-none">
                {getInitials(reservation.customerName)}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium truncate">
                    {reservation.customerName}
                  </p>
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs shrink-0 font-medium whitespace-nowrap",
                      config.className
                    )}
                  >
                    {config.label}
                  </Badge>
                </div>
                <div className="flex items-center gap-1 mt-0.5 text-xs text-muted-foreground">
                  <CalendarDays className="size-3 shrink-0" />
                  <span>{reservation.reservationDate}</span>
                  <span className="mx-0.5">·</span>
                  <Clock className="size-3 shrink-0" />
                  <span>
                    {reservation.startTime} – {reservation.endTime}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-1 pt-1">
        <p className="text-xs text-muted-foreground">
          <span className="font-medium text-foreground">{data.length}</span>{" "}
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

      {/* Detail modal */}
      <Dialog
        open={!!selected}
        onOpenChange={open => !open && closeModal()}
      >
        <DialogContent className="max-w-sm rounded-2xl">
          {selected && (
            <>
              <DialogHeader className="pb-1">
                <div className="flex items-center gap-3">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-base font-semibold select-none">
                    {getInitials(selected.customerName)}
                  </div>
                  <div className="min-w-0">
                    <DialogTitle className="text-base font-semibold leading-tight">
                      {selected.customerName}
                    </DialogTitle>
                    <p className="text-xs text-muted-foreground font-mono mt-0.5">
                      {selected.id}
                    </p>
                  </div>
                </div>
              </DialogHeader>

              <Separator />

              <div className="space-y-4">
                {/* Contact */}
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Contacto
                  </p>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="size-3.5 shrink-0 text-muted-foreground" />
                      <span className="truncate">{selected.customerEmail}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="size-3.5 shrink-0 text-muted-foreground" />
                      <span>{selected.customerPhone}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Date / time */}
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Fecha y hora
                  </p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                    <div className="flex items-center gap-1.5 text-sm">
                      <CalendarDays className="size-3.5 shrink-0 text-muted-foreground" />
                      <span>{selected.reservationDate}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm">
                      <Clock className="size-3.5 shrink-0 text-muted-foreground" />
                      <span>
                        {selected.startTime} – {selected.endTime}
                      </span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Payment */}
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Pago
                  </p>
                  {selected.proofOfPayment ? (
                    <Badge
                      variant="secondary"
                      className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-0 gap-1"
                    >
                      <Check className="size-3" />
                      Pagado
                    </Badge>
                  ) : (
                    <Badge
                      variant="secondary"
                      className="bg-muted text-muted-foreground border-0 gap-1"
                    >
                      <XCircle className="size-3" />
                      Pendiente de pago
                    </Badge>
                  )}
                </div>

                <Separator />

                {/* Status */}
                <div className="space-y-3">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Estado de la reserva
                  </p>

                  {/* Current → pending preview */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
                          aria-label={`Estado: ${STATUS_CONFIG[selected.status].label}. Cambiar estado`}
                        >
                          <Badge
                            variant="outline"
                            className={cn(
                              "gap-1.5 font-medium text-sm cursor-pointer hover:opacity-80 transition-opacity pr-2 py-1",
                              STATUS_CONFIG[selected.status].className
                            )}
                          >
                            {STATUS_CONFIG[selected.status].label}
                            <ChevronDown className="size-3.5 opacity-60" />
                          </Badge>
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="min-w-44">
                        <DropdownMenuLabel className="text-xs text-muted-foreground">
                          Cambiar estado
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {(Object.keys(STATUS_CONFIG) as Reservation["status"][])
                          .filter(s => s !== selected.status)
                          .map(key => (
                            <DropdownMenuItem
                              key={key}
                              className="gap-2 cursor-pointer"
                              onClick={() => setPendingStatus(key)}
                            >
                              <Badge
                                variant="outline"
                                className={cn(
                                  "text-xs font-medium w-full justify-center",
                                  STATUS_CONFIG[key].className
                                )}
                              >
                                {STATUS_CONFIG[key].label}
                              </Badge>
                            </DropdownMenuItem>
                          ))}
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {pendingStatus && (
                      <>
                        <ChevronDown className="size-3.5 text-muted-foreground -rotate-90 shrink-0" />
                        <Badge
                          variant="outline"
                          className={cn(
                            "font-medium text-sm",
                            STATUS_CONFIG[pendingStatus].className
                          )}
                        >
                          {STATUS_CONFIG[pendingStatus].label}
                        </Badge>
                      </>
                    )}
                  </div>

                  {/* Confirm / discard — only when there's a pending change */}
                  {pendingStatus && (
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        className="gap-1.5 font-medium"
                        onClick={confirmStatusChange}
                      >
                        <Check className="size-3.5" />
                        Confirmar cambio
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-muted-foreground hover:text-foreground"
                        onClick={() => setPendingStatus(null)}
                      >
                        Descartar
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
