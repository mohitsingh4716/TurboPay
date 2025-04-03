"use server"

// import prisma from "@repo/db/client"
import prisma from "../../../packages/db/index"


export const addMoney= async (token: string) => {
    

    const transaction= await prisma.onRampTransaction.findFirst({
        where: {
            token: token
        },
        select:{
            userId: true,
            amount: true
        }
    })

     if(!transaction){
        return {
            message:"Invalid token"
        }
    }

    return{
        transaction
    }
}