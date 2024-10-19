import { calculateCompanyData } from "@/utils/databaseQueries/suppliers";
import { NextRequest, NextResponse } from "next/server";

// API route handler to retrieve suppliers for a specific company ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const company_id = params.id;
  const data:any = await calculateCompanyData(company_id);

  if (data.error) {
    console.log(data.error);
    return new NextResponse(JSON.stringify({ message: "journey not found" }), {
      status: 404,
    });
  }

  return new NextResponse(JSON.stringify(data));
}
