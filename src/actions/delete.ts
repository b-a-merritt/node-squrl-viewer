"use server";
import { SQURL } from "postgresqurl";
import { db } from "@/config/db";
import { environment } from "@/config/environment";

export const destroy = async (
  tableName: string,
  field: string,
  value: number | string
) => {
  const q = new SQURL(tableName, { schema: environment.DB_SCHEMA })
    .delete()
    .returning(["*"])
    .where([
      {
        field: field,
        table: tableName,
        equals: value,
      },
    ])
    .query();

  const request = await db.query(q.query, q.placeholders);

  return request;
};
