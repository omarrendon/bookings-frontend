"use client";
// Dependencies
import { useEffect, useState } from "react";
// Components
import { DataTable } from "@/components/ui/DataTable";
import FilterReservations from "./components/FilterReservations";
import { ColumnsTable } from "./components/ColumnsTable";
import { reservationData } from "./components/data";
// Types
import { Reservation } from "@/types/Reservation";

async function getData(): Promise<Reservation[]> {
  // Fetch data from your API here and return it.
  return reservationData; // Simply returning fake data
}

export default function ReservationsPage() {
  const [data, setData] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const result: Reservation[] = await getData();
        setData(result);
      } catch (error) {
        // Handle error
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    // Render a loading indicator or message
    return <div>Loading...</div>;
  }

  return (
    <div className="flex w-full flex-col gap-6 ">
      <FilterReservations />
      <DataTable columns={ColumnsTable} data={data} />
    </div>
  );
}
