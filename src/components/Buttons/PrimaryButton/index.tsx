import React, { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function PrimaryButton({ children }: Props) {
  return (
    <button className="bg-primary text-grayDark p-2 font-medium text-lg rounded-md hover:bg-yellow-500 transition-all w-full">
      {children}
    </button>
  );
}
