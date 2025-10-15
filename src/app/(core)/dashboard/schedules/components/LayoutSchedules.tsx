import CalendarRow from "@/components/ui/CalendarRow";
import SubTitle from "@/components/ui/SubTitle";
import Text from "@/components/ui/Text";
import React from "react";

export default function LayoutSchedules() {
  return (
    <div className="flex flex-col w-full justify-start">
      <Text text="Hoy" />
      <SubTitle text="15 de Octubre, 2025" />
      <div className="mt-2 flex flex-col gap-4">
        <CalendarRow />
      </div>
    </div>
  );
}
