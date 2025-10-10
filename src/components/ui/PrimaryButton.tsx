// Dependencies
import * as React from "react";
// Components
import { Button } from "./button";

interface PrimaryButtonProps extends React.ComponentProps<"button"> {
  children?: React.ReactNode | React.JSX.Element;
  onClick?: () => void;
  className?: string;
  asChild?: boolean;
}

export default function PrimaryButton({
  children,
  onClick,
  className,
  ...props
}: PrimaryButtonProps) {
  return (
    <Button
      variant="outline"
      className={`bg-primary text-secondary hover:bg-primary/20 hover:text-primary font-semibold hover:cursor-pointer hover:shadow-lg ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </Button>
  );
}
