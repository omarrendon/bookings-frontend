import { Button } from "./button";

interface PrincipalButtonProps {
  children?: React.ReactNode | React.JSX.Element;
  onClick?: () => void;
  className?: string;
}

export default function PrincipalButton({
  children,
  onClick,
  className,
}: PrincipalButtonProps) {
  return (
    <Button
      variant="outline"
      className={`bg-primary text-secondary hover:bg-primary/20 hover:text-primary font-semibold hover:cursor-pointer hover:shadow-lg ${className}`}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
