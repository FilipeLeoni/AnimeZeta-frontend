import React, { FC, ReactNode } from "react";

interface SecondaryButtonProps {
  children: ReactNode;
  icon?: FC<{ size: number }>;
  onClick?: any;
}

export default function SecondaryButton({
  children,
  icon: Icon,
  onClick,
}: SecondaryButtonProps) {
  return (
    <button className="flex justify-center items-center px-4 py-2 border border-red-700 rounded-lg gap-4 text-red-700 hover:bg-red-700 hover:text-white transition-colors duration-300 ease-in-out">
      {Icon && <Icon size={20} />}
      {children}
    </button>
  );
}
