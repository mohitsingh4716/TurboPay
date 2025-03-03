import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import prisma from "@repo/db/client";


export const getProfile= async ()=>{
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        throw new Error("User not authenticated.");
      }

    const userId = session?.user?.id;

    const profile = await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            name: true,
            phone: true
        }
    });

    if(!profile){
        throw new Error("Profile not found");
    }

    return {
        name: profile?.name || '',
        phone: profile?.phone || ''
    }
}