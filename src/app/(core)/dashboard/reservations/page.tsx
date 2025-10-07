// Components
import FilterReservations from "./components/FilterReservations";

export default function ReservationsPage() {
  return (
    <div className="flex w-full flex-col gap-4 md:gap-6 lg:gap-8">
      <FilterReservations />
      <div className="w-full ">ReservationsPage</div>
    </div>
  );
}
