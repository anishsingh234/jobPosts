
import { NextRequest, NextResponse } from "next/server";
import prismaclient from "@/services/prisma";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const q = searchParams.get("q") || "";
    // const jt = searchParams.get("jt") || "Full Time";
    // const ap = searchParams.get("ap") || "LinkedIn";
    //const page=searchParams.get("page")?Number.parseInt(searchParams.get('page')):1
    const data = await prismaclient.openings.findMany({
      where: {
        ...(q && {
          title: {
            contains: q,
            mode: "insensitive",
          },
        }),
      },
      /*take:10,
      skip:(page-1)*10*/
    });

    return NextResponse.json({ data });
  } catch (err) {
    console.log("API Error:", err.message)
    return NextResponse.json(
     
    );
  }
}
