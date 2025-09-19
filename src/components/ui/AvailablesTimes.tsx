import React from "react";
import { Card } from "./card";
import { Button } from "./button";

export default function AvailablesTimes() {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 ">
      <h2 className="text-lg md:text-xl  text-center text-pink-400 font-medium">
        Horarios disponibles
      </h2>
      <div className="w-full grid grid-cols-1 gap-2">
        <Card className="border p-4 bg-pink-50">
          <div className="flex flex-col">
            <span className="font-medium text-pink-600 mb-2">
              Lunes, 1 de Enero de 2024
            </span>
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 9 }).map((_, index) => (
                <button
                  key={index}
                  className="px-3 py-2 bg-white border border-pink-300 rounded-md text-sm text-pink-600 hover:bg-pink-100 transition"
                >
                  {9 + index}:00 AM
                </button>
              ))}
            </div>
          </div>
        </Card>
        <Button className="border p-4 bg-pink-600">Reservar</Button>
      </div>
    </div>
  );
}
