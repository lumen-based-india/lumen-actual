import { getProductsByCompanyID } from "@/utils/databaseQueries/products";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const company_id = params.id;
  const data = await getProductsByCompanyID(company_id);
  if (data.error) {
    return new NextResponse(JSON.stringify({ message: "journey not found" }), {
      status: 404,
    });
  }
  return new NextResponse(JSON.stringify(data.data));
}
