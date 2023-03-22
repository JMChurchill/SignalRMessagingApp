import React from "react";

type ButtonProps = {
  variant?: "default" | "red" | "green";
  children: string;
  disabled?: boolean;
  onClick?: ((a: any) => void) | null;
};
const Button = ({
  variant = "default",
  children,
  disabled = false,
  onClick = null,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={`text-white rounded-md p-2 min-w-[5rem] transition-all ${
        disabled
          ? "bg-gray-400"
          : variant === "red"
          ? "bg-red-600 hover:bg-red-700 cursor-pointer"
          : variant === "green"
          ? "bg-green-500 hover:bg-green-600 cursor-pointer"
          : "bg-teal-400 hover:bg-teal-500 cursor-pointer"
      }`}
      onClick={onClick ? onClick : () => {}}
    >
      {children}
    </button>
  );
};

export default Button;
