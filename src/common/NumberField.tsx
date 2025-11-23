import { ChangeEvent } from "react";
import { TextField } from "tosslib";

interface NumberFieldProps {
  value: number;
  onChange: (value: number) => void;
  label: string;
  placeholder: string;
  suffix: string;
}

export function NumberField({ value, onChange, label, placeholder, suffix }: NumberFieldProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim().replace(/[^0-9]/g, '');
    const number = Number(value);
    if (isNaN(number)) {
      return;
    }
    onChange(number);
  };

  const numberValue = value !== undefined ? value.toString() : '';

  return <TextField
    onChange={handleChange}
    value={numberValue}
    label={label}
    placeholder={placeholder}
    suffix={suffix}
  />;
}
