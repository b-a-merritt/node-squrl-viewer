"use client";
import React from "react";
import {
  ArrayInput,
  BooleanInput,
  DateInput,
  DateTimeInput,
  NumericInput,
  TextInput,
} from "@/components/input";
import { Toast } from "@/components/toast";
import { Portal } from "@/components/utility";
import { AddRecordContext } from "@/context/add-record";
import { AttributeType } from "@/utils/column-type";

interface AddRecordProps {
  insertRecord: (
    table: string,
    data: Record<string, unknown>
  ) => Promise<string | unknown[]>;
  name: string;
  rows: Record<string, unknown>[];
  types: Record<string, AttributeType>;
}

export const AddRecord = ({
  insertRecord,
  name,
  rows,
  types,
}: AddRecordProps) => {
  const { addRecord, setAddRecord } = React.useContext(AddRecordContext);
  const [state, setState] = React.useState<Record<string, unknown>>({});
  const [error, setError] = React.useState<null | string>(null);
  const id = React.useId();

  const handleChange = (key: string, value: unknown) => {
    setState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleReset = () => {
    setState({});
    setAddRecord(false);
  };

  const handleSubmit = async () => {
    setError(null);

    const response = await insertRecord(name, state);

    if (typeof response === "string") {
      setError(response);
      return;
    } else {
      handleReset();
    }
  };

  if (!addRecord) return null;

  return (
    <>
      <Portal>
        {error && (
          <Toast message={error} onClose={() => setError(null)} type="error" />
        )}
      </Portal>
      <tr>
        <td>
          <div className="flex column gap_16">
            <button className="outline" onClick={handleSubmit}>
              Insert
            </button>
            <button className="outline" onClick={handleReset}>
              Reset
            </button>
          </div>
        </td>
        {Object.entries(rows[0]).map(([key, value]) => {
          if (value === null || value === undefined) {
            return <td key={`null-value-${id}-${key}`}>null</td>;
          }

          switch (types[key]) {
            case "BOOL":
              return (
                <td key={`bool-value-${id}-${key}`}>
                  <BooleanInput
                    name={key}
                    onChange={handleChange}
                    value={state[key]}
                  />
                </td>
              );
            case "BIT":
            case "INT2":
            case "INT4":
            case "INT8":
            case "FLOAT4":
            case "FLOAT8":
            case "NUMERIC":
              return (
                <td key={`value-${id}-${key}`}>
                  <NumericInput
                    name={key}
                    onChange={handleChange}
                    value={state[key]}
                  />
                </td>
              );
            case "TIMESTAMP":
            case "TIMESTAMPTZ":
            case "TIME":
            case "TIMETZ":
              return (
                <td key={`value-${id}-${key}`}>
                  <DateTimeInput
                    name={key}
                    onChange={handleChange}
                    value={state[key]}
                  />
                </td>
              );
            case "DATE":
              return (
                <td key={`value-${id}-${key}`}>
                  <DateInput
                    name={key}
                    onChange={handleChange}
                    value={state[key]}
                  />
                </td>
              );
            case "JSON":
            case "JSONB":
            case "CUSTOM_ENUM":
              if (Array.isArray(value)) {
                return (
                  <td key={`value-${id}-${key}`}>
                    <ArrayInput
                      name={key}
                      onChange={handleChange}
                      value={state[key]}
                    />
                  </td>
                );
              }
            default:
              return (
                <td key={`value-${id}-${key}`}>
                  <TextInput
                    name={key}
                    onChange={handleChange}
                    value={state[key]}
                  />
                </td>
              );
          }
        })}
      </tr>
    </>
  );
};
