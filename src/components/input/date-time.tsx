import React from "react";
import { InputProps } from "./types";

export const DateTimeInput = ({ name, onChange, value }: InputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(name, new Date(event.target.value).toISOString().replaceAll('Z' ,''));
  };

  return (
    <div>
      <label>
        <input
          type="datetime-local"
          onChange={handleChange}
          value={value as number || ''}
        />
      </label>
    </div>
  );
};
