import React from "react";
import { InputProps } from "./types";

export const NumericInput = ({ name, onChange, value }: InputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(name, event.target.value);
  };

  return (
    <div>
      <label>
        <input
          type="number"
          onChange={handleChange}
          value={value as number || ''}
        />
      </label>
    </div>
  );
};
