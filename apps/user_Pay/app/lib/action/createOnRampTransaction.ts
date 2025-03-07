"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { randomBytes } from 'crypto';
import prisma from "@repo/db/client";


export async function createOnRampTransaction(amount: number, provider: string){
    const session= await getServerSession(authOptions);
    const userId= session?.user?.id;

   const token = randomBytes(32).toString('hex');

    if(!userId){
        return {
            message:"User not logged In"
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
        token,
        message: "On Ramp transection added successfully" 
    }
}