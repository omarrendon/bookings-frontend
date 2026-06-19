"use client";

import { useState } from "react";
import { useMonthSlots } from "@/hooks/useSchedules";
import { useCartStore } from "@/store/cart.store";
import Calendar from "@/components/ui/Calendar";
import AvailablesTimes from "@/components/ui/AvailablesTimes";
import { CalendarDays, Clock } from "lucide-react";

interface SchedulePickerProps {
  businessId: string;
}

export default function SchedulePicker({ businessId }: SchedulePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [displayMonth, setDisplayMonth] = useState<Date>(new Date());

  const { setSelectedDate: storeSetDate } = useCartStore();

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    const p = (n: number) => String(n).padStart(2, "0");
    storeSetDate(
      `${date.getFullYear()}-${p(date.getMonth() + 1)}-${p(date.getDate())}`,
    );
  };

  const { data, isLoading } = useMonthSlots(businessId, displayMonth);
  const daySlots = data?.data?.slots ?? [];

  const toSafeDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day, 12, 0, 0);
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const daysWithAvailability = daySlots
    .filter(d => toSafeDate(d.date) >= today && d.slots.some(s => !s.isBooked))
    .map(d => toSafeDate(d.date));

  const daysWithoutAvailability = daySlots
    .filter(
      d =>
        toSafeDate(d.date) >= today &&
        (d.slots.length === 0 || d.slots.every(s => s.isBooked)),
    )
    .map(d => toSafeDate(d.date));

  const pad = (n: number) => String(n).padStart(2, "0");
  const selectedDateKey = `${selectedDate.getFullYear()}-${pad(selectedDate.getMonth() + 1)}-${pad(selectedDate.getDate())}`;
  const selectedDay = daySlots.find(d => d.date === selectedDateKey);
  const availableSlots = selectedDay?.slots ?? [];

  return (
    <div className="bg-card rounded-2xl border border-border/60 overflow-hidden shadow-sm">
      {/* Encabezado */}
      <div className="px-6 py-5 border-b border-border/60 bg-muted/20">
        <div className="flex items-center gap-2 mb-0.5">
          <CalendarDays className="size-5 text-primary" />
          <h2 className="text-lg font-semibold tracking-tight">
            Selecciona fecha y hora
          </h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Elige el día y el horario disponible para tu cita
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border/60">
        {/* Calendario */}
        <div className="p-6">
          <div className="flex items-center gap-1.5 mb-4">
            <CalendarDays className="size-4 text-muted-foreground" />
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Fecha
            </p>
          </div>
          <Calendar
            selected={selectedDate}
            onSelect={handleDateSelect}
            displayMonth={displayMonth}
            onMonthChange={setDisplayMonth}
            daysWithAvailability={daysWithAvailability}
            daysWithoutAvailability={daysWithoutAvailability}
            isLoading={isLoading}
          />
        </div>

        {/* Horarios */}
        <div className="p-10">
          <div className="flex items-center gap-1.5 mb-4">
            <Clock className="size-4 text-muted-foreground" />
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Hora disponible
            </p>
          </div>
          <AvailablesTimes
            slots={availableSlots}
            selectedDate={selectedDate}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
