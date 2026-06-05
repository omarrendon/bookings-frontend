"use client";
import { useMemo, useState } from "react";
import type { DaySlots } from "@/lib/api/types";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DateRange } from "@/app/(core)/dashboard/schedules/components/LayoutSchedules";

const MONTH_NAMES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];
const WEEK_DAYS = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sá", "Do"];

const isSameDay = (a: Date, b: Date) =>
  a.getDate() === b.getDate() &&
  a.getMonth() === b.getMonth() &&
  a.getFullYear() === b.getFullYear();

const toLocalDateString = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

interface CalendarRowProps {
  slotsData: DaySlots[];
  isLoading: boolean;
  dateRange: DateRange;
  currentMonth: Date;
  onDateSelect: (date: Date) => void;
  onMonthChange: (date: Date) => void;
}

export default function CalendarRow({
  slotsData,
  isLoading,
  dateRange,
  currentMonth,
  onDateSelect,
  onMonthChange,
}: CalendarRowProps) {
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // Monday-first offset: Sun=0 → 6, Mon=1 → 0
  const firstOffset = (new Date(year, month, 1).getDay() + 6) % 7;

  // Block prev-month navigation when already at or before the current month
  const isPrevMonthDisabled =
    year < today.getFullYear() ||
    (year === today.getFullYear() && month <= today.getMonth());

  // ── Visual range (confirmed OR hover preview) ──────────────────────────────

  const visualStart = useMemo(() => {
    if (dateRange.end) return dateRange.start;
    if (hoverDate && hoverDate < dateRange.start) return hoverDate;
    return dateRange.start;
  }, [dateRange, hoverDate]);

  const visualEnd = useMemo(() => {
    if (dateRange.end) return dateRange.end;
    if (hoverDate && !isSameDay(hoverDate, dateRange.start)) {
      return hoverDate > dateRange.start ? hoverDate : dateRange.start;
    }
    return null;
  }, [dateRange, hoverDate]);

  // True when start ≠ end (span of 2+ days)
  const isVisualRange =
    visualEnd !== null && !isSameDay(visualStart, visualEnd);
  // Preview = user hovering, no confirmed end yet
  const isPreview = !dateRange.end && isVisualRange;

  // ── Slots map ──────────────────────────────────────────────────────────────

  const slotsMap = useMemo(() => {
    const map: Record<string, "configured" | "full"> = {};
    slotsData.forEach(d => {
      if (d.slots.length === 0) return;
      map[d.date] = d.slots.every(s => s.isBooked) ? "full" : "configured";
    });
    return map;
  }, [slotsData]);

  // ── Legend chip label ──────────────────────────────────────────────────────

  const legendText = useMemo(() => {
    const { start, end } = dateRange;
    if (!end) {
      return `${start.getDate()} de ${MONTH_NAMES[start.getMonth()].toLowerCase()}`;
    }
    const sameMonth =
      start.getMonth() === end.getMonth() &&
      start.getFullYear() === end.getFullYear();
    if (sameMonth) {
      return `${start.getDate()} – ${end.getDate()} de ${MONTH_NAMES[start.getMonth()].toLowerCase()}`;
    }
    return `${start.getDate()} ${MONTH_NAMES[start.getMonth()].slice(0, 3).toLowerCase()} – ${end.getDate()} ${MONTH_NAMES[end.getMonth()].slice(0, 3).toLowerCase()}`;
  }, [dateRange]);

  return (
    <div className="bg-card rounded-2xl border border-border/60 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-border/60 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10">
            <CalendarDays className="size-3.5 text-primary" />
          </div>
          <h3 className="text-base font-semibold tracking-tight capitalize">
            {MONTH_NAMES[month]} {year}
          </h3>
        </div>
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            onClick={() => onMonthChange(new Date(year, month - 1, 1))}
            disabled={isPrevMonthDisabled}
            className={cn(
              "size-8 rounded-full flex items-center justify-center transition-colors",
              isPrevMonthDisabled
                ? "text-muted-foreground/30 cursor-not-allowed"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
            aria-label="Mes anterior"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => onMonthChange(new Date(year, month + 1, 1))}
            className="size-8 rounded-full flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            aria-label="Mes siguiente"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      <div className="px-4 pt-2 pb-4">
        {/* Weekday headers */}
        <div className="grid grid-cols-7 mb-1">
          {WEEK_DAYS.map(d => (
            <div
              key={d}
              className="text-center text-xs font-medium text-muted-foreground/70 py-2 uppercase tracking-wide"
            >
              {d}
            </div>
          ))}
        </div>

        {/* Day grid */}
        <div
          className="grid grid-cols-7"
          onMouseLeave={() => setHoverDate(null)}
        >
          {/* Offset empty cells */}
          {Array.from({ length: firstOffset }).map((_, i) => (
            <div key={`e${i}`} className="h-11" />
          ))}

          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const date = new Date(year, month, day);
            const isPast = date < today;
            const isToday = isSameDay(date, today);
            const dateKey = toLocalDateString(date);
            const status =
              isLoading || isPast ? null : (slotsMap[dateKey] ?? null);

            // Visual range flags
            const isVStart = isSameDay(date, visualStart);
            const isVEnd = !!visualEnd && isSameDay(date, visualEnd);
            const isVMiddle =
              !!visualEnd && date > visualStart && date < visualEnd;

            // Confirmed range flags
            const isConfStart =
              !!dateRange.end && isSameDay(date, dateRange.start);
            const isConfEnd = !!dateRange.end && isSameDay(date, dateRange.end);
            const isConfMiddle =
              !!dateRange.end && date > dateRange.start && date < dateRange.end;

            // Single selected day (no range end)
            const isSingle = !dateRange.end && isSameDay(date, dateRange.start);

            // Stripe rendering helpers
            const showLeftStripe = isVisualRange && (isVMiddle || isVEnd);
            const showRightStripe = isVisualRange && (isVMiddle || isVStart);
            const stripeClass = isPreview ? "bg-primary/5" : "bg-primary/10";

            return (
              <div
                key={day}
                className="relative flex flex-col items-center gap-0.5 py-0.5"
              >
                {/* Left-half stripe (fills left side of cell for range middle & end) */}
                {showLeftStripe && (
                  <div
                    className={cn(
                      "absolute top-0.5 h-9 left-0 right-1/2 pointer-events-none",
                      stripeClass,
                    )}
                  />
                )}
                {/* Right-half stripe (fills right side for range middle & start) */}
                {showRightStripe && (
                  <div
                    className={cn(
                      "absolute top-0.5 h-9 left-1/2 right-0 pointer-events-none",
                      stripeClass,
                    )}
                  />
                )}

                <button
                  type="button"
                  onClick={() => !isPast && onDateSelect(date)}
                  disabled={isPast}
                  onMouseEnter={() => {
                    if (!isPast && !dateRange.end) setHoverDate(date);
                  }}
                  aria-label={`Seleccionar ${day} de ${MONTH_NAMES[month]}`}
                  aria-pressed={
                    isSingle || isConfStart || isConfEnd || isConfMiddle
                  }
                  className={cn(
                    "size-9 rounded-full text-sm font-medium transition-all duration-150 flex items-center justify-center relative z-10",
                    // Past days — disabled appearance
                    isPast && "text-muted-foreground/30 cursor-not-allowed",
                    // Confirmed: solid circle on start / end
                    !isPast &&
                      (isSingle || isConfStart || isConfEnd) &&
                      "bg-primary text-primary-foreground shadow-md scale-105",
                    // Confirmed: in-range days
                    !isPast &&
                      isConfMiddle &&
                      "text-primary font-semibold hover:bg-primary/20",
                    // Hover preview: semi-transparent endpoints
                    !isPast &&
                      isPreview &&
                      (isVStart || isVEnd) &&
                      "bg-primary/60 text-primary-foreground shadow-sm",
                    // Hover preview: in-range days
                    !isPast && isPreview && isVMiddle && "text-primary/80",
                    // Today ring (only when not part of any range/selection)
                    !isPast &&
                      !isSingle &&
                      !isConfStart &&
                      !isConfEnd &&
                      !isConfMiddle &&
                      !(isPreview && (isVStart || isVEnd || isVMiddle)) &&
                      isToday &&
                      "bg-primary/10 text-primary ring-1 ring-primary/30 font-semibold",
                    // Default
                    !isPast &&
                      !isSingle &&
                      !isConfStart &&
                      !isConfEnd &&
                      !isConfMiddle &&
                      !(isPreview && (isVStart || isVEnd || isVMiddle)) &&
                      !isToday &&
                      "text-foreground hover:bg-muted",
                  )}
                >
                  {day}
                </button>

                {/* Status dot — hidden for past days */}
                {!isPast && isLoading ? (
                  <span className="size-1 rounded-full bg-muted/40 animate-pulse" />
                ) : (
                  <span
                    className={cn(
                      "size-1 rounded-full transition-colors",
                      !isPast && status === "configured" && "bg-emerald-500",
                      !isPast && status === "full" && "bg-amber-400",
                      (isPast || !status) && "invisible",
                    )}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="px-5 py-3 border-t border-border/60 bg-muted/20 flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-emerald-500" />
            <span className="text-xs text-muted-foreground">Con horario</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-amber-400" />
            <span className="text-xs text-muted-foreground">Sin horario</span>
          </div>
        </div>
        <span className="text-xs font-medium bg-primary/10 text-primary px-2.5 py-1 rounded-full shrink-0">
          {legendText}
        </span>
      </div>
    </div>
  );
}
