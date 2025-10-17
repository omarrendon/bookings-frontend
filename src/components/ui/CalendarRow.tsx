"use client";
// Dependencies
import { useState } from "react";
// Components
import Text from "./Text";
import Title from "./Title";
import SubTitle from "./SubTitle";
// Utils
import { getFormattedLocalDate } from "@/utils/dates/utils";
// Icons
import { ChevronLeft, ChevronRight } from "lucide-react";

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

  const currentDayInfo = getFormattedLocalDate(new Date().toISOString());

  const getWeekDays = (date: Date) => {
    const currentDate = new Date(date);
    const first = currentDate.getDate() - currentDate.getDay();

    const week = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(currentDate);
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

  const isSameDay = (firstDate: Date, secondDate: Date) => {
    return (
      firstDate.getDate() === secondDate.getDate() &&
      firstDate.getMonth() === secondDate.getMonth() &&
      firstDate.getFullYear() === secondDate.getFullYear()
    );
  };

  const isToday = (date: Date) => isSameDay(date, new Date());

  return (
    <div className="flex flex-col bg-white rounded-2xl shadow-xl p-4 md:p-6 w-full gap-3 md:gap-6">
      <div className=" flex flex-col items-start gap-1">
        <Title text="Hoy" className="!text-2xl !font-bold" />
        <SubTitle text={currentDayInfo} />
      </div>
      <div className="flex items-center justify-between md:gap-2">
        <div className="md:p-2 hover:bg-gray-100 rounded-full transition-colors hover:cursor-pointer">
          <ChevronLeft
            onClick={goToPreviousWeek}
            className="w-6 h-6 text-gray-600"
          />
        </div>

        <div className="flex-1 grid grid-cols-7 gap-2">
          {weekDays.map((day, index) => {
            const isSelected = isSameDay(day, selectedDate);
            const isTodayDate = isToday(day);

            return (
              <div key={index} className="flex flex-col items-center">
                <span className="text-sm font-medium text-gray-500 mb-2">
                  {daysOfWeek[day.getDay()]}
                </span>
                <button
                  onClick={() => setSelectedDate(day)}
                  className={`w-8 md:w-12 h-8 md:h-12 rounded-full flex items-center justify-center text-lg font-semibold transition-all ${
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

        <div className="md:p-2 hover:bg-gray-100 rounded-full transition-colors hover:cursor-pointer">
          <ChevronRight
            onClick={goToNextWeek}
            className="w-6 h-6 text-gray-600"
          />
        </div>
      </div>

      <div className="text-center">
        <Text
          text={`${
            monthNames[weekDays[3].getMonth()]
          } ${weekDays[3].getFullYear()}`}
        />
      </div>

      {selectedDate && (
        <div className=" p-4 bg-purple-50 rounded-lg">
          <Text text="Fecha seleccionada" />
          <Title
            text={`${selectedDate.getDate()} de ${
              monthNames[selectedDate.getMonth()]
            } de ${selectedDate.getFullYear()}`}
          />
        </div>
      )}
    </div>
  );
}
