
import { NextRequest, NextResponse } from "next/server";
import prismaclient from "@/services/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const job = await prismaclient.openings.create({
      data: body,
    });

    return NextResponse.json({
      success: true,
      job: job, 
    });
  } catch (err) {
    console.log("Error in job creation:", err.message);
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
