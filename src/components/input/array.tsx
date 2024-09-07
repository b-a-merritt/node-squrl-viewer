import React from "react";
import { InputProps } from "./types";

export const ArrayInput = ({ name, onChange, value }: InputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const values = (value as string[] || [])
    const idx = parseInt(event.target.name);
    if (!isNaN(idx)) {
      values[idx] = event.target.value;
    }
    onChange(name, values);
  };

  const addItem = () => {
    const values = (value as string[] || []);
    values.push("");
    onChange(name, values);
  };

  const removeItem = (idx: number) => {
    if (!value) return;
    const values = (value as string[]).filter((_, i) => i !== idx);
    if (values.length !== 0) {
      onChange(name, values);
    } else {
      onChange(name, undefined);
    }
  };

  return (
    <div className="flex column gap_8">
      {(value as string[] || []).map((value, i) => (
        <label key={`array-item-${i}`} className="flex gap_8">
          <input
            type="text"
            name={`${i}`}
            onChange={handleChange}
            value={value || ''}
          />
          <button
            onClick={() => removeItem(i)}
            style={{ fontSize: 12}}
          >
            Remove
          </button>
        </label>
      ))}
      <button onClick={addItem} style={{ fontSize: 12}}>
        Add
      </button>
    </div>
  );
};
