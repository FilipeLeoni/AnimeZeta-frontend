import React from "react";

export default function SecondaryButton({
  children,
  icon: Icon,
  onClick,
}: any) {
  return (
    <button
      className="flex justify-center items-center px-4 py-2 border border-red-700 rounded-lg gap-4 text-red-700"
      onClick={onClick}
    >
      <Icon size={28} weight="fill" />
      {children}
    </button>
  );
}
