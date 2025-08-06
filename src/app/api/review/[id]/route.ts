import prismaClient from "@/services/prisma";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const companyId = params.id;

  try {
    const reviews = await prismaClient.review.findMany({
      where: {
        company_id: companyId,
      },
      include: {
        user: true,
      },
    });

  
    return NextResponse.json({
      success: true,
      data: reviews,
    });
  } catch (err) {
    console.log(err.message);
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
