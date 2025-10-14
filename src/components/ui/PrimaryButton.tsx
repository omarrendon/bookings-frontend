// Dependencies
import * as React from "react";
// Components
import { Button } from "./button";

interface PrimaryButtonProps extends React.ComponentProps<"button"> {
  children?: React.ReactNode | React.JSX.Element;
  onClick?: () => void;
  className?: string;
  asChild?: boolean;
  size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg" | null;
  type?: "button" | "submit" | "reset";
}

export default function PrimaryButton({
  children,
  onClick,
  className,
  type,
  size,
  ...props
}: PrimaryButtonProps) {
  const handleClick = type === "submit" ? undefined : onClick;

  return (
    <Button
      variant="outline"
      className={`bg-primary text-secondary hover:bg-primary/20 hover:text-primary font-semibold hover:cursor-pointer hover:shadow-lg ${className}`}
      onClick={handleClick}
      type={type}
      size={size}
      {...props}
    >
      {children}
    </Button>
  );
}
