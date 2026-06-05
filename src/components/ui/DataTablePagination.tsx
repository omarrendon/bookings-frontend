import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const selectedCount = table.getFilteredSelectedRowModel().rows.length;
  const totalCount = table.getFilteredRowModel().rows.length;

  return (
    <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 px-1">
      <p className="text-xs text-muted-foreground">
        {selectedCount > 0 ? (
          <>
            <span className="font-medium text-foreground">{selectedCount}</span>
            {" de "}
            <span className="font-medium text-foreground">{totalCount}</span>
            {" seleccionada(s)"}
          </>
        ) : (
          <>
            <span className="font-medium text-foreground">{totalCount}</span>
            {" reserva(s) en total"}
          </>
        )}
      </p>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <p className="text-xs text-muted-foreground whitespace-nowrap">Por página</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={value => table.setPageSize(Number(value))}
          >
            <SelectTrigger className="h-8 w-16 text-xs border-border/60">
              <SelectValue />
            </SelectTrigger>
            <SelectContent side="top">
              {[5, 10, 20, 30].map(size => (
                <SelectItem key={size} value={`${size}`} className="text-xs">
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <span>Página</span>
          <span className="font-medium text-foreground">
            {table.getState().pagination.pageIndex + 1}
          </span>
          <span>de</span>
          <span className="font-medium text-foreground">{table.getPageCount()}</span>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="size-8 border-border/60 hidden sm:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            aria-label="Primera página"
          >
            <ChevronsLeft className="size-3.5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8 border-border/60"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            aria-label="Página anterior"
          >
            <ChevronLeft className="size-3.5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8 border-border/60"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            aria-label="Página siguiente"
          >
            <ChevronRight className="size-3.5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8 border-border/60 hidden sm:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            aria-label="Última página"
          >
            <ChevronsRight className="size-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
