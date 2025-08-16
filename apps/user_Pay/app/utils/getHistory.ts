import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";

export const getBalanceHistory = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new Error("User not authenticated.");
  }

  const userId = session.user.id;

  // Fetch all transactions related to the user
  const onRampTransactions = await prisma.onRampTransaction.findMany({
    where: { userId, status: "Success" },
    select: { amount: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });

  const p2pTransactions = await prisma.p2pTransfer.findMany({
    where: {
      OR: [{ fromUserId: userId }],
      status: "Success",
    },
    select: { amount: true, createdAt: true, fromUserId: true, toUserId: true, direction: true },
    orderBy: { createdAt: "desc" },
  });

  // Merge and sort transactions chronologically
  const allTransactions = [
    ...onRampTransactions.map((t:any) => ({
      date: t.createdAt.toISOString(),
      amount: t.amount / 100,
      type: "onramp",
    })),
    ...p2pTransactions.map((t:any) => ({
      date: t.createdAt.toISOString(),
      amount: t.direction === "send" ? -t.amount / 100 : t.amount / 100,
      type: "p2p",
    })),
  ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // console.log(allTransactions);

  let ongoingBalance = 0;
  const balanceHistory: { date: string; amount: number }[] = [];

  allTransactions.forEach((transaction) => {
    ongoingBalance += transaction.amount;
    balanceHistory.push({
      date: transaction.date,
      amount: ongoingBalance,
    });
  });

  // console.log(balanceHistory);

  return balanceHistory.length > 0
    ? balanceHistory
    : [{ date: new Date(), amount: 0 }];
};
