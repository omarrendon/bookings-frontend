"use client";
// Dependencies
import { useState } from "react";
// Hooks & store
import { useMonthSlots } from "@/hooks/useSchedules";
import { useBusinessStore } from "@/store/business.store";
// Components
import CalendarRow from "@/components/ui/CalendarRow";
import ScheduleManager from "@/components/ui/ScheduleManager";
// Icons
import { CalendarClock } from "lucide-react";

export default function LayoutSchedules() {
  const businessId = useBusinessStore(state => state.business?.id?.toString() ?? "");

  const [currentMonth, setCurrentMonth] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState(() => new Date());

  const { data, isLoading } = useMonthSlots(businessId, currentMonth);
  const slotsData = data?.data?.slots ?? [];

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    if (
      date.getMonth() !== currentMonth.getMonth() ||
      date.getFullYear() !== currentMonth.getFullYear()
    ) {
      setCurrentMonth(new Date(date.getFullYear(), date.getMonth(), 1));
    }
  };

  return (
    <div className="flex w-full flex-col gap-8">
      {/* Page header */}
      <div className="flex items-center gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
          <CalendarClock className="size-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Horarios</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Consulta y configura los días y franjas horarias de tu negocio.
          </p>
        </div>
      </div>

      {/* Content */}
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
