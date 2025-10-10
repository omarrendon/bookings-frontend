import { Button } from "./button";

interface SecondaryButtonProps {
  children?: React.ReactNode | React.JSX.Element;
  onClick?: () => void;
  className?: string;
}

export default function SecondaryButton({
  children,
  onClick,
  className,
}: SecondaryButtonProps) {
  return (
    <Button
      className={`bg-secondary text-primary hover:bg-secondary/20 hover:text-primary font-semibold hover:cursor-pointer hover:shadow-lg ${className}`}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
