// Components
import Title from "@/components/ui/Title";
import LayoutSchedules from "./components/LayoutSchedules";
import LayoutCalendar from "./components/LayoutCalendar";

export default function SchedulePage() {
  return (
    <div className="flex w-full flex-col gap-6 ">
      <Title text="Mis Horarios" />
      <div className="grid h-full w-full grid-cols-1 gap-4 md:grid-cols-12">
        <div className="md:col-span-8 ">
          <LayoutSchedules />
        </div>
        <div className="md:col-span-4 border shadow-sm rounded-lg">
          <LayoutCalendar />
        </div>
      </div>
    </div>
  );
}
