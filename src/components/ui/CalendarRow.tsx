"use client";
// Dependencies
import { useState } from "react";
// Icons
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

const DAY_LABELS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const MONTH_NAMES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

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

export default function CalendarRow() {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState(today);

  const weekDays = getWeekDays(currentDate);
  const midWeek = weekDays[3];

  const goToPreviousWeek = () => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() - 7);
    setCurrentDate(d);
  };

  const goToNextWeek = () => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() + 7);
    setCurrentDate(d);
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
            onClick={goToPreviousWeek}
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

              return (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <span className="text-xs font-medium text-muted-foreground">
                    {DAY_LABELS[day.getDay()]}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedDate(day)}
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
                </div>
              );
            })}
          </div>

          {/* Next */}
          <button
            type="button"
            onClick={goToNextWeek}
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
      </div>
    </div>
  );
}
