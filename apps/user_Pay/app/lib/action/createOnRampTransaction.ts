"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";


export async function createOnRampTransaction(amount: number, provider: string){
    const session= await getServerSession(authOptions);
    const userId= session?.user?.id;
    
    const token= (Math.random()*1000).toString();

    if(!userId){
        return {
            message:"User  ot logged In"
        }
    }

    await prisma.onRampTransaction.create({
        data:{
            userId:(userId),
            amount:amount,
            status:"Processing",
            createdAt:new Date(),
            provider,
            token:token,


        }
    })

    return{
        message: "On Ramp transection added successfully" 
    }
}