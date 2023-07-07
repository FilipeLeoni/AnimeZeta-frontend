import React from "react";

export default function HeaderOptions({ children, onClick }: any) {
  return (
    <div
      className="w-full cursor-pointer hover:bg-gray-950 hover:text-primary rounded-md py-2 px-4 text-gray-200"
      onClick={onClick}
    >
      <p>{children}</p>
    </div>
  );
}
