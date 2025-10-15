import React from "react";

interface TextProps {
  text: string;
  className?: string;
}

export default function Text({ text, className }: TextProps) {
  return <span className={`text-md text-gray-600 ${className}`}>{text}</span>;
}
