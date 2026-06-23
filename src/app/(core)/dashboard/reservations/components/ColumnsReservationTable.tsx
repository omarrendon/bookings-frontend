"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Reservation, ReservationStatus } from "@/lib/api/types";
import {
  CalendarCheck,
  CalendarClock,
  Check,
  ChevronDown,
  Clock,
  Copy,
  MoreHorizontal,
  XCircle,
} from "lucide-react";

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

export const STATUS_CONFIG: Record<
  ReservationStatus,
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
  cancelled: {
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

export function createReservationColumns(
  onStatusChange: (reservationId: string, status: ReservationStatus) => void,
  onViewDetails: (reservation: Reservation) => void,
  onReschedule: (reservation: Reservation) => void,
): ColumnDef<Reservation>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Seleccionar todo"
        />
      ),
      cell: ({ row }) => (
        <div onClick={e => e.stopPropagation()}>
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={value => row.toggleSelected(!!value)}
            aria-label="Seleccionar fila"
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "customer_name",
      header: () => (
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Cliente
        </span>
      ),
      cell: ({ row }) => {
        const { customer_name, customer_email } = row.original;
        return (
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold">
              {getInitials(customer_name)}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium leading-tight truncate max-w-[120px] md:max-w-[160px]">
                {customer_name}
              </p>
              <p className="text-xs text-muted-foreground truncate max-w-[120px] md:max-w-[160px]">
                {customer_email}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "start_time",
      header: () => (
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Fecha / Hora
        </span>
      ),
      cell: ({ row }) => {
        const { date, time: startTime } = formatTime(row.original.start_time);
        const { time: endTime } = formatTime(row.original.end_time);
        return (
          <div className="space-y-0.5">
            <p className="text-sm font-medium">{date}</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="size-3 shrink-0" />
              {startTime} – {endTime}
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "customer_phone",
      meta: { className: "hidden lg:table-cell" },
      header: () => (
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide hidden lg:inline">
          Teléfono
        </span>
      ),
      cell: ({ row }) => (
        <p className="text-sm text-muted-foreground hidden lg:block">
          {row.original.customer_phone}
        </p>
      ),
    },
    {
      id: "proof_of_payment",
      header: () => (
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Pago
        </span>
      ),
      cell: ({ row }) => {
        const proofs = row.original.proof_of_payments;
        if (!proofs || proofs.length === 0) {
          return (
            <Badge variant="secondary" className="bg-muted text-muted-foreground border-0 gap-1 text-xs whitespace-nowrap">
              <XCircle className="size-3" />
              <span className="hidden sm:inline">Sin comprobante</span>
            </Badge>
          );
        }
        const latest = proofs[proofs.length - 1];
        if (latest.status === "approved") {
          return (
            <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-0 gap-1 text-xs whitespace-nowrap">
              <Check className="size-3" />
              <span className="hidden sm:inline">Aprobado</span>
            </Badge>
          );
        }
        if (latest.status === "rejected") {
          return (
            <Badge variant="secondary" className="bg-destructive/10 text-destructive border-0 gap-1 text-xs whitespace-nowrap">
              <XCircle className="size-3" />
              <span className="hidden sm:inline">Rechazado</span>
            </Badge>
          );
        }
        return (
          <Badge variant="secondary" className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-0 gap-1 text-xs whitespace-nowrap">
            <Clock className="size-3" />
            <span className="hidden sm:inline">En revisión</span>
          </Badge>
        );
      },
    },
    {
      accessorKey: "status",
      header: () => (
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Estado
        </span>
      ),
      cell: ({ row }) => {
        const { status, id } = row.original;
        const config = STATUS_CONFIG[status];
        const changeOptions = (
          Object.keys(STATUS_CONFIG) as ReservationStatus[]
        ).filter(s => s !== status);

        const reservation = row.original;
        return (
          <div onClick={e => e.stopPropagation()}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
                aria-label={`Estado: ${config.label}. Cambiar estado`}
              >
                <Badge
                  variant="outline"
                  className={`${config.className} gap-1 font-medium text-xs cursor-pointer hover:opacity-80 transition-opacity pr-1.5 whitespace-nowrap`}
                >
                  {config.label}
                  <ChevronDown className="size-3 opacity-60" />
                </Badge>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-44">
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Cambiar estado
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {changeOptions.map(key => {
                const opt = STATUS_CONFIG[key];
                return (
                  <DropdownMenuItem
                    key={key}
                    className="gap-2 cursor-pointer"
                    onClick={() =>
                      key === "rescheduled"
                        ? onReschedule(reservation)
                        : onStatusChange(String(id), key)
                    }
                  >
                    <Badge
                      variant="outline"
                      className={`${opt.className} text-xs font-medium w-full justify-center`}
                    >
                      {opt.label}
                    </Badge>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
        );
      },
    },
    {
      id: "actions",
      header: () => <span className="sr-only">Acciones</span>,
      cell: ({ row }) => {
        const reservation = row.original;
        return (
          <div onClick={e => e.stopPropagation()}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-8 text-muted-foreground hover:text-foreground"
                aria-label="Más acciones"
              >
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-48">
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Acciones
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="gap-2 cursor-pointer"
                onClick={() => navigator.clipboard.writeText(String(reservation.id))}
              >
                <Copy className="size-4 text-muted-foreground" />
                Copiar ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="gap-2 cursor-pointer"
                onClick={() => onViewDetails(reservation)}
              >
                <CalendarCheck className="size-4 text-muted-foreground" />
                Ver detalles
              </DropdownMenuItem>
              <DropdownMenuItem
                className="gap-2 cursor-pointer"
                onClick={() => onReschedule(reservation)}
              >
                <CalendarClock className="size-4 text-muted-foreground" />
                Reprogramar
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="gap-2 cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
                onClick={() => onStatusChange(String(reservation.id), "cancelled")}
              >
                <XCircle className="size-4" />
                Cancelar reserva
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
        );
      },
    },
  ];
}
