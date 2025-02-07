"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function p2pTransfer(to: string, amount: number) {
  const session = await getServerSession(authOptions);
  const from = session?.user?.id;
  if (!from) {
    return {
      message: "Error while sending",
    };
  }
  const toUser = await prisma.user.findFirst({
    where: {
      phone: to,
    },
  });

  if (!toUser) {
    return {
      message: "User not found",
    };
  }

      try {
        await prisma.$transaction(async (tx) => {
          const fromBalance = await tx.balance.findUnique({
            where: {
              userId: from
            }
          });

          if (!fromBalance || fromBalance.amount < amount) {
            throw new Error("Insufficient funds");
          }

          await tx.balance.update({
            where: { userId: from },
            data: { amount: { decrement: amount } },
          });

          await tx.balance.update({
            where: { userId: toUser.id },
            data: { amount: { increment: amount } },
          });

          await tx.p2pTransfer.create({
            data: {
              fromUserId: from,
              toUserId: toUser.id,
              status: "Success",
              amount,
              createdAt: new Date(),
            },
          });
        });
        return true;
      } catch(e){
        await prisma.$disconnect()
        return false;
    }
    finally{(async () => {
        await prisma.$disconnect();
      });
    }
         
}
