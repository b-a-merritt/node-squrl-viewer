import React from "react";
import { SQURL } from "postgresqurl";
import { TableCount } from '@/components/table-count';
import { db } from "@/config/db";
import { environment } from "@/config/environment";
import styles from "./page.module.css";

const q = new SQURL("tables", { schema: "information_schema" })
  .select(['table_name AS "tableName"'])
  .where([
    {
      table: "tables",
      field: "table_schema",
      equals: environment.DB_SCHEMA,
    },
  ])
  .orderBy([
    {
      field: "table_name",
      table: "tables",
      sort_order: "asc",
    },
  ])
  .query();

export default async function AllTablesPage() {
  const result = await db.query(q.query, q.placeholders);

  return (
    <div className={styles["list-tables"]}>
      <h1>All Tables</h1>
      <ul>
        {result.rows.map(({ tableName }, i) => (
          <li key={tableName + i}>
            <a href={'/' + tableName}>{tableName}</a>
            <TableCount name={tableName}/>
          </li>
        ))}
      </ul>
    </div>
  );
}
