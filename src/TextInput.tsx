import React from "react";

interface Props {
  id: string;
  label: string;
  value: string;
  required?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function TextInput({
  id,
  label,
  onChange,
  value,
  required = false,
}: Props) {
  return (
    <div className="text-input">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={id}
        type="text"
        required={required}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}
