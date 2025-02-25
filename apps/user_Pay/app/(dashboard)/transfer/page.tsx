import { getServerSession } from "next-auth";
import AddMoney from "./_components/add-money";
import BalanceCard from "./_components/balance-card";
import { authOptions } from "@/app/lib/auth";
import prisma from "@repo/db/client";
import { OnRampStatus, OnRampTransactions } from "./_components/onRampTransactions";

async function getBalance() {
    const session = await getServerSession(authOptions);
    const balance = await prisma.balance.findUnique({
        where: {
            userId: (session?.user?.id)
        }
    });
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}


async function getOnRampTransactions() {
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


export default async function TransferPage() {

    const balance = await getBalance();
    const transactions = await getOnRampTransactions();

    return (
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
       
                <div>
                    <AddMoney />
                </div>
                <div className="">
                    <BalanceCard amount={balance?.amount} locked={balance.locked} />
                 <div className="pt-4">
                    <OnRampTransactions transactions={transactions} />
                </div>
                </div> 
          
           
        </div>
    )
}