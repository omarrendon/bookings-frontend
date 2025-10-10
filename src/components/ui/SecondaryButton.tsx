// Dependencies
import React from "react";
// Components
import { Button } from "./button";

interface SecondaryButtonProps extends React.ComponentProps<"button"> {
  children?: React.ReactNode | React.JSX.Element;
  onClick?: () => void;
  className?: string;
  asChild?: boolean;
}

export default function SecondaryButton({
  children,
  onClick,
  className,
  ...props
}: SecondaryButtonProps) {
  return (
    <Button
      className={`bg-secondary text-primary hover:bg-secondary/20 hover:text-primary font-semibold hover:cursor-pointer hover:shadow-lg ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </Button>
  );
}
