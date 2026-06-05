"use client";
import { useEffect, useState } from "react";
import type { DaySlots, TimeSlot } from "@/lib/api/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { generateTimeSlots, timeToMinutes } from "@/utils/dates/utils";
import {
  AlertTriangle,
  CalendarCheck2,
  CalendarRange,
  Clock,
  Loader2,
  Plus,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { DateRange } from "@/app/(core)/dashboard/schedules/components/LayoutSchedules";

const TIME_SLOTS = generateTimeSlots();

const MONTH_NAMES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];
const DAY_NAMES = [
  "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado",
];

// ─── helpers ──────────────────────────────────────────────────────────────────

const toLocalDateString = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

// Merge consecutive 30/60-min API slots into user-facing open/close ranges
const mergeApiSlots = (slots: TimeSlot[]): { start: string; end: string }[] => {
  if (slots.length === 0) return [];
  const sorted = [...slots].sort(
    (a, b) => timeToMinutes(a.start) - timeToMinutes(b.start)
  );
  const ranges: { start: string; end: string }[] = [];
  let range = { start: sorted[0].start, end: sorted[0].end };
  for (let i = 1; i < sorted.length; i++) {
    if (timeToMinutes(sorted[i].start) === timeToMinutes(range.end)) {
      range.end = sorted[i].end;
    } else {
      ranges.push(range);
      range = { start: sorted[i].start, end: sorted[i].end };
    }
  }
  ranges.push(range);
  return ranges;
};

// Returns the set of indices that overlap with at least one other slot
const getOverlappingIndices = (slots: LocalSlot[]): Set<number> => {
  const set = new Set<number>();
  for (let i = 0; i < slots.length; i++) {
    for (let j = i + 1; j < slots.length; j++) {
      if (
        timeToMinutes(slots[i].start) < timeToMinutes(slots[j].end) &&
        timeToMinutes(slots[i].end) > timeToMinutes(slots[j].start)
      ) {
        set.add(i);
        set.add(j);
      }
    }
  }
  return set;
};

const minToHHMM = (mins: number) =>
  `${String(Math.floor(mins / 60)).padStart(2, "0")}:${String(mins % 60).padStart(2, "0")}`;

// ─── types ────────────────────────────────────────────────────────────────────

interface LocalSlot {
  id: string;
  start: string;
  end: string;
}

interface ScheduleManagerProps {
  dateRange: DateRange;
  slotsData: DaySlots[];
  isLoading: boolean;
}

// ─── component ────────────────────────────────────────────────────────────────

export default function ScheduleManager({
  dateRange,
  slotsData,
  isLoading,
}: ScheduleManagerProps) {
  const [localSlots, setLocalSlots] = useState<LocalSlot[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  // Sync editor when date selection or API data changes
  useEffect(() => {
    if (!dateRange.end) {
      // Single day — load existing slots
      const key = toLocalDateString(dateRange.start);
      const dayData = slotsData.find(d => d.date === key);
      if (dayData && dayData.slots.length > 0) {
        const ranges = mergeApiSlots(dayData.slots);
        setLocalSlots(ranges.map((r, i) => ({ id: `api-${i}-${r.start}`, ...r })));
      } else {
        setLocalSlots([]);
      }
    } else {
      // Range selected — start with a clean slate
      setLocalSlots([]);
    }
    setIsDirty(false);
  }, [dateRange, slotsData]);

  const overlapping = getOverlappingIndices(localSlots);

  // ── mutations ──────────────────────────────────────────────────────────────

  const addSlot = () => {
    const last = localSlots[localSlots.length - 1];
    let start = "09:00";
    let end = "17:00";
    if (last) {
      const startMins = timeToMinutes(last.end) + 30;
      const endMins = startMins + 60;
      if (startMins < 24 * 60) start = minToHHMM(startMins);
      if (endMins < 24 * 60) end = minToHHMM(endMins);
    }
    setLocalSlots(prev => [
      ...prev,
      { id: `new-${Date.now()}`, start, end },
    ]);
    setIsDirty(true);
  };

  const deleteSlot = (id: string) => {
    setLocalSlots(prev => prev.filter(s => s.id !== id));
    setIsDirty(true);
  };

  const updateSlot = (id: string, field: "start" | "end", value: string) => {
    setLocalSlots(prev =>
      prev.map(s => {
        if (s.id !== id) return s;
        if (field === "start") {
          const startMins = timeToMinutes(value);
          const endMins = timeToMinutes(s.end);
          // Auto-advance end when start moves past it
          if (startMins >= endMins) {
            const newEndMins = Math.min(startMins + 60, 23 * 60 + 30);
            return { ...s, start: value, end: minToHHMM(newEndMins) };
          }
        }
        return { ...s, [field]: value };
      })
    );
    setIsDirty(true);
  };

  const handleSave = async () => {
    if (overlapping.size > 0) return;
    setIsSaving(true);
    // TODO: integrate with API when endpoint is available
    await new Promise(r => setTimeout(r, 800));
    setIsSaving(false);
    setIsDirty(false);
  };

  // ── derived display values ─────────────────────────────────────────────────

  const getEndOptions = (start: string) =>
    TIME_SLOTS.filter(t => timeToMinutes(t) > timeToMinutes(start));

  const isRange = !!dateRange.end;
  const daysCount = isRange
    ? Math.round(
        (dateRange.end!.getTime() - dateRange.start.getTime()) / 86400000
      ) + 1
    : 1;

  const dayLabel = DAY_NAMES[dateRange.start.getDay()];
  const monthLabel = MONTH_NAMES[dateRange.start.getMonth()];
  const hasOverlap = overlapping.size > 0;

  // ── render ─────────────────────────────────────────────────────────────────

  return (
    <div className="bg-card rounded-2xl border border-border/60 shadow-sm overflow-hidden flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border/60 flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            {isRange ? (
              <CalendarRange className="size-3.5 text-primary" />
            ) : (
              <CalendarCheck2 className="size-3.5 text-primary" />
            )}
          </div>
          <div>
            {isRange ? (
              <h3 className="text-base font-semibold tracking-tight">
                {dateRange.start.getDate()} de{" "}
                {MONTH_NAMES[dateRange.start.getMonth()].slice(0, 3).toLowerCase()}
                <span className="text-muted-foreground font-normal mx-1.5">→</span>
                {dateRange.end!.getDate()} de{" "}
                {MONTH_NAMES[dateRange.end!.getMonth()].slice(0, 3).toLowerCase()}
              </h3>
            ) : (
              <h3 className="text-base font-semibold tracking-tight">
                {dayLabel}{" "}
                <span className="text-muted-foreground font-normal">
                  {dateRange.start.getDate()} de {monthLabel}
                </span>
              </h3>
            )}
            <p className="text-xs text-muted-foreground mt-0.5">
              {isRange
                ? `Este horario se aplicará a ${daysCount} días`
                : "Franjas de apertura y cierre del negocio"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 flex-wrap justify-end">
          {isDirty && !isSaving && (
            <Badge
              variant="secondary"
              className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-0 text-xs"
            >
              Sin guardar
            </Badge>
          )}
          {isRange && (
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary border-0 text-xs tabular-nums"
            >
              {daysCount} días
            </Badge>
          )}
          {!isRange && localSlots.length > 0 && (
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary border-0 text-xs tabular-nums"
            >
              {localSlots.length} {localSlots.length === 1 ? "franja" : "franjas"}
            </Badge>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="px-6 py-5 flex-1">
        {isLoading ? (
          <div className="flex flex-col gap-3">
            {[1, 2].map(i => (
              <Skeleton key={i} className="h-14 w-full rounded-xl" />
            ))}
          </div>
        ) : localSlots.length === 0 ? (
          /* ── Empty state ── */
          <div className="flex flex-col items-center justify-center py-12 text-center gap-3">
            <div className="rounded-full bg-muted p-4">
              <Clock className="size-7 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <p className="font-medium text-sm">Sin horarios para este día</p>
              <p className="text-sm text-muted-foreground max-w-xs">
                Agrega una franja para definir cuándo abre y cierra tu negocio en esta fecha.
              </p>
            </div>
            <Button
              type="button"
              onClick={addSlot}
              className="gap-2 mt-1"
            >
              <Plus className="size-4" />
              Agregar horario
            </Button>
          </div>
        ) : (
          /* ── Slot editor ── */
          <div className="flex flex-col gap-4">
            {/* Section label + overlap warning */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Horarios de atención
              </span>
              {hasOverlap && (
                <div className="flex items-center gap-1.5 text-destructive">
                  <AlertTriangle className="size-3.5 shrink-0" />
                  <span className="text-xs font-medium">
                    Los horarios se empalman
                  </span>
                </div>
              )}
            </div>

            {/* Slot rows */}
            <div className="flex flex-col gap-2.5">
              {localSlots.map((slot, idx) => {
                const isOverlapping = overlapping.has(idx);
                return (
                  <div
                    key={slot.id}
                    className={cn(
                      "flex items-center gap-2.5 rounded-xl px-3 py-2.5 transition-colors",
                      isOverlapping
                        ? "bg-destructive/5 ring-1 ring-destructive/30"
                        : "bg-muted/30 hover:bg-muted/50"
                    )}
                  >
                    {/* Leading icon */}
                    <Clock
                      className={cn(
                        "size-3.5 shrink-0",
                        isOverlapping
                          ? "text-destructive"
                          : "text-muted-foreground"
                      )}
                    />

                    {/* Start time */}
                    <Select
                      value={slot.start}
                      onValueChange={v => updateSlot(slot.id, "start", v)}
                    >
                      <SelectTrigger
                        className={cn(
                          "h-9 flex-1 bg-background border-border/80 text-sm min-w-0",
                          isOverlapping && "border-destructive/50 text-destructive"
                        )}
                        aria-label={`Apertura, franja ${idx + 1}`}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="max-h-52">
                        {TIME_SLOTS.map(t => (
                          <SelectItem key={t} value={t} className="text-sm tabular-nums">
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <span className="text-xs text-muted-foreground font-medium shrink-0 select-none">
                      →
                    </span>

                    {/* End time */}
                    <Select
                      value={slot.end}
                      onValueChange={v => updateSlot(slot.id, "end", v)}
                    >
                      <SelectTrigger
                        className={cn(
                          "h-9 flex-1 bg-background border-border/80 text-sm min-w-0",
                          isOverlapping && "border-destructive/50 text-destructive"
                        )}
                        aria-label={`Cierre, franja ${idx + 1}`}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="max-h-52">
                        {getEndOptions(slot.start).map(t => (
                          <SelectItem key={t} value={t} className="text-sm tabular-nums">
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => deleteSlot(slot.id)}
                      className="size-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors shrink-0"
                      aria-label={`Eliminar franja ${idx + 1}`}
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>

            <Separator />

            {/* Add slot */}
            <Button
              type="button"
              variant="outline"
              className="w-full gap-2 border-dashed text-muted-foreground hover:text-foreground"
              onClick={addSlot}
            >
              <Plus className="size-4" />
              Agregar franja horaria
            </Button>
          </div>
        )}
      </div>

      {/* Footer — only when there's something to save */}
      {!isLoading && (localSlots.length > 0 || isDirty) && (
        <div className="px-6 py-4 border-t border-border/60 bg-muted/30">
          <Button
            type="button"
            className="w-full gap-2 font-medium"
            disabled={isSaving || hasOverlap}
            onClick={handleSave}
          >
            {isSaving ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Guardando...
              </>
            ) : hasOverlap ? (
              <>
                <AlertTriangle className="size-4" />
                Corrige los empalmes para guardar
              </>
            ) : isRange ? (
              `Guardar ${daysCount} días`
            ) : (
              "Guardar horario"
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
