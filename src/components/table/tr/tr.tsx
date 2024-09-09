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
import { AttributeType } from "@/utils/column-type";

interface TrProps {
  destroy: (
    tableName: string,
    data: Record<string, unknown>
  ) => Promise<string | unknown[]>;
  update: (
    tableName: string,
    data: Record<string, unknown>
  ) => Promise<string | unknown[]>;
  name: string;
  row: Record<string, unknown>;
  types: Record<string, AttributeType>;
}

export const Tr = ({ destroy, update, name, row, types }: TrProps) => {
  const id = React.useId();
  const [editable, setEditable] = React.useState(false);
  const [error, setError] = React.useState<null | string>(null);
  const [state, setState] = React.useState<Record<string, unknown>>(row);

  let entries: [string, unknown][] = Object.entries(row);

  const handleDelete = async () => {
    setError(null);

    const response = await destroy(name, row);
    if (typeof response === "string") {
      setError(response);
    }
  };

  if (editable) {
    entries = Object.entries(state);

    const handleChange = (key: string, value: unknown) => {
      setState((prev) => ({
        ...prev,
        [key]: value,
      }));
    };

    const handleUpdate = async () => {
      setError(null);

      const response = await update(name, state);
      if (typeof response === "string") {
        setError(response);
      } else {
        setEditable(false);
        setState(row);
      }
    };

    return (
      <>
        <Portal>
          {error && (
            <Toast
              message={error}
              onClose={() => setError(null)}
              type="error"
            />
          )}
        </Portal>
        <tr>
          <td>
            <div className="flex column gap_16">
              <button
                className="outline"
                onClick={handleUpdate}
                style={{ fontSize: 12, width: "100%" }}
              >
                Update
              </button>
            </div>
          </td>
          {entries.map(([key, value]) => {
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
                      value={new Date(state[key] as string).toISOString().replaceAll('Z', '')}
                    />
                  </td>
                );
              case "DATE":
                return (
                  <td key={`value-${id}-${key}`}>
                    <DateInput
                      name={key}
                      onChange={handleChange}
                      value={new Date(state[key] as string).toISOString().replaceAll('Z', '')}
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
  }

  return (
    <tr>
      <td>
        <div className="flex column gap_8">
          <button
            className="outline"
            onClick={() => setEditable(true)}
            style={{ fontSize: 12, width: "100%" }}
          >
            Edit
          </button>
          <button
            className="outline"
            onClick={handleDelete}
            style={{ fontSize: 12, width: "100%" }}
          >
            Remove
          </button>
        </div>
      </td>
      {entries.map(([key, value]) => {
        if (value === null || value === undefined) {
          return <td key={`value-${id}-${key}`}>null</td>;
        }

        switch (types[key]) {
          case "BOOL":
            return (
              <td key={`value-${id}-${key}`}>{value ? "true" : "false"}</td>
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
                <>{value}</>
              </td>
            );
          case "TIMESTAMP":
          case "TIMESTAMPTZ":
          case "TIME":
          case "TIMETZ":
            return (
              <td key={`value-${id}-${key}`}>
                <>{new Date(`${value}`).toLocaleString()}</>
              </td>
            );
          case "DATE":
            return (
              <td key={`value-${id}-${key}`}>
                <>{new Date(`${value}`).toLocaleDateString()}</>
              </td>
            );
          case "JSON":
          case "JSONB":
            return (
              <td key={`value-${id}-${key}`}>
                <>{JSON.stringify(value, null, 2)}</>
              </td>
            );
          case "CUSTOM_ENUM":
            if (Array.isArray(value)) {
              return (
                <td key={`value-${id}-${key}`}>
                  <>{value.toString()}</>
                </td>
              );
            }
            return (
              <td key={`value-${id}-${key}`}>
                <>{value}</>
              </td>
            );
          default:
            return (
              <td key={`value-${id}-${key}`}>
                <>{value}</>
              </td>
            );
        }
      })}
    </tr>
  );
};
