import { getAllInsetPrograms } from "@/utils/databaseQueries/insetPrograms";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const data = await getAllInsetPrograms();
  if (data.error) {
    return new NextResponse(JSON.stringify({ message: "inset programs not found" }), {
      status: 404,
    });
  }
  return new NextResponse(JSON.stringify(data.data));
}
