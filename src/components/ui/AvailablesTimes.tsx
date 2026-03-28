import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const TIME_SLOTS = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
];

export default function AvailablesTimes() {
  return (
    <div className="flex flex-col gap-4 h-full">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Clock className="size-4 text-primary" />
          <h3 className="font-semibold text-sm">Horarios disponibles</h3>
        </div>
        <p className="text-xs text-muted-foreground">
          {new Date().toLocaleDateString("es-ES", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {TIME_SLOTS.map(time => (
          <button
            key={time}
            className={cn(
              "px-2 py-2.5 rounded-xl text-xs font-medium border transition-all duration-150",
              "bg-background hover:bg-primary hover:text-primary-foreground hover:border-primary",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1",
            )}
          >
            {time}
          </button>
        ))}
      </div>

      <div className="mt-auto pt-4 border-t">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="inline-block size-2 rounded-full bg-green-500" />
            Con disponibilidad
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block size-2 rounded-full bg-red-500" />
            Sin disponibilidad
          </span>
        </div>
      </div>
    </div>
  );
}
