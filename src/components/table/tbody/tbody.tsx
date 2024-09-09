import React from "react";
import { insert } from "@/actions/insert";
import { destroy } from "@/actions/delete";
import { update } from "@/actions/update";
import { AddRecord, Tr } from "@/components/table";
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
      <AddRecord
        insertRecord={insert}
        name={name}
        exRow={rows?.[0]}
        types={types}
      />
      {rows.map((row, i) => {
        return (
          <Tr
            key={`${row?.id || id + i}`}
            destroy={destroy}
            update={update}
            name={name}
            row={row}
            types={types}
          />
        );
      })}
    </tbody>
  );
};
