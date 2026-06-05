import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface BookingStepBarProps {
  currentStep: 1 | 2 | 3;
}

function StepItem({
  step,
  label,
  currentStep,
}: {
  step: number;
  label: string;
  currentStep: number;
}) {
  const isCompleted = step < currentStep;
  const isCurrent = step === currentStep;

  return (
    <div className="flex items-center gap-2 shrink-0">
      <div
        className={cn(
          "size-7 rounded-full flex items-center justify-center text-xs font-semibold border-2 transition-all duration-200",
          isCompleted
            ? "bg-primary border-primary text-primary-foreground shadow-sm"
            : isCurrent
              ? "border-primary text-primary bg-primary/5"
              : "border-border/50 text-muted-foreground/50",
        )}
      >
        {isCompleted ? <Check className="size-3" /> : step}
      </div>
      <span
        className={cn(
          "text-sm font-medium hidden sm:block transition-colors",
          isCurrent
            ? "text-foreground"
            : isCompleted
              ? "text-primary"
              : "text-muted-foreground/40",
        )}
      >
        {label}
      </span>
    </div>
  );
}

export default function BookingStepBar({ currentStep }: BookingStepBarProps) {
  return (
    <div className="flex items-center gap-3 w-full mb-8 bg-card border border-border/60 rounded-2xl px-5 py-3.5 shadow-sm">
      <StepItem step={1} label="Servicios" currentStep={currentStep} />
      <div
        className={cn(
          "flex-1 h-px transition-colors duration-300",
          currentStep > 1 ? "bg-primary" : "bg-border/50",
        )}
      />
      <StepItem step={2} label="Horario" currentStep={currentStep} />
      <div
        className={cn(
          "flex-1 h-px transition-colors duration-300",
          currentStep > 2 ? "bg-primary" : "bg-border/50",
        )}
      />
      <StepItem step={3} label="Tus datos" currentStep={currentStep} />
    </div>
  );
}
