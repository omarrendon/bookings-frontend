"use client";
// Dependencies
import { useState } from "react";
// Types
import type { DaySlots } from "@/lib/api/types";
// Components
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
// Utils
import { generateTimeSlots, timeToMinutes } from "@/utils/dates/utils";
// Icons
import {
  CalendarCheck2,
  CheckCircle2,
  Clock,
  Loader2,
  Plus,
  Trash2,
  XCircle,
} from "lucide-react";

const TIME_SLOTS = generateTimeSlots();

type DayId =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

interface TimeSlot {
  id: number;
  start: string;
  end: string;
}

interface DaySchedule {
  enabled: boolean;
  expanded: boolean;
  slots: TimeSlot[];
}

type ScheduleState = Record<DayId, DaySchedule>;

const DAYS: { id: DayId; label: string; short: string }[] = [
  { id: "monday", label: "Lunes", short: "L" },
  { id: "tuesday", label: "Martes", short: "M" },
  { id: "wednesday", label: "Miércoles", short: "X" },
  { id: "thursday", label: "Jueves", short: "J" },
  { id: "friday", label: "Viernes", short: "V" },
  { id: "saturday", label: "Sábado", short: "S" },
  { id: "sunday", label: "Domingo", short: "D" },
];

const MONTH_NAMES = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

const DEFAULT_SCHEDULE: ScheduleState = {
  monday: {
    enabled: true,
    expanded: false,
    slots: [{ id: 1, start: "09:00", end: "17:00" }],
  },
  tuesday: {
    enabled: true,
    expanded: false,
    slots: [{ id: 1, start: "09:00", end: "17:00" }],
  },
  wednesday: {
    enabled: true,
    expanded: false,
    slots: [{ id: 1, start: "09:00", end: "17:00" }],
  },
  thursday: {
    enabled: true,
    expanded: false,
    slots: [{ id: 1, start: "09:00", end: "17:00" }],
  },
  friday: {
    enabled: true,
    expanded: false,
    slots: [{ id: 1, start: "09:00", end: "17:00" }],
  },
  saturday: { enabled: false, expanded: false, slots: [] },
  sunday: { enabled: false, expanded: false, slots: [] },
};

const toLocalDateString = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const selectClass =
  "flex-1 h-9 rounded-md border border-border/80 bg-background px-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring transition-colors";

interface ScheduleManagerProps {
  selectedDate: Date;
  slotsData: DaySlots[];
  isLoading: boolean;
}

export default function ScheduleManager({
  selectedDate,
  slotsData,
  isLoading,
}: ScheduleManagerProps) {
  const [schedule, setSchedule] = useState<ScheduleState>(DEFAULT_SCHEDULE);
  const [isSaving, setIsSaving] = useState(false);

  const selectedKey = toLocalDateString(selectedDate);
  const selectedDayData = slotsData.find(d => d.date === selectedKey);
  const apiSlots = selectedDayData?.slots ?? [];

  const toggleDay = (id: DayId) => {
    setSchedule(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        enabled: !prev[id].enabled,
        expanded: !prev[id].enabled ? true : prev[id].expanded,
        slots:
          !prev[id].enabled && prev[id].slots.length === 0
            ? [{ id: Date.now(), start: "09:00", end: "17:00" }]
            : prev[id].slots,
      },
    }));
  };

  const toggleExpanded = (id: DayId) => {
    setSchedule(prev => ({
      ...prev,
      [id]: { ...prev[id], expanded: !prev[id].expanded },
    }));
  };

  const updateSlot = (
    id: DayId,
    slotId: number,
    field: "start" | "end",
    value: string,
  ) => {
    setSchedule(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        slots: prev[id].slots.map(s =>
          s.id === slotId ? { ...s, [field]: value } : s,
        ),
      },
    }));
  };

  const addSlot = (id: DayId) => {
    const slots = schedule[id].slots;
    const last = slots[slots.length - 1];
    let start = "09:00";
    let end = "17:00";
    if (last) {
      const startMins = timeToMinutes(last.end) + 30;
      const endMins = startMins + 60;
      if (startMins < 24 * 60) {
        start = `${String(Math.floor(startMins / 60)).padStart(2, "0")}:${String(startMins % 60).padStart(2, "0")}`;
      }
      if (endMins < 24 * 60) {
        end = `${String(Math.floor(endMins / 60)).padStart(2, "0")}:${String(endMins % 60).padStart(2, "0")}`;
      }
    }
    setSchedule(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        slots: [...prev[id].slots, { id: Date.now(), start, end }],
      },
    }));
  };

  const deleteSlot = (id: DayId, slotId: number) => {
    setSchedule(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        slots: prev[id].slots.filter(s => s.id !== slotId),
      },
    }));
  };

  const getEndOptions = (start: string) =>
    TIME_SLOTS.filter(t => timeToMinutes(t) > timeToMinutes(start));

  const handleSave = async () => {
    setIsSaving(true);
    // Placeholder: integrar con API cuando esté disponible
    await new Promise(r => setTimeout(r, 800));
    setIsSaving(false);
  };

  const enabledCount = DAYS.filter(d => schedule[d.id].enabled).length;

  return (
    <div className="flex flex-col gap-5">
      {/* ── Franjas del día seleccionado ── */}
      <div className="bg-card rounded-2xl border border-border/60 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10">
              <Clock className="size-3.5 text-primary" />
            </div>
            <h3 className="text-base font-semibold tracking-tight">
              Franjas del día
            </h3>
          </div>
          <span className="text-sm font-medium text-muted-foreground capitalize">
            {selectedDate.getDate()} de {MONTH_NAMES[selectedDate.getMonth()]}
          </span>
        </div>

        <div className="px-6 py-5">
          {isLoading ? (
            <div className="flex flex-col gap-2">
              {[1, 2, 3].map(i => (
                <Skeleton key={i} className="h-11 w-full rounded-xl" />
              ))}
            </div>
          ) : apiSlots.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center space-y-3">
              <div className="rounded-full bg-muted p-4">
                <Clock className="size-6 text-muted-foreground" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Sin franjas horarias</p>
                <p className="text-sm text-muted-foreground max-w-xs">
                  No hay horarios configurados para este día.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {apiSlots.map((slot, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-colors ${
                    slot.isBooked
                      ? "bg-amber-500/5 border-amber-500/20"
                      : "bg-emerald-500/5 border-emerald-500/20"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {slot.isBooked ? (
                      <XCircle className="size-4 text-amber-500 shrink-0" />
                    ) : (
                      <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                    )}
                    <span className="text-sm font-medium tabular-nums">
                      {slot.start} – {slot.end}
                    </span>
                  </div>
                  <Badge
                    variant="secondary"
                    className={`border-0 text-xs ${
                      slot.isBooked
                        ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                        : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    }`}
                  >
                    {slot.isBooked ? "Reservado" : "Disponible"}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Editor de horario semanal ── */}
      <div className="bg-card rounded-2xl border border-border/60 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10">
              <CalendarCheck2 className="size-3.5 text-primary" />
            </div>
            <h3 className="text-base font-semibold tracking-tight">
              Horario de atención
            </h3>
          </div>
          <Badge
            variant="secondary"
            className="bg-primary/10 text-primary border-0 tabular-nums"
          >
            {enabledCount} / {DAYS.length} días
          </Badge>
        </div>

        {/* Day rows */}
        <div className="divide-y divide-border/60">
          {DAYS.map(({ id, label }) => {
            const day = schedule[id];

            return (
              <div key={id} className={day.enabled ? "" : "opacity-60"}>
                {/* Collapsed row */}
                <div className="flex items-center gap-3 px-6 py-4">
                  <Switch
                    checked={day.enabled}
                    onCheckedChange={() => toggleDay(id)}
                    aria-label={`${day.enabled ? "Desactivar" : "Activar"} ${label}`}
                  />

                  <div className="flex flex-col flex-1 min-w-0">
                    <span
                      className={`text-sm font-medium ${day.enabled ? "text-foreground" : "text-muted-foreground"}`}
                    >
                      {label}
                    </span>
                    {/* Time summary — visible on all screen sizes */}
                    {day.enabled && !day.expanded && day.slots.length > 0 && (
                      <span className="text-xs text-muted-foreground mt-0.5 tabular-nums">
                        {day.slots
                          .map(s => `${s.start} – ${s.end}`)
                          .join(" · ")}
                      </span>
                    )}
                    {!day.enabled && (
                      <span className="text-xs text-muted-foreground mt-0.5">
                        Cerrado
                      </span>
                    )}
                  </div>

                  {day.enabled && (
                    <button
                      type="button"
                      onClick={() => toggleExpanded(id)}
                      className="size-7 rounded-full flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors shrink-0"
                      aria-label={
                        day.expanded ? `Colapsar ${label}` : `Editar ${label}`
                      }
                    >
                      <Clock
                        className={`size-3.5 transition-transform ${day.expanded ? "text-primary" : ""}`}
                      />
                    </button>
                  )}
                </div>

                {/* Expanded slot editor */}
                {day.enabled && day.expanded && (
                  <div className="px-6 pb-5 pt-1 flex flex-col gap-3 bg-muted/20 border-t border-border/40">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide pt-2">
                      Franjas horarias
                    </span>

                    {day.slots.map((slot, idx) => (
                      <div key={slot.id} className="flex items-center gap-2">
                        <select
                          value={slot.start}
                          onChange={e =>
                            updateSlot(id, slot.id, "start", e.target.value)
                          }
                          className={selectClass}
                          aria-label={`Hora de inicio franja ${idx + 1} de ${label}`}
                        >
                          {TIME_SLOTS.map(t => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </select>

                        <span className="text-xs text-muted-foreground shrink-0 select-none">
                          a
                        </span>

                        <select
                          value={slot.end}
                          onChange={e =>
                            updateSlot(id, slot.id, "end", e.target.value)
                          }
                          className={selectClass}
                          aria-label={`Hora de fin franja ${idx + 1} de ${label}`}
                        >
                          {getEndOptions(slot.start).map(t => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </select>

                        {day.slots.length > 1 && (
                          <button
                            type="button"
                            onClick={() => deleteSlot(id, slot.id)}
                            className="size-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors shrink-0"
                            aria-label={`Eliminar franja ${idx + 1} de ${label}`}
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        )}
                      </div>
                    ))}

                    <Separator className="my-1" />

                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="w-full gap-2 text-muted-foreground hover:text-foreground border-dashed"
                      onClick={() => addSlot(id)}
                    >
                      <Plus className="size-3.5" />
                      Agregar franja horaria
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t bg-muted/30">
          <Button
            type="button"
            className="w-full gap-2 font-medium"
            disabled={isSaving}
            onClick={handleSave}
          >
            {isSaving && <Loader2 className="size-4 animate-spin" />}
            {isSaving ? "Guardando..." : "Guardar horario"}
          </Button>
        </div>
      </div>
    </div>
  );
}
