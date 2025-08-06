//@ts-nocheck
import { cookies } from "next/headers";
import prismaclient from "./services/prisma";
import { verifyToken } from "./services/jwt";

export async function getUserFromCookies() {
  try{
  const userCookies = await cookies();
  const token = userCookies.get("token")?.value;
  console.log("token",token)
  if (!token) {
    return null;
  }
  const data = verifyToken(token);
  console.log("data helper function ",data)
  console.log("data id in helper",data.id)
  if (!data) {
    return null;
  }
  const user = await prismaclient.user.findUnique({
    where: {
      id: data.id,
    },
    include:{
      company:true,
    },
    omit: {
      password: true,
    },

  });
  console.log("user helper function",user)
  if (!user) {
    return null;
  }
   return user;
}
 
   catch(err)
   {
    console.log("error in helper",err.message)
   }
}
