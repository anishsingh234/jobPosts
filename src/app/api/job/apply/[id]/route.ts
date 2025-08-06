import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getUserFromCookies } from "@/helper";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getUserFromCookies();
  const job_id = params.id;

  if (!user) {
    return NextResponse.json({
      success: false,
      message: "User is not authenticated",
    });
  }

  try {
    const application = await prismaClient.application.create({
      data: {
        user_id: user.id,
        job_id: job_id,
      },
    });

    return NextResponse.json({
      success: true,
      data: application,
    });
  } catch (err: any) {
    console.error("Error applying to job:", err); 
    return NextResponse.json({
      success: false,
      message: "Failed to create application",
    });
  }
}
