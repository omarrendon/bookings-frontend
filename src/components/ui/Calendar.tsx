"use client";
// Dependencies
import React, { useState } from "react";
import { es } from "react-day-picker/locale";
// Components
import { DayPicker } from "react-day-picker";
// Styles
import "react-day-picker/style.css";

const hiddenDays = [
  new Date(2025, 8, 7),
  new Date(2025, 8, 14),
  new Date(2025, 8, 21),
  new Date(2025, 8, 28),
];

const daysWithAvailability = [
  new Date(2026, 3, 26),
  new Date(2026, 3, 27),
  new Date(2026, 3, 28),
];

const daysWithoutAvailability = [new Date(2026, 3, 29), new Date(2026, 3, 30)];

export default function Calendar() {
  const [selected, setSelected] = useState<Date>();

  return (
    <div className="w-full flex items-center justify-center">
      <DayPicker
        locale={es}
        animate
        today={new Date()}
        modifiers={{
          available: daysWithAvailability,
          unavailable: daysWithoutAvailability,
        }}
        modifiersClassNames={{
          available:
            "relative after:content-[''] after:absolute after:-top-0.5 after:-right-0.5 after:w-2.5 after:h-2.5 after:bg-green-500 after:rounded-full after:border-2 after:border-white after:z-10",
          unavailable:
            "relative after:content-[''] after:absolute after:-top-0.5 after:-right-0.5 after:w-2.5 after:h-2.5 after:bg-red-500 after:rounded-full after:border-2 after:border-white after:z-10",
        }}
        classNames={{
          weekdays: "border-b border-border",
          weekday:
            "text-xs font-medium text-muted-foreground px-2 py-2 text-center",
          row: "border-b border-border last:border-0",
          day: "w-9 h-9 mx-auto rounded-full text-sm hover:bg-muted transition-colors",
          selected:
            "bg-primary text-primary-foreground hover:bg-primary/90 rounded-full",
          today:
            "bg-muted text-foreground font-semibold rounded-full flex items-center justify-center",
          outside: "text-muted-foreground opacity-40",
          disabled: "text-muted-foreground opacity-30 cursor-not-allowed",
          button_previous:
            "text-muted-foreground hover:text-foreground hover:bg-muted rounded-full p-2 transition-colors",
          button_next:
            "text-muted-foreground hover:text-foreground hover:bg-muted rounded-full p-2 transition-colors",
          chevron: "fill-muted-foreground",
          month: "text-foreground font-semibold",
        }}
        disabled={[{ before: new Date() }, ...hiddenDays]}
        timeZone="America/Mexico_City"
        mode="single"
        selected={selected}
        onSelect={setSelected}
      />
    </div>
  );
}
