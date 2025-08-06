
import prismaclient from "@/services/prisma"
import { NextResponse } from "next/server"

export async function GET(req)
{
    const res=await prismaclient.openings.findMany()
       return NextResponse.json({
        success:true,
        data:res
    })
}