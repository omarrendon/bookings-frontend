"use client";
// Dependencies
import { useState } from "react";
// Components
import CustomModal from "@/components/ui/CustomModal";
import FilterReservations from "./components/FilterReservations";
import { DataTable } from "@/components/ui/DataTable";
import { ColumnsReservationTable } from "./components/ColumnsReservationTable";
// Icons
import { BadgeAlert, BadgeCheck, BadgeX } from "lucide-react";

export default function ReservationsPage() {
  const [isOpenModalConfirmation, setIsOpenModalConfirmation] = useState(false);
  const [isOpenModalCancellation, setIsOpenModalCancellation] = useState(false);
  const [isOpenModalReschedule, setIsOpenModalReschedule] = useState(false);

  return (
    <div className="flex w-full flex-col gap-6 ">
      <FilterReservations />
      <DataTable columns={ColumnsReservationTable} />
      <CustomModal
        isOpen={isOpenModalConfirmation}
        onClose={() => setIsOpenModalConfirmation(!isOpenModalConfirmation)}
        icon={<BadgeCheck className="text-primary" size={50} />}
        title="Confirmación de cita"
        description={
          "Al confirmar, se le estará notificando al cliente sobre la cita."
        }
        onConfirm={() => {
          console.log("Confirmed");
        }}
        cancelBtnLabel={"Cancelar"}
        actionBtnLabel={"Confirmar cita"}
      />
      <CustomModal
        isOpen={isOpenModalConfirmation}
        onClose={() => setIsOpenModalConfirmation(!isOpenModalConfirmation)}
        icon={<BadgeCheck className="text-primary" size={50} />}
        title="Confirmación de cita"
        description={
          "Al confirmar, se le estará notificando al cliente sobre la cita."
        }
        onConfirm={() => {
          console.log("Confirmed");
        }}
        cancelBtnLabel={"Cancelar"}
        actionBtnLabel={"Confirmar cita"}
      />
      <CustomModal
        isOpen={isOpenModalCancellation}
        onClose={() => setIsOpenModalCancellation(!isOpenModalCancellation)}
        icon={<BadgeX className="text-primary" size={50} />}
        title="Cancelar cita"
        description={
          "¿Estás seguro de que deseas cancelar esta cita? Esta acción no se puede deshacer."
        }
        onConfirm={() => {
          console.log("Cancelled");
        }}
        cancelBtnLabel={"Volver"}
        actionBtnLabel={"Aceptar"}
      />
      <CustomModal
        isOpen={isOpenModalReschedule}
        onClose={() => setIsOpenModalReschedule(!isOpenModalReschedule)}
        icon={<BadgeAlert className="text-primary" size={50} />}
        title="Reprogramar cita"
        description={
          "¿Estás seguro de que deseas reprogramar esta cita? Se le notificará al cliente sobre el cambio."
        }
        onConfirm={() => {
          console.log("Rescheduled");
        }}
        cancelBtnLabel={"Cancelar"}
        actionBtnLabel={"Aceptar"}
      />
    </div>
  );
}
