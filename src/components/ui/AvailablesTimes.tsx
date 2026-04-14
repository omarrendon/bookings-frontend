"use client";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart.store";

interface AvailablesTimesProps {
  slots: string[];
  selectedDate: Date;
  isLoading?: boolean;
}

export default function AvailablesTimes({
  slots,
  selectedDate,
  isLoading = false,
}: AvailablesTimesProps) {
  const { selectedTime, setSelectedTime } = useCartStore();

  const formattedDate = selectedDate.toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "America/Mexico_City",
  });

  return (
    <div className="flex flex-col gap-4 h-full">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Clock className="size-4 text-primary" />
          <h3 className="font-semibold text-sm">Horarios disponibles</h3>
        </div>
        <p className="text-xs text-muted-foreground capitalize">{formattedDate}</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="h-9 rounded-xl bg-muted animate-pulse"
            />
          ))}
        </div>
      ) : slots.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-center text-sm text-muted-foreground py-8">
          No hay horarios disponibles para este día
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {slots.map(slot => (
            <button
              key={slot}
              onClick={() => setSelectedTime(slot)}
              className={cn(
                "px-2 py-2.5 rounded-xl text-xs font-medium border transition-all duration-150",
                "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1",
                selectedTime === slot
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background hover:bg-primary hover:text-primary-foreground hover:border-primary",
              )}
            >
              {slot}
            </button>
          ))}
        </div>
      )}

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
