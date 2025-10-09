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

interface CustomModalProps {
  isOpen: boolean;
  title: string;
  icon?: React.ReactNode | React.JSX.Element;
  description: string;
  actionBtnLabel?: string;
  cancelBtnLabel?: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function CustomModal({
  isOpen,
  onClose,
  onConfirm,
  icon,
  title,
  description,
  actionBtnLabel = "Aceptar",
  cancelBtnLabel = "Cancelar",
}: CustomModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose} modal>
      <DialogContent>
        <DialogHeader className="flex flex-col items-center gap-2 p-2">
          {icon && <div className="mb-2">{icon}</div>}
          <DialogTitle className="text-center text-xl font-semibold">
            {title}
          </DialogTitle>
          <DialogDescription className="text-center text-md">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end">
          <Button
            variant="outline"
            className="mr-2 text-primary font-semibold hover:cursor-pointer"
            onClick={onClose}
          >
            {cancelBtnLabel}
          </Button>
          <Button
            variant="outline"
            onClick={onConfirm}
            className="bg-primary text-secondary hover:bg-primary/9 font-semibold hover:cursor-pointer hover:text-primary"
          >
            {actionBtnLabel}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
