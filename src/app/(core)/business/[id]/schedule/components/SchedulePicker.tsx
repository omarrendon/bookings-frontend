// Components
import AvailablesTimes from "@/components/ui/AvailablesTimes";
import Calendar from "@/components/ui/Calendar";

export default function SchedulePicker() {
  return (
    <div className="w-full h-auto flex flex-col border rounded-lg gap-2">
      <div className="p-4">
        <h2 className="text-lg md:text-xl  text-center text-pink-400 font-medium">
          Selecciona la fecha y hora para su cita
        </h2>
      </div>
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        <div className="flex-1  p-4">
          <Calendar />
        </div>
        <div className="flex-1 p-4">
          <AvailablesTimes />
        </div>
      </div>
    </div>
  );
}
