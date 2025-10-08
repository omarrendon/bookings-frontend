export interface Reservation {
  id: string;
  customerName: string;
  reservationDate: string;
  customerPhone: string;
  customerEmail: string;
  status: "pending" | "confirmed" | "canceled" | "completed" | "rescheduled";
  startTime: string;
  endTime: string;
  proofOfPayment: boolean;
}
