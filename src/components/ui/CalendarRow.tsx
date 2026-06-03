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
    // If the week crosses into another month, notify parent
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

  return (
    <div className="bg-card rounded-2xl border overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarDays className="size-4 text-primary" />
          <h3 className="font-semibold tracking-tight">Semana actual</h3>
        </div>
        <span className="text-sm text-muted-foreground capitalize">
          {MONTH_NAMES[midWeek.getMonth()]} {midWeek.getFullYear()}
        </span>
      </div>

      {/* Week grid */}
      <div className="px-6 py-5 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          {/* Prev */}
          <button
            type="button"
            onClick={() => navigate(-7)}
            className="size-8 rounded-full flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors shrink-0"
            aria-label="Semana anterior"
          >
            <ChevronLeft className="size-4" />
          </button>

          {/* Days */}
          <div className="flex-1 grid grid-cols-7 gap-1">
            {weekDays.map((day, i) => {
              const isSelected = isSameDay(day, selectedDate);
              const isToday = isSameDay(day, today);
              const status = !isLoading ? getDayStatus(day) : null;

              return (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <span className="text-xs font-medium text-muted-foreground">
                    {DAY_LABELS[day.getDay()]}
                  </span>
                  <button
                    type="button"
                    onClick={() => onDateSelect(day)}
                    className={`size-9 rounded-full text-sm font-medium transition-colors ${
                      isSelected
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : isToday
                          ? "bg-primary/10 text-primary"
                          : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {day.getDate()}
                  </button>
                  {/* Availability dot */}
                  <span className={`size-1.5 rounded-full ${
                    status === "available"
                      ? "bg-green-500"
                      : status === "full"
                        ? "bg-amber-400"
                        : "bg-transparent"
                  }`} />
                </div>
              );
            })}
          </div>

          {/* Next */}
          <button
            type="button"
            onClick={() => navigate(7)}
            className="size-8 rounded-full flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors shrink-0"
            aria-label="Semana siguiente"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>

        {/* Selected date pill */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Seleccionado:</span>
          <span className="text-xs font-medium bg-primary/10 text-primary px-2.5 py-1 rounded-full">
            {selectedDate.getDate()} de {MONTH_NAMES[selectedDate.getMonth()]} de {selectedDate.getFullYear()}
          </span>
        </div>

        {/* Legend */}
        {!isLoading && slotsData.length > 0 && (
          <div className="flex items-center gap-4 pt-1">
            <div className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-green-500" />
              <span className="text-xs text-muted-foreground">Disponible</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-amber-400" />
              <span className="text-xs text-muted-foreground">Sin disponibilidad</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
