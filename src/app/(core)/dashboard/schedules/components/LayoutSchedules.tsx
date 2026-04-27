"use client";
// Components
import CalendarRow from "@/components/ui/CalendarRow";
import ScheduleManager from "@/components/ui/ScheduleManager";

export default function LayoutSchedules() {
  return (
    <div className="flex w-full flex-col gap-6">
      {/* ── Header ── */}
      <div>
        <h2 className="text-xl font-semibold text-primary">Mis Horarios</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Configura los días y franjas horarias en que tu negocio está disponible para atender.
        </p>
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col gap-5 max-w-3xl w-full">
        <CalendarRow />
        <ScheduleManager />
      </div>
    </div>
  );
}
