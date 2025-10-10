import React from "react";

interface SubTitleProps {
  text?: string;
  className?: string;
}

export default function SubTitle({ text, className }: SubTitleProps) {
  return (
    <h2 className={`text-lg font-semibold text-gray-700 ${className}`}>
      {text}
    </h2>
  );
}
