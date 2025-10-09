// Components
import { Table } from "@tanstack/react-table";
import { Button } from "../ui/button";
// Icons
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronUp,
} from "lucide-react";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <>
      <div className="flex-1 text-sm text-muted-foreground hidden md:block mt-4">
        {table.getFilteredSelectedRowModel().rows.length} de{" "}
        {table.getFilteredRowModel().rows.length} fila(s) seleccionada(s).
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8 text-muted-foreground">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Filas por página</p>
          <p>{`${table.getState().pagination.pageSize}`}</p>
          <div className="flex-col">
            {/* Stop rows per page count if there is no more data */}
            <ChevronUp
              onClick={
                !table.getCanNextPage()
                  ? undefined
                  : () => {
                      if (table.getState().pagination.pageSize <= 1) {
                        table.setPageSize(5);
                      } else {
                        table.setPageSize(
                          table.getState().pagination.pageSize + 5
                        );
                      }
                    }
              }
            ></ChevronUp>
            <ChevronDown
              onClick={() => {
                table.setPageSize(table.getState().pagination.pageSize - 5);
              }}
            ></ChevronDown>
          </div>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Página {table.getState().pagination.pageIndex + 1} de{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Ir a la primera página</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Ir a la página anterior</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Ir a la página siguiente</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Ir a la última página</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
}
