import React from "react";
type ErrorMessageProps = {
  children: string | null;
};
const ErrorMessage = ({ children }: ErrorMessageProps) => {
  if (!children) return <></>;
  return <p className="text-red-600 font-bold">{children}</p>;
};

export default ErrorMessage;
