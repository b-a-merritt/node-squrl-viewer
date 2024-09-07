"use server";
import { revalidatePath } from "next/cache";
import { SQURL } from "postgresqurl";
import { db } from "@/config/db";
import { environment } from "@/config/environment";

export const insert = async (tableName: string, data: Record<string, unknown>) => {
  if (!tableName) {
    return `syntax error at or near "INSERT INTO ""`
  }
  if (!Object.keys(data).length) {
    return `all null values of relation "${tableName}" violates not-null constraint`;
  }

  const q = new SQURL(tableName, { schema: environment.DB_SCHEMA })
    .insert(data)
    .returning(["*"])
    .query();

  try {
    const request = await db.query(q.query, q.placeholders);
    revalidatePath("/");
    return request.rows;
  } catch (error) {
    return (error as unknown as Error).message;
  }
};
