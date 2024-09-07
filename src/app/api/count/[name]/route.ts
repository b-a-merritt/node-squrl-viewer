import { NextResponse } from "next/server";
import { SQURL } from 'postgresqurl';
import { db } from '@/config/db';
import { environment } from "@/config/environment";

type Context = {
  params: {
    name: string;
  }
}

export async function GET(req: Request, ctx: Context) {
  const q = new SQURL(ctx.params.name, { schema: environment.DB_SCHEMA })
    .select([SQURL.count('*', ctx.params.name)])
    .query();

  const request = await db.query(q.query, q.placeholders);

  return NextResponse.json(request.rows?.[0]?.count || 0);
}
