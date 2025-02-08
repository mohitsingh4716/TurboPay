"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";


export async function createBalance() {
    const session = await getServerSession(authOptions);
    const userId= session?.user?.id;

    if (!userId) {
        return {
            message: "User not logged In"
        }
    }
    await prisma.balance.create({
        data: {
            userId: userId,
            amount: 0,
            locked: 0
        }
    })

    return {
        message: "Balance created successfully"
    }
}

