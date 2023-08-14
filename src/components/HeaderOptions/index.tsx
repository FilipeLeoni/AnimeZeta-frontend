import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function HeaderOptions({ children }: Props) {
  return (
    <div className="w-full cursor-pointer hover:bg-gray-950 hover:text-primary rounded-md py-2 px-4 text-gray-200">
      <p>{children}</p>
    </div>
  );
}
