import React from "react";

export default function ErrorMessage({ children }: any) {
  return <p className="text-red-500 text-xs mt-1">{children}</p>;
}
