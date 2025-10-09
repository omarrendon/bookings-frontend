"use client";
// Dependencies
import { useState } from "react";
// Components
import Calendar from "@/components/ui/Calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// Icons
import { ChevronDownIcon } from "lucide-react";

export default function FilterReservations() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold mb-2 text-primary">
        Filtros de búsqueda
      </h2>
      <div className="flex flex-col xl:flex-row gap-4">
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date"
              className="w-full xl:w-78 justify-between font-normal"
            >
              {date ? date.toLocaleDateString() : "Buscar por fecha"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-2" align="start">
            <Calendar />
          </PopoverContent>
        </Popover>
        <Input type="text" placeholder="Nombre" />
        <Input type="text" placeholder="Email" />
        <Input type="text" placeholder="Número de teléfono" />
      </div>
      <div className="flex justify-end mt-4 sm:space-x-2 space-y-2 sm:space-y-0 flex-col sm:flex-row">
        <Button variant="outline" className="mr-2">
          Limpiar Campos
        </Button>
        <Button variant="outline">Buscar</Button>
      </div>
    </div>
  );
}
