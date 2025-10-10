import React from "react";

interface TitleProps {
  text?: string;
  className?: string;
}
export default function Title({ text, className }: TitleProps) {
  return (
    <h2 className={`text-xl font-bold text-primary ${className}`}>{text}</h2>
  );
}
