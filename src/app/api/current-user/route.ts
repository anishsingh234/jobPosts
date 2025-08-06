//@ts-nocheck
import { getUserFromCookies } from "@/helper";
import prismaclient from "@/services/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const user = await getUserFromCookies();

  if (!user) {
    return NextResponse.json({
      success: false,
      message: "user not found",
    });
  }
  return NextResponse.json({
    success: true,
    data: user,
  });
}