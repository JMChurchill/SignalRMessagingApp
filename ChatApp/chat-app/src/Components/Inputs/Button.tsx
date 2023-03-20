import React from "react";

type ButtonProps = {
  children: string;
  disabled?: boolean;
};
const Button = ({ children, disabled = false }: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={
        "text-white rounded-md bg-teal-400 p-2 min-w-[5rem] hover:bg-teal-500 cursor-pointer transition-all"
      }
    >
      {children}
    </button>
  );
};

export default Button;
