// Components
import CalendarRow from "@/components/ui/CalendarRow";
import ScheduleManager from "@/components/ui/ScheduleManager";

export default function LayoutSchedules() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <CalendarRow />
        <ScheduleManager />
      </div>
    </div>
  );
}
