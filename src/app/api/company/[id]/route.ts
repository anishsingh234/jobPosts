import { getUserFromCookies } from "@/helper";
import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

// Type for route context
type Context = {
  params: { id: string };
};

// --- GET Handler ---
export async function GET(req: NextRequest, context: Context) {
  const id = context.params.id;

  const company = await prismaclient.company.findUnique({
    where: {
      id: id,
    },
    include: {
      owner: true,
      jobs: true,
    },
  });

  return NextResponse.json({
    success: true,
    data: {
      company,
    },
  });
}

// --- DELETE Handler ---
export async function DELETE(req: NextRequest, context: Context) {
  try {
    const id = context.params.id;
    const user = await getUserFromCookies();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const company = await prismaclient.company.findUnique({
      where: { id },
    });

    if (!company) {
      return NextResponse.json(
        {
          success: false,
          message: "Company not found",
        },
        { status: 404 }
      );
    }

    if (company.ownerId !== user.id) {
      return NextResponse.json(
        {
          success: false,
          message: "You are not authorized to delete this company.",
        },
        { status: 403 }
      );
    }

    await prismaclient.company.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Deleted Successfully",
    });
  } catch (error) {
    console.error("Error deleting company:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
