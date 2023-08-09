import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function ErrorMessage({ children }: Props) {
  return <p className="text-red-500 text-xs mt-1">{children}</p>;
}
