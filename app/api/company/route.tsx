import { getCompanies } from "@/utils/databaseQueries/companies";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const data = await getCompanies();
  if (data.error) {
    return new NextResponse(JSON.stringify({ message: "journey not found" }), {
      status: 404,
    });
  }
  return new NextResponse(JSON.stringify(data.data));
}
