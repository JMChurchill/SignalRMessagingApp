import React from "react";
import { ClipLoader } from "react-spinners";

type ButtonProps = {
  variant?: "default" | "red" | "green";
  children: string;
  disabled?: boolean;
  onClick?: ((a: any) => void) | null;
  isLoading?: boolean;
};
const Button = ({
  variant = "default",
  children,
  disabled = false,
  isLoading = false,
  onClick = null,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled || isLoading}
      className={`flex flex-row items-center justify-center gap-2 text-white rounded-md p-2 min-w-[5rem] transition-all ${
        disabled
          ? "bg-gray-400"
          : variant === "red"
          ? `bg-red-600 ${!isLoading && "hover:bg-red-700 cursor-pointer"}`
          : variant === "green"
          ? `bg-green-500 ${!isLoading && "hover:bg-green-600 cursor-pointer"}`
          : `bg-teal-400 ${!isLoading && "hover:bg-teal-500 cursor-pointer"}`
      }`}
      onClick={onClick ? onClick : () => {}}
    >
      {isLoading && <ClipLoader size={16} color={"white"} />}
      {children}
    </button>
  );
};

export default Button;
