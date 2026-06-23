"use client";
import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import FilterReservations from "./components/FilterReservations";
import { DataTable } from "@/components/ui/DataTable";
import { createReservationColumns } from "./components/ColumnsReservationTable";
import ReservationMobileList from "./components/ReservationMobileList";
import ReservationDetailModal from "./components/ReservationDetailModal";
import { useGetReservations, useUpdateReservationStatus } from "@/hooks/useReservations";
import { useBusinessStore } from "@/store/business.store";
import type { Reservation } from "@/lib/api/types";
import {
  CalendarCheck,
  CheckCircle2,
  Clock4,
  XCircle,
} from "lucide-react";

export default function ReservationsPage() {
  const businessId = useBusinessStore(s => s.business?.id ?? "");

  const [detailReservation, setDetailReservation] = useState<Reservation | null>(null);

  const { data: reservations = [], isLoading } = useGetReservations(businessId);
  const { mutate: updateStatus } = useUpdateReservationStatus(businessId);

  const columns = useMemo(
    () =>
      createReservationColumns(
        (reservationId, status) => updateStatus({ reservationId, status }),
        (reservation) => setDetailReservation(reservation),
      ),
    [updateStatus],
  );

  const stats = {
    total: reservations.length,
    confirmed: reservations.filter(r => r.status === "confirmed").length,
    pending: reservations.filter(r => r.status === "pending").length,
    cancelled: reservations.filter(r => r.status === "cancelled").length,
  };

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
                <p className="text-2xl font-bold mt-1 text-primary">
                  {stats.confirmed}
                </p>
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
                <p className="text-2xl font-bold mt-1 text-amber-600">
                  {stats.pending}
                </p>
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
                <p className="text-2xl font-bold mt-1 text-destructive">
                  {stats.cancelled}
                </p>
              </div>
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-destructive/10">
                <XCircle className="size-4 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-border/60 bg-card shadow-sm">
        <CardContent className="px-5 py-4">
          <FilterReservations />
        </CardContent>
      </Card>

      {/* Mobile list (< md) */}
      <ReservationMobileList
        reservations={reservations}
        businessId={businessId}
        isLoading={isLoading}
      />

      {/* Desktop table (≥ md) */}
      <div className="hidden md:block">
        <DataTable
          columns={columns}
          data={reservations}
          isLoading={isLoading}
        />
      </div>

      {/* Detail modal — desktop */}
      <ReservationDetailModal
        reservation={detailReservation}
        businessId={businessId}
        onClose={() => setDetailReservation(null)}
      />
    </div>
  );
}
