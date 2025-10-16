// Components
import CalendarRow from "@/components/ui/CalendarRow";

export default function LayoutSchedules() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <CalendarRow />
      </div>
    </div>
  );
}
