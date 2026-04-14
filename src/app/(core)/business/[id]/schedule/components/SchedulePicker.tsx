"use client";
// Dependencies
import { useState } from "react";
// Hooks
import { useMonthSlots } from "@/hooks/useSchedules";
// Components
import Calendar from "@/components/ui/Calendar";
import AvailablesTimes from "@/components/ui/AvailablesTimes";
// Icons
import { CalendarDays } from "lucide-react";

interface SchedulePickerProps {
  businessId: string;
}

export default function SchedulePicker({ businessId }: SchedulePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [displayMonth, setDisplayMonth] = useState<Date>(new Date());

  const { data, isLoading } = useMonthSlots(businessId, displayMonth);
  const daySlots = data?.data?.slots ?? [];
  // Construye un Date al mediodía local para evitar que la conversión a
  // America/Mexico_City desplace el día cuando el browser usa otra zona horaria.
  const toSafeDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day, 12, 0, 0);
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Días con al menos un slot libre (solo fechas desde hoy)
  const daysWithAvailability = daySlots
    .filter(d => toSafeDate(d.date) >= today && d.slots.some(s => !s.isBooked))
    .map(d => toSafeDate(d.date));

  // Días donde todos los slots están ocupados (solo fechas desde hoy)
  const daysWithoutAvailability = daySlots
    .filter(
      d =>
        toSafeDate(d.date) >= today &&
        (d.slots.length === 0 || d.slots.every(s => s.isBooked)),
    )
    .map(d => toSafeDate(d.date));

  // Slots disponibles del día seleccionado
  const pad = (n: number) => String(n).padStart(2, "0");
  const selectedDateKey = `${selectedDate.getFullYear()}-${pad(selectedDate.getMonth() + 1)}-${pad(selectedDate.getDate())}`;
  const selectedDay = daySlots.find(d => d.date === selectedDateKey);
  const availableSlots =
    selectedDay?.slots.filter(s => !s.isBooked).map(s => s.start) ?? [];

  return (
    <div className="bg-card rounded-2xl border overflow-hidden">
      <div className="px-6 py-5 border-b">
        <div className="flex items-center gap-2">
          <CalendarDays className="size-5 text-primary" />
          <h2 className="text-lg font-semibold tracking-tight">
            Selecciona fecha y hora
          </h2>
        </div>
        <p className="text-sm text-muted-foreground mt-0.5">
          Elige el día y el horario disponible para tu cita
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x">
        <div className="p-6">
          <Calendar
            selected={selectedDate}
            onSelect={setSelectedDate}
            displayMonth={displayMonth}
            onMonthChange={setDisplayMonth}
            daysWithAvailability={daysWithAvailability}
            daysWithoutAvailability={daysWithoutAvailability}
            isLoading={isLoading}
          />
        </div>
        <div className="p-6">
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
