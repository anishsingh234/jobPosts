

import { createToken } from "@/services/jwt";
import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest)
{
    const body=await req.json()
    const user=await prismaclient.user.findUnique({
        where:{
            email:body.email,
            password:body.password
        }
    })
    if(user?.password==body?.password)
    {
        const userTokenData={
            id:user?.id
        }
         const token=createToken(userTokenData)
        const res= NextResponse.json({
            success:true,
            user:user
        })
       res.cookies.set('token',token)
       return res

    }
    return NextResponse.json({
        success:false,

    })
}