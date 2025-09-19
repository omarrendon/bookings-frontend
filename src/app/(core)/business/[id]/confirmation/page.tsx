// Icons
import { CircleCheck } from "lucide-react";

export default function page() {
  return (
    <div className="w-full flex flex-col my-10 px-4">
      <div>
        <CircleCheck size={64} color="green" />
        <h2>¡Reservación Confirmada!</h2>
      </div>
    </div>
  );
}
