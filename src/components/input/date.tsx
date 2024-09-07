import React from "react";
import { InputProps } from "./types";

export const DateInput = ({ name, onChange, value }: InputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(name, new Date(event.target.value).toDateString());
  };

  return (
    <div>
      <label>
        <input
          type="date"
          onChange={handleChange}
          value={value as string || ''}
        />
      </label>
    </div>
  );
};
