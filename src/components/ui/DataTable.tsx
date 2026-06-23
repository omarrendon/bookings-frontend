"use client";
import { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
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
import { Skeleton } from "@/components/ui/skeleton";
import { DataTablePagination } from "./DataTablePagination";
import { CalendarX } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading = false,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    getPaginationRowModel: getPaginationRowModel(),
    state: { rowSelection },
    initialState: { pagination: { pageSize: 10 } },
  });

  if (isLoading) {
    return (
      <div className="rounded-xl border border-border/60 overflow-hidden">
        {/* Skeleton header */}
        <div className="bg-muted/30 border-b border-border/60 px-4 py-3 flex items-center gap-4">
          <Skeleton className="size-4 rounded" />
          <Skeleton className="h-3.5 w-24" />
          <Skeleton className="h-3.5 w-20" />
          <Skeleton className="h-3.5 w-16 hidden lg:block" />
          <Skeleton className="h-3.5 w-10" />
          <Skeleton className="h-3.5 w-12" />
          <Skeleton className="h-3.5 w-8 ml-auto" />
        </div>
        {/* Skeleton rows */}
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="px-4 py-3.5 border-b border-border/40 last:border-0 flex items-center gap-4 animate-pulse"
          >
            <Skeleton className="size-4 rounded" />
            <div className="flex items-center gap-2.5 flex-1 min-w-0">
              <Skeleton className="size-8 rounded-full shrink-0" />
              <div className="space-y-1.5 flex-1 min-w-0">
                <Skeleton className="h-3.5 w-28" />
                <Skeleton className="h-3 w-40" />
              </div>
            </div>
            <div className="space-y-1.5 w-24 shrink-0">
              <Skeleton className="h-3.5 w-20" />
              <Skeleton className="h-3 w-24" />
            </div>
            <Skeleton className="h-3.5 w-24 hidden lg:block shrink-0" />
            <Skeleton className="h-5 w-14 rounded-full shrink-0" />
            <Skeleton className="h-5 w-20 rounded-full shrink-0" />
            <Skeleton className="size-8 rounded-md shrink-0" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-border/60 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow
                  key={headerGroup.id}
                  className="bg-muted/30 hover:bg-muted/30 border-border/60"
                >
                  {headerGroup.headers.map(header => (
                    <TableHead
                      key={header.id}
                      className={`h-10 px-4 ${(header.column.columnDef.meta as { className?: string })?.className ?? ""}`}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map(row => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="hover:bg-muted/20 transition-colors border-border/40"
                  >
                    {row.getVisibleCells().map(cell => (
                      <TableCell
                        key={cell.id}
                        className={`px-4 py-3 ${(cell.column.columnDef.meta as { className?: string })?.className ?? ""}`}
                      >
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
                  <TableCell colSpan={columns.length} className="h-64 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="rounded-full bg-muted p-4">
                        <CalendarX className="size-8 text-muted-foreground" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium">No se encontraron reservas</p>
                        <p className="text-sm text-muted-foreground max-w-xs">
                          Intenta ajustar los filtros para encontrar lo que buscas.
                        </p>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
