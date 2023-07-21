"use client";

import React, { useState } from "react";
import ErrorMessage from "../Text/ErrorMessage";

export default function Input({ type, Icon, register, errorMessage }: any) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <div className="relative">
        <input
          type={showPassword ? "text" : type}
          {...register}
          className="bg-gray-200 w-full h-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-none rounded-md pl-4 py-2 pr-12 text-gray-600 font-normal text-base"
        />

        {Icon && type === "password" && (
          <div
            className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            <Icon size={20} />
          </div>
        )}

        {Icon && type !== "password" && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <Icon size={20} />
          </div>
        )}
      </div>
      <ErrorMessage>{errorMessage}</ErrorMessage>
    </>
  );
}
