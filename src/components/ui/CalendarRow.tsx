"use client";
import { useState } from "react";
// Components
import { ChevronLeft, ChevronRight } from "lucide-react";
import SubTitle from "./SubTitle";
import Text from "./Text";
import {
  getFullCalendarDays,
  getListOfDateAndDayOfWeek,
  getNextDays,
  getPreviosDays,
} from "@/utils/dates/utils";

export default function CalendarRow() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const daysOfWeek = ["D", "L", "M", "M", "J", "V", "S"];
  const monthNames = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];

  const getWeekDays = (date: Date) => {
    const curr = new Date(date);

    const first = curr.getDate() - curr.getDay();

    const week = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(curr);
      day.setDate(first + i);
      week.push(day);
    }
    return week;
  };

  const weekDays = getWeekDays(currentDate);

  const goToPreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const isToday = (date: Date) => {
    return isSameDay(date, new Date());
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-2xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">Hoy</h2>
        <p className="text-gray-600">
          {daysOfWeek[new Date().getDay()].toLowerCase() === "d"
            ? "domingo"
            : daysOfWeek[new Date().getDay()].toLowerCase() === "l"
            ? "lunes"
            : daysOfWeek[new Date().getDay()].toLowerCase() === "m" &&
              new Date().getDay() === 2
            ? "martes"
            : daysOfWeek[new Date().getDay()].toLowerCase() === "m" &&
              new Date().getDay() === 3
            ? "miércoles"
            : daysOfWeek[new Date().getDay()].toLowerCase() === "j"
            ? "jueves"
            : daysOfWeek[new Date().getDay()].toLowerCase() === "v"
            ? "viernes"
            : "sábado"}
        </p>
      </div>

      <div className="flex items-center justify-between mb-6">
        <button
          onClick={goToPreviousWeek}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Semana anterior"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>

        <div className="flex-1 grid grid-cols-7 gap-2">
          {weekDays.map((day, index) => {
            const isSelected = isSameDay(day, selectedDate);
            const isTodayDate = isToday(day);

            return (
              <div key={index} className="flex flex-col items-center">
                <div className="text-sm font-medium text-gray-500 mb-2">
                  {daysOfWeek[day.getDay()]}
                </div>
                <button
                  onClick={() => setSelectedDate(day)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold transition-all ${
                    isSelected
                      ? "bg-purple-500 text-white shadow-lg scale-110"
                      : isTodayDate
                      ? "bg-purple-100 text-purple-600 hover:bg-purple-200"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {day.getDate().toString().padStart(2, "0")}
                </button>
              </div>
            );
          })}
        </div>

        <button
          onClick={goToNextWeek}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Semana siguiente"
        >
          <ChevronRight className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      <div className="text-center text-sm text-gray-500 mt-4">
        {monthNames[weekDays[3].getMonth()]} {weekDays[3].getFullYear()}
      </div>

      {selectedDate && (
        <div className="mt-6 p-4 bg-purple-50 rounded-lg">
          <p className="text-sm text-gray-600">Fecha seleccionada:</p>
          <p className="text-lg font-semibold text-purple-600">
            {selectedDate.getDate()} de {monthNames[selectedDate.getMonth()]} de{" "}
            {selectedDate.getFullYear()}
          </p>
        </div>
      )}
    </div>
  );
}
