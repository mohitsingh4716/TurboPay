import { authOptions } from "@/app/lib/auth";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth"
import P2PTransaction from "./_components/transactions";
import { OnRampTransactions, OnRampStatus } from "../transfer/_components/onRampTransactions";
import { redirect } from "next/navigation";


async function p2pTransactions() {
    const session= await getServerSession(authOptions);

    const p2pTxns= await prisma.p2pTransfer.findMany({
        where:{
            fromUserId: session?.user?.id,
        },
        orderBy:{
            createdAt:"desc"
        },

        take: 8,

        select:{
            id:true,
            amount:true,
            fromUserId:true,
            toUserId:true,
            createdAt:true,
            status:true,
            fromUser:true,
            toUser:{
                select:{
                    name:true,
                    phone:true
                },
            },
            direction:true,
        }

    });




    return p2pTxns.map(t=>{
        return {
            key:t.id,
            id:t.id,
            amount:t.amount,
            fromUserId:t.fromUserId,
            toUserId:t.toUserId,
            createdAt:t.createdAt,
            status:t.status,
            direction:t.direction,

            toUserName:t.toUser.name,
            toUserPhone:t.toUser.phone

        }
    })
}

async function getRampTransaction() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.onRampTransaction.findMany({
        where: {
            userId:(session?.user?.id)
        },
        orderBy: {
            createdAt: "desc"
        },
    });
    return txns.map(t => ({
        key: t.id,
        id: t.id,
        time: t.createdAt,
        amount: t.amount,   
        status: t.status as OnRampStatus,
        provider: t.provider
    }))
}

export default async function Transactions() {
    
     const session= await getServerSession(authOptions);
        if(!session){
            redirect("/landing");
        }

    const p2pTxns= await p2pTransactions();

    const rampTxns= await getRampTransaction();

    return (
    
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2  pt-4">


                <div className="p-1">
                    <P2PTransaction transactions={p2pTxns} />
                </div>
            
                <div className="p-1">
                  <OnRampTransactions transactions={rampTxns} />
                </div>
            </div>
    )
}


