"use client";
// Dependencies
import { ColumnDef } from "@tanstack/react-table";
// Components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
// Types
import { Reservation } from "@/types/Reservation";

export const ColumnsTable: ColumnDef<Reservation>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <div className="flex justify-between py-2 text-left">
          <span className="font-bold">ID</span>
          {/* <ArrowUpDown
            className="w-4 h-4 ml-2 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          /> */}
        </div>
      );
    },
    cell: ({ row }) => {
      const { id } = row.original;
      return <div className="font-medium text-left">{id}</div>;
    },
  },
  {
    accessorKey: "customerName",
    header: ({ column }) => {
      return (
        <div className="flex justify-between py-2 text-left">
          <span className="font-bold">Cliente</span>
        </div>
      );
    },
    cell: ({ row }) => {
      const { customerName } = row.original;
      return <div className="font-medium text-left">{customerName}</div>;
    },
  },
  {
    accessorKey: "reservationDate",
    header: ({ column }) => {
      return (
        <div className="flex justify-between py-2 text-left">
          <span className="font-bold">Fecha</span>
        </div>
      );
    },
    cell: ({ row }) => {
      const { reservationDate } = row.original;
      return <div className="font-medium text-left">{reservationDate}</div>;
    },
  },
  {
    accessorKey: "startTime",
    header: ({ column }) => {
      return (
        <div className="flex justify-between py-2 text-left">
          <span className="font-bold">Hora</span>
        </div>
      );
    },
    cell: ({ row }) => {
      const { startTime, endTime } = row.original;
      return (
        <div className="font-medium text-left">
          {startTime} - {endTime}
        </div>
      );
    },
  },
  {
    accessorKey: "customerPhone",
    header: ({ column }) => {
      return (
        <div className="flex justify-between py-2 text-left">
          <span className="font-bold">Teléfono</span>
        </div>
      );
    },
    cell: ({ row }) => {
      const { customerPhone } = row.original;
      return <div className="font-medium text-left">{customerPhone}</div>;
    },
  },
  {
    accessorKey: "customerEmail",
    header: ({ column }) => {
      return (
        <div className="flex justify-between py-2 text-left">
          <span className="font-bold">Email</span>
        </div>
      );
    },
    cell: ({ row }) => {
      const { customerEmail } = row.original;
      return <div className="font-medium text-left">{customerEmail}</div>;
    },
  },
  {
    accessorKey: "proofOfPayment",
    header: ({ column }) => {
      return (
        <div className="flex justify-between py-2 text-left">
          <span className="font-bold">Pago</span>
        </div>
      );
    },
    cell: ({ row }) => {
      const { proofOfPayment } = row.original;
      return (
        <div className=" flex justify-center">
          <Badge
            variant="outline"
            className={`${
              proofOfPayment ? "bg-green-500" : "bg-red-600"
            } text-white justify-center p-1 w-full text-center`}
          >
            {proofOfPayment ? "Aprobado" : "Pendiente"}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <div className="flex justify-between py-2 text-left">
          <span className="font-bold">Status</span>
        </div>
      );
    },
    cell: ({ row }) => {
      const { status } = row.original;
      const colors = {
        pending: "bg-yellow-300",
        confirmed: "bg-blue-500",
        canceled: "bg-red-500",
        completed: "bg-green-500",
        rescheduled: "bg-orange-600",
      };

      const labels = {
        pending: "Pendiente",
        confirmed: "Confirmada",
        canceled: "Cancelada",
        completed: "Completada",
        rescheduled: "Reprogramada",
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Badge
              variant="outline"
              className={`${colors[status]} text-white justify-center w-full p-1`}
            >
              <span className="font-bold text-md">{labels[status]}</span>
            </Badge>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              <span className="font-medium text-sm">Cambiar status</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {Object.keys(labels).map(key => (
              <DropdownMenuItem key={key}>
                <Badge
                  variant="outline"
                  className={`${
                    colors[key as keyof typeof colors]
                  } text-white justify-center p-1 w-full text-center`}
                  onClick={() => console.log(key)}
                >
                  <span className="font-bold text-md">
                    {labels[key as keyof typeof labels]}
                  </span>
                </Badge>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
