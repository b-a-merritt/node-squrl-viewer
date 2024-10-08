"use server";
import { revalidatePath } from "next/cache";
import { SQURL } from "postgresqurl";
import { db } from "@/config/db";
import { environment } from "@/config/environment";

export const destroy = async (
  tableName: string,
  data: Record<string, unknown>,
) => {
  const inner = new SQURL("table_constraints", { schema: "information_schema" })
    .as('tc')
    .select([])
    .join({
      tables: {
        left: "table_constrains",
        right: "constraint_column_usage"
      },
      on: {
        left: "constraint_name",
        right: "constraint_name",
      },
      aliases: {
        left: 'tc',
        right: 'ccu'
      },
      fields: ['column_name AS "columnName"'],
      type: "LEFT",
    })
    .join({
      tables: {
        left: "table_constrains",
        right: "columns"
      },
      on: {
        left: "table_name",
        right: "table_name"
      },
      aliases: {
        left: 'tc',
        right: 'c'
      },
      fields: ['column_name AS "columnsColumnName"'],
      type: "LEFT"
    })
    .where([
      {
        field: "constraint_type",
        equals: "PRIMARY KEY",
        table: "tc"
      },
      {
        field: "table_name",
        equals: tableName,
        table: "tc"
      },
    ])
    .query();

  const outer = `SELECT t."columnName" 
FROM (${inner.query}) 
AS t WHERE t."columnName" = t."columnsColumnName"`;
  let pk: string;

  try {
    const response = await db.query(outer, inner.placeholders);
    pk = response.rows?.[0].columnName;
  } catch (error) {
    return `Unable to find appropriate primary key for table ${tableName}`
  }
  
  const q = new SQURL(tableName, { schema: environment.DB_SCHEMA })
    .delete()
    .returning(["*"])
    .where([
      {
        field: pk,
        table: tableName,
        equals: data[pk] as string | number | boolean,
      },
    ])
    .query();

  try {
    const request = await db.query(q.query, q.placeholders);
    revalidatePath("/");
    return request.rows;
  } catch (error) {
    return (error as unknown as Error).message;
  }
};
