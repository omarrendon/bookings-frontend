"use client";
import { useState } from "react";
import type { Reservation, ReservationStatus } from "@/lib/api/types";
import { useUpdateReservationStatus } from "@/hooks/useReservations";
import { STATUS_CONFIG } from "./ColumnsReservationTable";
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
  Clock,
  ExternalLink,
  FileText,
  Mail,
  Phone,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

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

interface ReservationDetailModalProps {
  reservation: Reservation | null;
  businessId: string;
  onClose: () => void;
}

export default function ReservationDetailModal({
  reservation,
  businessId,
  onClose,
}: ReservationDetailModalProps) {
  const [pendingStatus, setPendingStatus] = useState<ReservationStatus | null>(null);
  const [localStatus, setLocalStatus] = useState<ReservationStatus | null>(null);

  const { mutate: updateStatus, isPending: isUpdating } =
    useUpdateReservationStatus(businessId);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setPendingStatus(null);
      setLocalStatus(null);
      onClose();
    }
  };

  const confirmStatusChange = () => {
    if (!reservation || !pendingStatus) return;
    updateStatus(
      { reservationId: String(reservation.id), status: pendingStatus },
      {
        onSuccess: () => {
          setLocalStatus(pendingStatus);
          setPendingStatus(null);
        },
      },
    );
  };

  const currentStatus = localStatus ?? reservation?.status;

  if (!reservation) return null;

  const { date, time: startTime } = formatTime(reservation.start_time);
  const { time: endTime } = formatTime(reservation.end_time);

  return (
    <Dialog open={!!reservation} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-sm rounded-2xl overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <DialogHeader className="pb-1">
          <div className="flex items-center gap-3">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-base font-semibold select-none">
              {getInitials(reservation.customer_name)}
            </div>
            <div className="min-w-0">
              <DialogTitle className="text-base font-semibold leading-tight">
                {reservation.customer_name}
              </DialogTitle>
              <p className="text-xs text-muted-foreground font-mono mt-0.5">
                #{reservation.id}
              </p>
            </div>
          </div>
        </DialogHeader>

        <Separator />

        <div className="space-y-4">
          {/* Contacto */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Contacto
            </p>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="size-3.5 shrink-0 text-muted-foreground" />
                <span className="truncate">{reservation.customer_email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="size-3.5 shrink-0 text-muted-foreground" />
                <span>{reservation.customer_phone}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Fecha y hora */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Fecha y hora
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
              <div className="flex items-center gap-1.5 text-sm">
                <CalendarDays className="size-3.5 shrink-0 text-muted-foreground" />
                <span>{date}</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm">
                <Clock className="size-3.5 shrink-0 text-muted-foreground" />
                <span>{startTime} – {endTime}</span>
              </div>
            </div>
          </div>

          {/* Notas */}
          {reservation.notes && (
            <>
              <Separator />
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Notas
                </p>
                <div className="flex items-start gap-2 text-sm">
                  <FileText className="size-3.5 shrink-0 text-muted-foreground mt-0.5" />
                  <span className="text-muted-foreground">{reservation.notes}</span>
                </div>
              </div>
            </>
          )}

          <Separator />

          {/* Servicios */}
          {reservation.products.length > 0 && (
            <>
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Servicios
                </p>
                <div className="space-y-1.5">
                  {reservation.products.map(product => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="truncate max-w-[160px]">{product.name}</span>
                      <span className="text-muted-foreground shrink-0 ml-2">
                        x{product.ReservationProduct.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Comprobantes */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Comprobantes
            </p>
            {reservation.proof_of_payments.length === 0 ? (
              <Badge
                variant="secondary"
                className="bg-muted text-muted-foreground border-0 gap-1"
              >
                <XCircle className="size-3" />
                Sin comprobante
              </Badge>
            ) : (
              <div className="space-y-2">
                {reservation.proof_of_payments.map(proof => (
                  <div key={proof.id} className="flex items-center gap-2 flex-wrap">
                    {proof.status === "approved" && (
                      <Badge
                        variant="secondary"
                        className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-0 gap-1"
                      >
                        <Check className="size-3" />
                        Aprobado
                      </Badge>
                    )}
                    {proof.status === "rejected" && (
                      <Badge
                        variant="secondary"
                        className="bg-destructive/10 text-destructive border-0 gap-1"
                      >
                        <XCircle className="size-3" />
                        Rechazado
                      </Badge>
                    )}
                    {proof.status === "pending" && (
                      <Badge
                        variant="secondary"
                        className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-0 gap-1"
                      >
                        <Clock className="size-3" />
                        En revisión
                      </Badge>
                    )}
                    <a
                      href={proof.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                    >
                      <ExternalLink className="size-3" />
                      Ver comprobante
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Separator />

          {/* Estado */}
          <div className="space-y-3">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Estado de la reserva
            </p>

            <div className="flex items-center gap-2 flex-wrap">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
                    aria-label={`Estado: ${STATUS_CONFIG[currentStatus!].label}. Cambiar estado`}
                  >
                    <Badge
                      variant="outline"
                      className={cn(
                        "gap-1.5 font-medium text-sm cursor-pointer hover:opacity-80 transition-opacity pr-2 py-1",
                        STATUS_CONFIG[currentStatus!].className,
                      )}
                    >
                      {STATUS_CONFIG[currentStatus!].label}
                      <ChevronDown className="size-3.5 opacity-60" />
                    </Badge>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="min-w-44">
                  <DropdownMenuLabel className="text-xs text-muted-foreground">
                    Cambiar estado
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {(Object.keys(STATUS_CONFIG) as ReservationStatus[])
                    .filter(s => s !== currentStatus)
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
                            STATUS_CONFIG[key].className,
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
                      STATUS_CONFIG[pendingStatus].className,
                    )}
                  >
                    {STATUS_CONFIG[pendingStatus].label}
                  </Badge>
                </>
              )}
            </div>

            {pendingStatus && (
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  className="gap-1.5 font-medium"
                  onClick={confirmStatusChange}
                  disabled={isUpdating}
                >
                  <Check className="size-3.5" />
                  {isUpdating ? "Actualizando..." : "Confirmar cambio"}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() => setPendingStatus(null)}
                  disabled={isUpdating}
                >
                  Descartar
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
