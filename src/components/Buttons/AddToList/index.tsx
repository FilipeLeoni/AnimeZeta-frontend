import React from "react";
import { PlusCircle } from "@phosphor-icons/react";

export default function AddToList() {
  return (
    <div className="flex items-center cursor-pointer hover:text-primary gap-1 transition-colors">
      <PlusCircle size={32} weight="fill" />
      <p>Add to list</p>
    </div>
  );
}
