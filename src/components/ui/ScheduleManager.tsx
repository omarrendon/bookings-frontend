"use client";
// Dependencies
import { useState } from "react";
// Types
import type { DaySlots } from "@/lib/api/types";
// Components
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
// Utils
import { generateTimeSlots, timeToMinutes } from "@/utils/dates/utils";
// Icons
import { Clock, ChevronDown, ChevronUp, Plus, Trash2, CheckCircle2, XCircle } from "lucide-react";

const TIME_SLOTS = generateTimeSlots();

type DayId = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";

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

const DAYS: { id: DayId; label: string }[] = [
  { id: "monday",    label: "Lunes" },
  { id: "tuesday",   label: "Martes" },
  { id: "wednesday", label: "Miércoles" },
  { id: "thursday",  label: "Jueves" },
  { id: "friday",    label: "Viernes" },
  { id: "saturday",  label: "Sábado" },
  { id: "sunday",    label: "Domingo" },
];

const DEFAULT_SCHEDULE: ScheduleState = {
  monday:    { enabled: true,  expanded: false, slots: [{ id: 1, start: "09:00", end: "17:00" }] },
  tuesday:   { enabled: true,  expanded: false, slots: [{ id: 1, start: "09:00", end: "17:00" }] },
  wednesday: { enabled: true,  expanded: false, slots: [{ id: 1, start: "09:00", end: "17:00" }] },
  thursday:  { enabled: true,  expanded: false, slots: [{ id: 1, start: "09:00", end: "17:00" }] },
  friday:    { enabled: true,  expanded: false, slots: [{ id: 1, start: "09:00", end: "17:00" }] },
  saturday:  { enabled: false, expanded: false, slots: [] },
  sunday:    { enabled: false, expanded: false, slots: [] },
};

const formatTimeRange = (slots: TimeSlot[]) =>
  slots.map(s => `${s.start} – ${s.end}`).join(" · ");

const toLocalDateString = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const MONTH_NAMES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

interface ScheduleManagerProps {
  selectedDate: Date;
  slotsData: DaySlots[];
  isLoading: boolean;
}

export default function ScheduleManager({ selectedDate, slotsData, isLoading }: ScheduleManagerProps) {
  const [schedule, setSchedule] = useState<ScheduleState>(DEFAULT_SCHEDULE);

  // Find the selected day's slots from API data
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

  const updateSlot = (id: DayId, slotId: number, field: "start" | "end", value: string) => {
    setSchedule(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        slots: prev[id].slots.map(s => s.id === slotId ? { ...s, [field]: value } : s),
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

  return (
    <div className="flex flex-col gap-5">
      {/* ── Day slots panel (from API) ── */}
      <div className="bg-card rounded-2xl border overflow-hidden">
        <div className="px-6 py-5 border-b flex items-center gap-2">
          <Clock className="size-4 text-primary" />
          <h3 className="font-semibold tracking-tight">
            Franjas del día
          </h3>
          <span className="ml-auto text-xs text-muted-foreground">
            {selectedDate.getDate()} de {MONTH_NAMES[selectedDate.getMonth()]}
          </span>
        </div>

        <div className="px-6 py-5">
          {isLoading ? (
            <div className="flex flex-col gap-2">
              {[1, 2, 3].map(i => (
                <Skeleton key={i} className="h-10 w-full rounded-lg" />
              ))}
            </div>
          ) : apiSlots.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No hay franjas horarias para este día.
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              {apiSlots.map((slot, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between px-4 py-2.5 rounded-xl border bg-muted/30"
                >
                  <span className="text-sm font-medium">
                    {slot.start} – {slot.end}
                  </span>
                  {slot.isBooked ? (
                    <span className="flex items-center gap-1.5 text-xs text-amber-600 font-medium">
                      <XCircle className="size-3.5" />
                      Reservado
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-xs text-green-600 font-medium">
                      <CheckCircle2 className="size-3.5" />
                      Disponible
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Weekly schedule editor ── */}
      <div className="bg-card rounded-2xl border overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b flex items-center gap-2">
          <Clock className="size-4 text-primary" />
          <h3 className="font-semibold tracking-tight">Horario de atención</h3>
        </div>

        {/* Days */}
        <div className="divide-y divide-border">
          {DAYS.map(({ id, label }) => {
            const day = schedule[id];
            return (
              <div key={id}>
                {/* Day row */}
                <div className="flex items-center gap-3 px-6 py-4">
                  <Switch
                    checked={day.enabled}
                    onCheckedChange={() => toggleDay(id)}
                  />
                  <span className={`text-sm font-medium flex-1 ${day.enabled ? "text-foreground" : "text-muted-foreground"}`}>
                    {label}
                  </span>

                  {day.enabled && !day.expanded && day.slots.length > 0 && (
                    <span className="text-xs text-muted-foreground hidden sm:block">
                      {formatTimeRange(day.slots)}
                    </span>
                  )}

                  {!day.enabled && (
                    <span className="text-xs text-muted-foreground">Cerrado</span>
                  )}

                  {day.enabled && (
                    <button
                      type="button"
                      onClick={() => toggleExpanded(id)}
                      className="size-7 rounded-full flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                      aria-label={day.expanded ? "Colapsar" : "Expandir"}
                    >
                      {day.expanded
                        ? <ChevronUp className="size-4" />
                        : <ChevronDown className="size-4" />
                      }
                    </button>
                  )}
                </div>

                {/* Expanded slots */}
                {day.enabled && day.expanded && (
                  <div className="px-6 pb-4 flex flex-col gap-3 bg-muted/20">
                    {day.slots.map((slot) => (
                      <div key={slot.id} className="flex items-center gap-2">
                        {/* Start time */}
                        <select
                          value={slot.start}
                          onChange={e => updateSlot(id, slot.id, "start", e.target.value)}
                          className="flex-1 h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
                        >
                          {TIME_SLOTS.map(t => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>

                        <span className="text-xs text-muted-foreground shrink-0">a</span>

                        {/* End time */}
                        <select
                          value={slot.end}
                          onChange={e => updateSlot(id, slot.id, "end", e.target.value)}
                          className="flex-1 h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
                        >
                          {getEndOptions(slot.start).map(t => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>

                        {/* Add slot */}
                        <button
                          type="button"
                          onClick={() => addSlot(id)}
                          className="size-9 rounded-full flex items-center justify-center text-primary hover:bg-primary/10 transition-colors shrink-0"
                          aria-label="Agregar franja"
                        >
                          <Plus className="size-4" />
                        </button>

                        {/* Delete slot */}
                        {day.slots.length > 1 && (
                          <button
                            type="button"
                            onClick={() => deleteSlot(id, slot.id)}
                            className="size-9 rounded-full flex items-center justify-center text-destructive hover:bg-destructive/10 transition-colors shrink-0"
                            aria-label="Eliminar franja"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t">
          <Button type="button" className="w-full rounded-full">
            Guardar horario
          </Button>
        </div>
      </div>
    </div>
  );
}
