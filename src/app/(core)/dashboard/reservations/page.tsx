// Components
import FilterReservations from "./components/FilterReservations";
import { DataTable } from "@/components/ui/DataTable";
import { ColumnsTable } from "./components/ColumnsTable";

export default function ReservationsPage() {
  return (
    <div className="flex w-full flex-col gap-6 ">
      <FilterReservations />
      <DataTable columns={ColumnsTable} />
    </div>
  );
}
