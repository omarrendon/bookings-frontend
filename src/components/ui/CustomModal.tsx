// Components
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  Dialog,
  DialogDescription,
} from "@/components/ui/dialog";
import SecondaryButton from "./SecondaryButton";
import PrimaryButton from "./PrimaryButton";

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
        <div className="flex justify-center ">
          <SecondaryButton className="mr-2" onClick={onClose}>
            {cancelBtnLabel}
          </SecondaryButton>
          <PrimaryButton onClick={onConfirm}>{actionBtnLabel}</PrimaryButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}
