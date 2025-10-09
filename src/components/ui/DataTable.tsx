"use client";
// Dependencies
import { useEffect, useState } from "react";
// Components
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "./DataTablePagination";
// Types
import { Reservation } from "@/types/Reservation";
// Data
import { reservationData } from "@/app/(core)/dashboard/reservations/components/data";

async function getData(): Promise<Reservation[]> {
  // Fetch data from your API here and return it.
  return reservationData; // Simply returning fake data
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  // data: TData[];
  // table: TanstackTable<TData>; //HERE
}

export function DataTable<TData, TValue>({
  columns,
}: // data,
DataTableProps<TData, TValue>) {
  //STATES:
  const [dataTable, setDataTable] = useState<TData[]>([]);
  const [loading, setLoading] = useState(true);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: dataTable,
    columns,
    getCoreRowModel: getCoreRowModel(),
    //row selection
    onRowSelectionChange: setRowSelection,
    //sorting:
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      rowSelection,
    },
    //pagination:
    getPaginationRowModel: getPaginationRowModel(),
    //Control pagination. Default is 10
    initialState: {
      pagination: { pageSize: 10 },
    },
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getData();
        setDataTable(result as TData[]);
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
    <div>
      <div className="border rounded-xl shadow">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id} className="bg-muted/50">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  className=""
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No se encontraron datos.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end ">
        <DataTablePagination table={table}></DataTablePagination>
      </div>
    </div>
  );
}
