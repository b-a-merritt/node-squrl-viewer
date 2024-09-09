import React from "react";
import { Th } from "@/components/table";
import styles from "./thead.module.css";

interface THeadProps {
  columns: string[];
}

export const THead = ({ columns }: THeadProps) => {
  return (
    <thead className={styles["thead"]}>
      <tr>
        <th>
          <div>Actions</div>
        </th>
        {columns.map((columnName, i) => (
          <Th key={columnName + i} name={columnName} />
        ))}
      </tr>
    </thead>
  );
};
