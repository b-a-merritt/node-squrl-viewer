import React from "react";
import { InputProps } from "./types";

export const BooleanInput = ({ name, onChange, value }: InputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.id === "true") {
      onChange(name, true);
    } else {
      onChange(name, false);
    }
  };

  return (
    <div className="flex column gap_8">
      <label>
        True
        <input
          type="radio"
          onChange={handleChange}
          id="true"
          checked={`${value}` === "true"}
        />
      </label>
      <label>
        False
        <input
          type="radio"
          onChange={handleChange}
          id="false"
          checked={`${value}` === "false"}
        />
      </label>
    </div>
  );
};
