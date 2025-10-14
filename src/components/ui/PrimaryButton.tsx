// Dependencies
import * as React from "react";
// Components
import { Button } from "./button";

interface PrimaryButtonProps extends React.ComponentProps<"button"> {
  children?: React.ReactNode | React.JSX.Element;
  onClick?: () => void;
  className?: string;
  asChild?: boolean;
  type?: "button" | "submit" | "reset";
}

export default function PrimaryButton({
  children,
  onClick,
  className,
  type,
  ...props
}: PrimaryButtonProps) {
  const handleClick = type === "submit" ? undefined : onClick;

  return (
    <Button
      variant="outline"
      className={`bg-primary text-secondary hover:bg-primary/20 hover:text-primary font-semibold hover:cursor-pointer hover:shadow-lg ${className}`}
      onClick={handleClick}
      type={type}
      {...props}
    >
      {children}
    </Button>
  );
}
