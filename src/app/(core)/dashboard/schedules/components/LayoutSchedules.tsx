"use client";
// Dependencies
import { useState } from "react";
// Hooks & store
import { useMonthSlots } from "@/hooks/useSchedules";
import { useBusinessStore } from "@/store/business.store";
// Components
import CalendarRow from "@/components/ui/CalendarRow";
import ScheduleManager from "@/components/ui/ScheduleManager";

export default function LayoutSchedules() {
  const businessId = useBusinessStore(state => state.business?.id?.toString() ?? "");

  // Mes activo — controla qué mes se consulta a la API
  const [currentMonth, setCurrentMonth] = useState(() => new Date());
  // Día seleccionado — compartido entre CalendarRow y ScheduleManager
  const [selectedDate, setSelectedDate] = useState(() => new Date());

  const { data, isLoading } = useMonthSlots(businessId, currentMonth);
  const slotsData = data?.data?.slots ?? [];

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    // Si el día seleccionado cae en otro mes, actualiza el fetch
    if (
      date.getMonth() !== currentMonth.getMonth() ||
      date.getFullYear() !== currentMonth.getFullYear()
    ) {
      setCurrentMonth(new Date(date.getFullYear(), date.getMonth(), 1));
    }
  };

  return (
    <div className="flex w-full flex-col gap-6">
      {/* ── Header ── */}
      <div>
        <h2 className="text-xl font-semibold text-primary">Mis Horarios</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Consulta los días y franjas horarias disponibles de tu negocio.
        </p>
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col gap-5 max-w-3xl w-full">
        <CalendarRow
          slotsData={slotsData}
          isLoading={isLoading}
          selectedDate={selectedDate}
          currentMonth={currentMonth}
          onDateSelect={handleDateSelect}
          onMonthChange={setCurrentMonth}
        />
        <ScheduleManager
          selectedDate={selectedDate}
          slotsData={slotsData}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
