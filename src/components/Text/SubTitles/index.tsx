import React from "react";

interface SubTitleProps {
  children: React.ReactNode;
}

export default function SubTitle({ children }: SubTitleProps) {
  return <h2 className="text-black text-xl">{children}</h2>;
}
