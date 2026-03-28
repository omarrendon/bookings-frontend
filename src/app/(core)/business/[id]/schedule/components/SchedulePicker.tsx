import { CalendarDays } from "lucide-react";
// Components
import AvailablesTimes from "@/components/ui/AvailablesTimes";
import Calendar from "@/components/ui/Calendar";

export default function SchedulePicker() {
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
          <Calendar />
        </div>
        <div className="p-6">
          <AvailablesTimes />
        </div>
      </div>
    </div>
  );
}
