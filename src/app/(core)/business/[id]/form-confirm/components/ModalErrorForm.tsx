// Components
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  Dialog,
  DialogDescription,
} from "@/components/ui/dialog";
// Icons
import { CircleX } from "lucide-react";

export default function ModalErrorForm() {
  return (
    <Dialog open={false}>
      <DialogContent className="" showCloseButton={false}>
        <DialogHeader className="flex flex-col items-center gap-4 bg-red-500/10 p-2 rounded-lg">
          <CircleX size={48} color="red" />
          <DialogTitle>¡Error de Reservación!</DialogTitle>
          <DialogDescription>
            ¡Lo sentimos! Ha ocurrido un error al procesar tu reservación. Por
            favor, intenta nuevamente más tarde.
          </DialogDescription>
          <Button
            variant="outline"
            size="lg"
            onClick={() => {}}
            className="mt-2 bg-white hover:bg-red-500/20 "
          >
            Cerrar
          </Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
