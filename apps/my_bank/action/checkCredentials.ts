"use server"

import prisma from "../../../packages/db/index"
import bcrypt from "bcrypt";
export const checkCredentials = async (username: string, password: string, amount:number) => {


    const user= await prisma.bank.findFirst({
        where:{
            userId: username,
        },
        select:{
            password:true,
            balance:true,
            accountNumber:true
        }
    });

    if(!user){
        return {
            message: "User not found",
        }
    }

    const passwordMatch= await bcrypt.compare(password, user.password);

    if(!passwordMatch){
        return {
            message: "Invalid Password",
        }
    }

    if(amount>user.balance){
        return {
            message: "Insufficient Balance",
        }
    }

    await prisma.bank.update({
        where:{
            accountNumber: user.accountNumber,
        },
        data:{
            balance:{
                decrement:amount
            }
        }
    })

    return {
        message: "Success"
    }
}