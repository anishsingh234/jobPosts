 
import { getUserFromCookies } from "@/helper";
import prismaclient from "@/services/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function POST (req:NextResponse)
{
    const user=await getUserFromCookies()
    console.log("user",user)
    if(!user)
    {
        return NextResponse.json({
            success:false,
            message:"user not found"
        })
    }
    const body=await req.json()
    const company={
        name:body.name,
        description:body.description,
        ownerId:user.id
    }
    try{
        const newComp=await prismaclient.company.create({
            data:company,
        })
        return NextResponse.json({
            success:true,
            data:newComp,
        })
    }
    catch(err)
    {
        console.log(err.message)
        return NextResponse.json({
            success:false,
        })
    }
}