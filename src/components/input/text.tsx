import React from "react";
import { InputProps } from "./types";

export const TextInput = ({ name, onChange, value }: InputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(name, event.target.value);
  };

  return (
    <div>
      <label>
        <textarea
          onChange={handleChange}
          value={value as string || ''}
        />
      </label>
    </div>
  );
};
