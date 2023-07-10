import React from "react";
import { twMerge } from "tailwind-merge";

export default function PrimaryButton({ children, ...rest }: any) {
  return (
    <button
      className={twMerge(
        "bg-primary text-grayDark p-2 font-medium text-lg rounded-md hover:bg-yellow-500 transition-all w-full",
        rest.className
      )}
    >
      {children}
    </button>
  );
}
