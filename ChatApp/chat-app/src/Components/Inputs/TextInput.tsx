import React from "react";

type TextInputProps = {
  placeholder?: string;
  onChange: (val: string) => void;
  value: string;
};
const TextInput = ({ placeholder, onChange, value }: TextInputProps) => {
  return (
    <input
      type={"text"}
      placeholder={placeholder}
      className="rounded-md"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default TextInput;
