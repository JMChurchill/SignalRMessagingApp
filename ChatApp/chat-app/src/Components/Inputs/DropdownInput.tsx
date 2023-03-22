import React from "react";

type OptionType = { value: number; label: string };
type DropdownInputProps = {
  options: OptionType[];
  placeholder?: string | null;
  value: string;
  setValue: (value: string) => void;
};
const DropdownInput = ({
  options,
  placeholder = null,
  value,
  setValue,
}: DropdownInputProps) => {
  return (
    <select
      className="rounded-md focus:ring-teal-400 focus:border-teal-400"
      onChange={(e) => setValue(e.target.value)}
      value={value}
    >
      <option>{placeholder}</option>
      {options.map((o) => (
        <option value={o.value}>{o.label}</option>
      ))}
    </select>
  );
};

export default DropdownInput;
