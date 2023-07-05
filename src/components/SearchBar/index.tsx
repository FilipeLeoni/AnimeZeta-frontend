import React from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";

export default function SearchBar() {
  // TODO: Logic to Search

  return (
    <div className="relative text-gray-600">
      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        <MagnifyingGlass size={20} />
      </span>
      <input
        placeholder="Search"
        className="w-64 bg-gray-200 h-auto focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent rounded-2xl p-1 pl-10"
      />
    </div>
  );
}
