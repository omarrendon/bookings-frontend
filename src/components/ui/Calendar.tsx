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

// Días con disponibilidad (ejemplo: días aleatorios de septiembre 2025)
const daysWithAvailability = [
  new Date(2025, 8, 18), // 18 de septiembre
  new Date(2025, 8, 25), // 25 de septiembre
  new Date(2025, 8, 30), // 30 de septiembre
];

// Días sin disponibilidad (badge rojo)
const daysWithoutAvailability = [
  new Date(2025, 8, 19), // 19 de septiembre
  new Date(2025, 8, 20), // 20 de septiembre
  new Date(2025, 8, 22), // 22 de septiembre
  new Date(2025, 8, 23), // 23 de septiembre
  new Date(2025, 8, 24), // 24 de septiembre
  new Date(2025, 8, 26), // 26 de septiembre
  new Date(2025, 8, 27), // 27 de septiembre
  new Date(2025, 8, 29), // 29 de septiembre
  new Date(2025, 8, 30), // 30 de septiembre
];

export default function Calendar() {
  console.log(new Date().toLocaleDateString());
  const [selected, setSelected] = useState<Date>();

  return (
    <div className="w-full flex items-center justify-center ">
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
            "relative after:content-[''] after:absolute after:-top-0.5 after:-right-0.5 after:w-3 after:h-3 after:bg-green-500 after:rounded-full after:border-2 after:border-white after:z-10",
          unavailable:
            "relative after:content-[''] after:absolute after:-top-0.5 after:-right-0.5 after:w-3 after:h-3 after:bg-red-500 after:rounded-full after:border-2 after:border-white after:z-10",
        }}
        classNames={{
          weekdays: "border-b-2 border-pink-300",
          weekday: "text-md font-medium text-gray-700 px-2 py-2 text-center",
          row: "border-b last:border-0",
          day: "w-10 h-10 mx-auto rounded-full text-sm hover:bg-gray-100",
          selected:
            "bg-pink-600 text-white hover:bg-pink-700 focus:bg-pink-700 rounded-full",
          today:
            "bg-pink-100 text-pink-900 font-semibold hover:bg-pink-200 rounded-full justify-center flex items-center",
          outside: "text-gray-400",
          disabled: "text-gray-300 cursor-not-allowed",
          footer: "mt-4 text-center text-sm text-pink-600",
          button_previous:
            "!text-pink-600 hover:text-pink-800 hover:bg-pink-100 rounded-full p-2 transition-colors",
          button_next:
            "text-pink-600 hover:text-pink-800 hover:bg-pink-100 rounded-full p-2 transition-colors",
          chevron: "!fill-pink-600 !text-pink-600",
          month: "text-pink-600",
        }}
        disabled={[{ before: new Date() }, ...hiddenDays]}
        timeZone="America/Mexico_City"
        mode="single"
        selected={selected}
        onDayClick={day => console.log(day)}
        onSelect={setSelected}
        // footer={
        //   selected
        //     ? `Seleccionado: ${selected?.toLocaleDateString()}`
        //     : "Seleccione una fecha."
        // }
      />
    </div>
  );
}
