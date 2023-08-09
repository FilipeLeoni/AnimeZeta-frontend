import React, { InputHTMLAttributes, forwardRef, useId, useState } from "react";
import ErrorMessage from "../Text/ErrorMessage";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  icon?: any;
  errorMessage?: any;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function InputComponent(
    { name = "", type = "text", errorMessage = "", icon: Icon, ...props },
    ref
  ) {
    const [showPassword, setShowPassword] = useState(false);
    const inputId = useId();

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div>
        <label htmlFor={inputId}>{props.label}</label>
        <div className="relative mt-1">
          <input
            ref={ref}
            id={inputId}
            name={name}
            type={showPassword ? "text" : type}
            {...props}
            className="bg-gray-100 w-full h-full focus:outline-none border border-gray-300 focus:ring-2 focus:ring-primary rounded-md pl-4 py-2 pr-12 text-gray-600 font-normal text-base"
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

        {errorMessage.length > 0 && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </div>
    );
  }
);

Input.displayName = "Input";
