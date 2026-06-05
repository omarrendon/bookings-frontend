"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import CustomModal from "@/components/ui/CustomModal";
import FilterReservations from "./components/FilterReservations";
import { DataTable } from "@/components/ui/DataTable";
import { ColumnsReservationTable } from "./components/ColumnsReservationTable";
import { reservationData } from "./components/data";
import {
  BadgeCheck,
  BadgeX,
  CalendarCheck,
  CalendarClock,
  CheckCircle2,
  Clock4,
  XCircle,
} from "lucide-react";

const stats = {
  total: reservationData.length,
  confirmed: reservationData.filter(r => r.status === "confirmed").length,
  pending: reservationData.filter(r => r.status === "pending").length,
  canceled: reservationData.filter(r => r.status === "canceled").length,
  completed: reservationData.filter(r => r.status === "completed").length,
};

export default function ReservationsPage() {
  const [isOpenModalConfirmation, setIsOpenModalConfirmation] = useState(false);
  const [isOpenModalCancellation, setIsOpenModalCancellation] = useState(false);
  const [isOpenModalReschedule, setIsOpenModalReschedule] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div className="flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
          <CalendarCheck className="size-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Reservas</h1>
          <p className="text-sm text-muted-foreground">
            Gestiona y monitorea todas las reservaciones de tu negocio
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="border-border/60 bg-card shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Total
                </p>
                <p className="text-2xl font-bold mt-1">{stats.total}</p>
              </div>
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <CalendarCheck className="size-4 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-card shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Confirmadas
                </p>
                <p className="text-2xl font-bold mt-1 text-primary">{stats.confirmed}</p>
              </div>
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <CheckCircle2 className="size-4 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-card shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Pendientes
                </p>
                <p className="text-2xl font-bold mt-1 text-amber-600">{stats.pending}</p>
              </div>
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/10">
                <Clock4 className="size-4 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-card shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Canceladas
                </p>
                <p className="text-2xl font-bold mt-1 text-destructive">{stats.canceled}</p>
              </div>
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-destructive/10">
                <XCircle className="size-4 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters — card padding reduces to py-4 so it doesn't add dead space when collapsed */}
      <Card className="border-border/60 bg-card shadow-sm">
        <CardContent className="px-5 py-4">
          <FilterReservations />
        </CardContent>
      </Card>

      {/* Table */}
      <DataTable columns={ColumnsReservationTable} />

      {/* Modals */}
      <CustomModal
        isOpen={isOpenModalConfirmation}
        onClose={() => setIsOpenModalConfirmation(false)}
        icon={<BadgeCheck className="text-primary" size={50} />}
        title="Confirmación de cita"
        description="Al confirmar, se le estará notificando al cliente sobre la cita."
        onConfirm={() => {
          console.log("Confirmed");
          setIsOpenModalConfirmation(false);
        }}
        cancelBtnLabel="Cancelar"
        actionBtnLabel="Confirmar cita"
      />
      <CustomModal
        isOpen={isOpenModalCancellation}
        onClose={() => setIsOpenModalCancellation(false)}
        icon={<BadgeX className="text-destructive" size={50} />}
        title="Cancelar cita"
        description="¿Estás seguro de que deseas cancelar esta cita? Esta acción no se puede deshacer."
        onConfirm={() => {
          console.log("Cancelled");
          setIsOpenModalCancellation(false);
        }}
        cancelBtnLabel="Volver"
        actionBtnLabel="Cancelar cita"
      />
      <CustomModal
        isOpen={isOpenModalReschedule}
        onClose={() => setIsOpenModalReschedule(false)}
        icon={<CalendarClock className="text-violet-600" size={50} />}
        title="Reprogramar cita"
        description="¿Estás seguro de que deseas reprogramar esta cita? Se le notificará al cliente sobre el cambio."
        onConfirm={() => {
          console.log("Rescheduled");
          setIsOpenModalReschedule(false);
        }}
        cancelBtnLabel="Cancelar"
        actionBtnLabel="Reprogramar cita"
      />
    </div>
  );
}
