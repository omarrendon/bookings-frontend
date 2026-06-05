"use client";
// Dependencies
import { useState } from "react";
// Types
import type { DaySlots } from "@/lib/api/types";
// Icons
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

const DAY_LABELS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const MONTH_NAMES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];
const MONTH_NAMES_SHORT = [
  "ene", "feb", "mar", "abr", "may", "jun",
  "jul", "ago", "sep", "oct", "nov", "dic",
];

interface CalendarRowProps {
  slotsData: DaySlots[];
  isLoading: boolean;
  selectedDate: Date;
  currentMonth: Date;
  onDateSelect: (date: Date) => void;
  onMonthChange: (date: Date) => void;
}

const getWeekDays = (date: Date): Date[] => {
  const base = new Date(date);
  const first = base.getDate() - base.getDay();
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(base);
    d.setDate(first + i);
    return d;
  });
};

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

export default function CalendarRow({
  slotsData,
  isLoading,
  selectedDate,
  onDateSelect,
  onMonthChange,
}: CalendarRowProps) {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(selectedDate);

  const weekDays = getWeekDays(currentDate);
  const midWeek = weekDays[3];

  const navigate = (delta: number) => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() + delta);
    setCurrentDate(d);
    const newWeek = getWeekDays(d);
    const newMid = newWeek[3];
    if (
      newMid.getMonth() !== midWeek.getMonth() ||
      newMid.getFullYear() !== midWeek.getFullYear()
    ) {
      onMonthChange(new Date(newMid.getFullYear(), newMid.getMonth(), 1));
    }
  };

  const getDayStatus = (date: Date) => {
    const key = toLocalDateString(date);
    const day = slotsData.find(d => d.date === key);
    if (!day || day.slots.length === 0) return "closed";
    const allBooked = day.slots.every(s => s.isBooked);
    if (allBooked) return "full";
    return "available";
  };

  // Format selected date for display
  const selectedDayName = DAY_LABELS[selectedDate.getDay()];
  const selectedMonthName = MONTH_NAMES[selectedDate.getMonth()];

  return (
    <div className="bg-card rounded-2xl border border-border/60 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10">
            <CalendarDays className="size-3.5 text-primary" />
          </div>
          <h3 className="text-base font-semibold tracking-tight">
            Semana actual
          </h3>
        </div>
        <span className="text-sm font-medium text-muted-foreground capitalize">
          {MONTH_NAMES[midWeek.getMonth()]} {midWeek.getFullYear()}
        </span>
      </div>

      {/* Week grid */}
      <div className="px-4 sm:px-6 py-5 flex flex-col gap-4">
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Prev week */}
          <button
            type="button"
            onClick={() => navigate(-7)}
            className="size-8 rounded-full flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors shrink-0"
            aria-label="Semana anterior"
          >
            <ChevronLeft className="size-4" />
          </button>

          {/* Day cells */}
          <div className="flex-1 grid grid-cols-7 gap-1">
            {weekDays.map((day, i) => {
              const isSelected = isSameDay(day, selectedDate);
              const isToday = isSameDay(day, today);
              const status = !isLoading ? getDayStatus(day) : null;
              const isOtherMonth = day.getMonth() !== midWeek.getMonth();

              return (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  {/* Day label */}
                  <span className={`text-[10px] sm:text-xs font-medium uppercase tracking-wide ${
                    isOtherMonth ? "text-muted-foreground/40" : "text-muted-foreground"
                  }`}>
                    {DAY_LABELS[day.getDay()]}
                  </span>

                  {/* Day button */}
                  <button
                    type="button"
                    onClick={() => onDateSelect(day)}
                    aria-label={`Seleccionar ${day.getDate()} de ${MONTH_NAMES_SHORT[day.getMonth()]}`}
                    aria-pressed={isSelected}
                    className={`size-8 sm:size-9 rounded-full text-sm font-medium transition-all duration-150 ${
                      isSelected
                        ? "bg-primary text-primary-foreground shadow-md scale-105"
                        : isToday
                          ? "bg-primary/10 text-primary ring-1 ring-primary/30"
                          : isOtherMonth
                            ? "text-muted-foreground/40 hover:bg-muted"
                            : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {day.getDate()}
                  </button>

                  {/* Availability dot */}
                  {isLoading ? (
                    <span className="size-1.5 rounded-full bg-muted animate-pulse" />
                  ) : (
                    <span className={`size-1.5 rounded-full transition-colors ${
                      status === "available"
                        ? "bg-emerald-500"
                        : status === "full"
                          ? "bg-amber-400"
                          : "bg-transparent"
                    }`} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Next week */}
          <button
            type="button"
            onClick={() => navigate(7)}
            className="size-8 rounded-full flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors shrink-0"
            aria-label="Semana siguiente"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>

        {/* Selected date + legend row */}
        <div className="flex items-center justify-between gap-3 pt-1 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Viendo:</span>
            <span className="text-xs font-semibold bg-primary/10 text-primary px-2.5 py-1 rounded-full capitalize">
              {selectedDayName} {selectedDate.getDate()} de {selectedMonthName}
            </span>
          </div>

          {!isLoading && slotsData.length > 0 && (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-emerald-500" />
                <span className="text-xs text-muted-foreground">Disponible</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-amber-400" />
                <span className="text-xs text-muted-foreground">Lleno</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
