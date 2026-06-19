"use client";
import { useState } from "react";
import { useMonthSlots } from "@/hooks/useSchedules";
import { useBusinessStore } from "@/store/business.store";
import CalendarRow from "@/components/ui/CalendarRow";
import ScheduleManager from "@/components/ui/ScheduleManager";
import { CalendarClock } from "lucide-react";

const isSameDay = (a: Date, b: Date) =>
  a.getDate() === b.getDate() &&
  a.getMonth() === b.getMonth() &&
  a.getFullYear() === b.getFullYear();

export interface DateRange {
  start: Date;
  end: Date | null;
}

export default function LayoutSchedules() {
  const businessId = useBusinessStore(
    state => state.business?.id?.toString() ?? ""
  );

  const [currentMonth, setCurrentMonth] = useState(() => new Date());
  const [dateRange, setDateRange] = useState<DateRange>(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return { start: d, end: null };
  });
  const [isSelectingRange, setIsSelectingRange] = useState(false);

  const { data, isLoading } = useMonthSlots(businessId, currentMonth);
  const slotsData = data?.data?.slots ?? [];

  const handleDateSelect = (date: Date) => {
    if (dateRange.end !== null) {
      // Range already complete → reset to new single day
      setDateRange({ start: date, end: null });
      setIsSelectingRange(false);
    } else if (isSelectingRange) {
      if (isSameDay(date, dateRange.start)) {
        // Re-click on start → cancel range mode
        setIsSelectingRange(false);
      } else {
        // Click on different day → complete the range
        const [start, end] =
          date > dateRange.start
            ? [dateRange.start, date]
            : [date, dateRange.start];
        setDateRange({ start, end });
        setIsSelectingRange(false);
      }
    } else {
      if (isSameDay(date, dateRange.start)) {
        // Second click on same day → enter range selection mode
        setIsSelectingRange(true);
      } else {
        // First click on a new day → just select it
        setDateRange({ start: date, end: null });
      }
    }

    if (
      date.getMonth() !== currentMonth.getMonth() ||
      date.getFullYear() !== currentMonth.getFullYear()
    ) {
      setCurrentMonth(new Date(date.getFullYear(), date.getMonth(), 1));
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Page header */}
      <div className="flex items-center gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
          <CalendarClock className="size-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Horarios</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Selecciona un día o un rango de días y configura las franjas de
            apertura y cierre de tu negocio.
          </p>
        </div>
      </div>

      {/* Two-column layout on lg: calendar (340px) + editor (flexible) */}
      <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6 items-start">
        <CalendarRow
          slotsData={slotsData}
          isLoading={isLoading}
          dateRange={dateRange}
          isSelectingRange={isSelectingRange}
          currentMonth={currentMonth}
          onDateSelect={handleDateSelect}
          onMonthChange={setCurrentMonth}
        />

        <ScheduleManager
          businessId={businessId}
          dateRange={dateRange}
          slotsData={slotsData}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
