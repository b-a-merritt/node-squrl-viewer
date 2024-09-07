import React from "react";
import { SQURL } from "postgresqurl";
import { AddRecordButton } from "@/components/add-record-button";
import { TBody } from "@/components/table";
import { THead } from "@/components/table";
import { db } from "@/config/db";
import { environment } from "@/config/environment";
import { mapColumnType } from "@/utils/column-type";
import styles from "./page.module.css";

interface TablePageProps {
  params: {
    name: string;
  };
  searchParams?: {
    sortBy: string;
    sortOrder: "ASC" | "DESC";
  };
}

export default async function TablePage({
  params,
  searchParams,
}: TablePageProps) {
  const queryParams = searchParams || {
    sortBy: "",
    sortOrder: "DESC",
  };

  const colQ = new SQURL("columns", { schema: "information_schema" })
    .select(['column_name AS "columnName"'])
    .where([
      {
        table: "columns",
        field: "table_schema",
        equals: environment.DB_SCHEMA,
      },
      {
        table: "columns",
        field: "table_name",
        equals: params.name,
      },
    ])
    .query();
  const colRequest = await db.query(colQ.query, colQ.placeholders);
  const columns = colRequest.rows.map(({ columnName }) => columnName);

  let rowQ = new SQURL(params.name, { schema: environment.DB_SCHEMA })
    .select(columns)
    .query();

  if (!!queryParams.sortBy) {
    rowQ = new SQURL(params.name, { schema: environment.DB_SCHEMA })
      .select(columns)
      .orderBy([
        {
          field: queryParams.sortBy,
          sort_order: queryParams.sortOrder.toLowerCase() as "asc" | "desc",
          table: params.name,
        },
      ])
      .query();
  }

  const rowRequest = await db.query(rowQ.query, rowQ.placeholders);
  const types = mapColumnType(rowRequest.fields);

  return (
    <div className={styles["wrapper"]}>
      <div className={styles["options"]}>
        <AddRecordButton />
      </div>
      <div style={{ padding: "0px 32px" }}>
        <div className={styles["table-wrapper"]}>
          <table className={styles["table"]}>
            <THead columns={columns} />
            <TBody name={params.name} rows={rowRequest.rows} types={types} />
          </table>
        </div>
      </div>
    </div>
  );
}
