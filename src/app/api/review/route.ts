import { NextRequest } from "next/server";
import { getUserFromCookies } from "@/helper";
import { NextResponse } from "next/server";
import prismaClient from "@/services/prisma";

export async function POST(req: NextRequest) {
  const user = await getUserFromCookies();
  const body = await req.json();

  const dataToSave = {
    ...body,
    user_id: user.id,
  };

  try {
    const review = await prismaClient.review.create({
      data: dataToSave,
    });

    return NextResponse.json({
      success: true,
      data:review
    });
  } catch (e) {
    return NextResponse.json({
      success: false,
      message:"something got wrong"
    });
  }
}
