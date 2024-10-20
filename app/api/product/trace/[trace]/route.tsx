import { GetAllProducts, getProductTrace } from "@/utils/databaseQueries/companies";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { trace: string } },
) {
  const trace = params.trace;
  const res = getProductTrace(trace);
  console.log(res);
  return new NextResponse(JSON.stringify(res));
}
