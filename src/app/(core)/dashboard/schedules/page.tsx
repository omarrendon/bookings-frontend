// Components
import Title from "@/components/ui/Title";
import LayoutSchedules from "./components/LayoutSchedules";
import LayoutCalendar from "./components/LayoutCalendar";

export default function SchedulePage() {
  return (
    <div className="flex w-full flex-col gap-6 ">
      <Title text="Mis Horarios" />
      <div className="w-full flex flex-col">
        <LayoutSchedules />
        {/* <div className="md:col-span-12 lg:col-span-4 border shadow-sm rounded-lg">
          <LayoutCalendar />
        </div> */}
      </div>
    </div>
  );
}
