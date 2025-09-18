// Components
import NavigationBreadCrumb from "@/components/ui/NavigationBreadCrumb";
import CardSummaryServices from "./components/CardSummaryServices";
import SchedulePicker from "./components/SchedulePicker";

interface BusinessSchedulePageProps {
  params: {
    id: string;
  };
}

export default function BusinessSchedulePage({
  params: { id },
}: BusinessSchedulePageProps) {
  return (
    <div className="w-full flex flex-col my-10 px-4">
      <NavigationBreadCrumb url={`/business/${id}`} label="Inicio" id={id} />
      <CardSummaryServices />
      <SchedulePicker />
    </div>
  );
}
