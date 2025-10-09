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
import { Checkbox } from "@/components/ui/checkbox";
import { BadgeCheck, BadgeX } from "lucide-react";

export const ColumnsTable: ColumnDef<Reservation>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
        <div className="flex justify-start items-center gap-2">
          {proofOfPayment ? (
            <BadgeCheck color="green" />
          ) : (
            <BadgeX color="red" />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <div className="flex justify-between  text-center">
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
              className={`${colors[status]} text-white justify-center w-[100px] p-1`}
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
  // {
  //   id: "actions",
  //   header: "Acciones",
  //   cell: ({ row }) => {
  //     const reservation = row.original;
  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="w-8 h-8 p-0">
  //             <MoreHorizontal />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Acciones</DropdownMenuLabel>
  //           <DropdownMenuItem
  //             onClick={() => navigator.clipboard.writeText(reservation.id)}
  //           >
  //             Copiar ID de reservación
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem>Ver detalles</DropdownMenuItem>
  //           <DropdownMenuItem>Editar</DropdownMenuItem>
  //           <DropdownMenuItem>Cancelar reservación</DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];
