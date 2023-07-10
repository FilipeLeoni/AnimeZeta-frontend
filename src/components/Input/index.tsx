"use client";

import React from "react";

export default function Input({ type, Icon }: any) {
  return (
    <div className="relative">
      <input
        type={type}
        className="bg-gray-200 w-full h-full focus:outline-primary focus:ring-2 rounded-md pl-4 py-2 pr-12 text-gray-500 font-normal text-base"
      />
      {Icon && (
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <Icon size={20} />
        </div>
      )}
    </div>
  );
}
