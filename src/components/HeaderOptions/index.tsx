import React from "react";

interface Props {
  children: React.ReactNode;
  onClick?: any;
}

export default function HeaderOptions({ children, onClick }: Props) {
  return (
    <div
      className="w-full cursor-pointer hover:bg-gray-950 hover:text-primary rounded-md py-2 px-4 text-gray-200"
      onClick={onClick}
    >
      <p>{children}</p>
    </div>
  );
}
