"use client";
import React from "react";
import { insert } from "@/actions/insert";
import { AddRecord } from "@/components/table";
import { AttributeType } from "@/utils/column-type";
import styles from "./tbody.module.css";

export interface TBodyProps {
  name: string;
  rows: Record<string, unknown>[];
  types: Record<string, AttributeType>;
}

export const TBody = ({ name, rows, types }: TBodyProps) => {
  const id = React.useId();

  return (
    <tbody className={styles["tbody"]}>
      <AddRecord insertRecord={insert} name={name} rows={rows} types={types} />
      {rows.map((row, i) => {
        return (
          <tr key={`${row?.id || id + i}`}>
            <td>
              <div>{i + 1}</div>
            </td>
            {Object.entries(row).map(([key, value]) => {
              if (value === null || value === undefined) {
                return <td key={`value-${id}-${key}`}>null</td>;
              }

              switch (types[key]) {
                case 'BOOL':
                  return (
                    <td key={`value-${id}-${key}`}>{value ? "true" : "false"}</td>
                  );
                case 'BIT':
                case 'INT2':
                case 'INT4':
                case 'INT8':
                case 'FLOAT4':
                case 'FLOAT8':
                case 'NUMERIC':
                  return (
                    <td key={`value-${id}-${key}`}>
                      <>{value}</>
                    </td>
                  );
                case 'TIMESTAMP':
                case 'TIMESTAMPTZ':
                case 'TIME':
                case 'TIMETZ':
                  return (
                    <td key={`value-${id}-${key}`}>
                      <>{new Date(`${value}`).toLocaleString()}</>
                    </td>
                  );
                case 'DATE':
                  return (
                    <td key={`value-${id}-${key}`}>
                      <>{new Date(`${value}`).toLocaleDateString()}</>
                    </td>
                  );
                case 'JSON':
                case 'JSONB':
                  return (
                    <td key={`value-${id}-${key}`}>
                      <>{JSON.stringify(value, null, 2)}</>
                    </td>
                  );
                case 'CUSTOM_ENUM': 
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
      })}
    </tbody>
  );
};
