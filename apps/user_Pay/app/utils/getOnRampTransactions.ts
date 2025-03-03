import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import prisma from "@repo/db/client";
import { OnRampStatus } from "../(dashboard)/transfer/_components/onRampTransactions";


export default async function getOnRampTransactions() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.onRampTransaction.findMany({
        where: {
            userId:(session?.user?.id)
        },
        orderBy: {
            createdAt: "desc"
        },
        take: 5
    });
    return txns.map(t => ({
        key: t.id,
        id: t.id,
        time: t.createdAt,
        amount: t.amount,   
        status: OnRampStatus[t.status as keyof typeof OnRampStatus],
        provider: t.provider
    }))
}