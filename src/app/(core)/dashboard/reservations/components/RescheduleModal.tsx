"use client";
import { useState } from "react";
import type { Reservation, TimeSlot } from "@/lib/api/types";
import { useMonthSlots } from "@/hooks/useSchedules";
import { useRescheduleReservation } from "@/hooks/useReservations";
import Calendar from "@/components/ui/Calendar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  CalendarClock,
  CalendarDays,
  Clock,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

function toDateStr(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function formatDisplayDate(isoString: string) {
  return new Date(isoString).toLocaleDateString("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatDisplayTime(isoString: string) {
  return new Date(isoString).toLocaleTimeString("es-MX", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

interface RescheduleModalProps {
  reservation: Reservation | null;
  businessId: string;
  onClose: () => void;
}

export default function RescheduleModal({
  reservation,
  businessId,
  onClose,
}: RescheduleModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [displayMonth, setDisplayMonth] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [reason, setReason] = useState("");

  const { mutateAsync: reschedule, isPending } = useRescheduleReservation();

  const { data: scheduleData, isLoading: isLoadingSlots } = useMonthSlots(
    businessId,
    displayMonth,
  );

  const allSlots = scheduleData?.data?.slots ?? [];

  const daysWithAvailability = allSlots
    .filter(d => d.slots.length > 0)
    .map(d => new Date(d.date + "T12:00:00"));

  const slotsForDay = selectedDate
    ? (allSlots.find(d => d.date === toDateStr(selectedDate))?.slots ?? [])
    : [];

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setSelectedDate(undefined);
      setSelectedSlot(null);
      setReason("");
      onClose();
    }
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedSlot) {
      toast.warning("Selecciona la nueva fecha y un horario disponible.");
      return;
    }

    try {
      await reschedule({
        reservationId: reservation!.id,
        data: {
          new_date: toDateStr(selectedDate),
          new_time: selectedSlot.start,
        },
      });
      toast.success("Cita reprogramada correctamente.");
      handleOpenChange(false);
    } catch {
      // Los errores son manejados por el hook (onError)
    }
  };

  if (!reservation) return null;

  const canSubmit = !!selectedDate && !!selectedSlot && !isPending;

  return (
    <Dialog open={!!reservation} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-2xl rounded-2xl overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10">
              <CalendarClock className="size-5 text-violet-600 dark:text-violet-400" />
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold tracking-tight">
                Reprogramar cita
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground mt-0.5">
                Selecciona la nueva fecha y horario disponible
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Separator />

        {/* Cita actual */}
        <div className="rounded-xl bg-muted/40 border border-border/60 px-4 py-3 space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Cita actual
          </p>
          <div className="flex items-center gap-2 text-sm">
            <User className="size-3.5 shrink-0 text-muted-foreground" />
            <span className="font-medium">{reservation.customer_name}</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <CalendarDays className="size-3.5 shrink-0" />
              <span className="capitalize">
                {formatDisplayDate(reservation.start_time)}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Clock className="size-3.5 shrink-0" />
              <span>
                {formatDisplayTime(reservation.start_time)} –{" "}
                {formatDisplayTime(reservation.end_time)}
              </span>
            </div>
          </div>
        </div>

        {/* Selector de fecha y hora */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Calendario — ancho completo */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
              <CalendarDays className="size-3" />
              Nueva fecha
            </p>
            <div className="rounded-xl border border-border/60 bg-card overflow-hidden">
              <Calendar
                selected={selectedDate}
                onSelect={handleDateSelect}
                displayMonth={displayMonth}
                onMonthChange={setDisplayMonth}
                daysWithAvailability={daysWithAvailability}
                daysWithoutAvailability={[]}
                isLoading={isLoadingSlots}
              />
            </div>
            <div className="flex items-center gap-1.5 px-1 text-xs text-muted-foreground">
              <span className="size-2 rounded-full bg-green-500 inline-block shrink-0" />
              Con disponibilidad
            </div>
          </div>

          <Separator />

          {/* Slots de horario */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
              <Clock className="size-3" />
              Horarios disponibles
              {selectedDate && (
                <span className="ml-auto normal-case font-normal text-muted-foreground/70 capitalize">
                  {selectedDate.toLocaleDateString("es-MX", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })}
                </span>
              )}
            </p>

            {!selectedDate ? (
              <div className="rounded-xl border border-dashed border-border/60 bg-muted/20 flex items-center justify-center gap-3 py-6 text-center">
                <CalendarDays className="size-5 text-muted-foreground/40 shrink-0" />
                <p className="text-sm text-muted-foreground">
                  Selecciona una fecha para ver los horarios disponibles
                </p>
              </div>
            ) : isLoadingSlots ? (
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="h-9 rounded-lg bg-muted animate-pulse" />
                ))}
              </div>
            ) : slotsForDay.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border/60 bg-muted/20 flex items-center justify-center gap-3 py-6 text-center">
                <Clock className="size-5 text-muted-foreground/40 shrink-0" />
                <p className="text-sm text-muted-foreground">
                  No hay horarios disponibles para este día
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {slotsForDay.map((slot, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={cn(
                      "rounded-lg border text-sm py-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      selectedSlot?.start === slot.start
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border/60 bg-background hover:border-primary/50 hover:bg-primary/5 text-foreground",
                    )}
                  >
                    {slot.start}
                  </button>
                ))}
              </div>
            )}

            {selectedSlot && (
              <p className="text-xs text-muted-foreground flex items-center gap-1.5 pt-1">
                <Clock className="size-3 text-primary shrink-0" />
                Turno seleccionado:{" "}
                <span className="font-medium text-foreground">
                  {selectedSlot.start}{selectedSlot.end ? ` – ${selectedSlot.end}` : ""}
                </span>
              </p>
            )}
          </div>

          <Separator />

          {/* Motivo */}
          <div className="space-y-1.5">
            <Label
              htmlFor="reschedule-reason"
              className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
            >
              Motivo
              <span className="ml-1 normal-case font-normal text-muted-foreground/70">
                (opcional)
              </span>
            </Label>
            <Textarea
              id="reschedule-reason"
              placeholder="Ej. El cliente solicitó cambio de horario..."
              value={reason}
              onChange={e => setReason(e.target.value)}
              maxLength={500}
              className="bg-background border-border/80 focus-visible:ring-ring resize-none min-h-[80px]"
            />
            <p className="text-xs text-muted-foreground/60 text-right">
              {reason.length}/500
            </p>
          </div>

          {/* Acciones */}
          <Separator />
          <div className="flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isPending}
              className="border-border/60"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={!canSubmit}
              className="gap-2 bg-violet-600 hover:bg-violet-700 text-white dark:bg-violet-600 dark:hover:bg-violet-700"
            >
              <CalendarClock className="size-4" />
              {isPending ? "Reprogramando..." : "Confirmar reprogramación"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
