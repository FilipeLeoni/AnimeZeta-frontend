import { Nunito, Ubuntu } from "next/font/google";
import React from "react";

interface SubTitleProps {
  children: React.ReactNode;
}

export default function SubTitle({ children }: SubTitleProps) {
  return (
    <h2 className="text-grayDark text-xl flex items-center gap-2 font-medium">
      {children}
    </h2>
  );
}
