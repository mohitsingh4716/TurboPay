import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt";
const prisma = new PrismaClient()

async function main() {
  const alice = await prisma.user.upsert({
    where: { phone: '1111111111' },
    update: {},
    create: {
        phone: '1111111111',
      password: await bcrypt.hash('alice', 10),
      name: 'alice',
      balance: {
        create: {
            amount: 20000,
            locked: 0
        }
      },
      OnRampTransaction: {
        create: {
          createdAt: new Date(),
          status: "Success",
          amount: 20000,
          token: "token__1",
          provider: "HDFC Bank",
        },
      },
    },
  })
  const bob = await prisma.user.upsert({
    where: { phone: '2222222222' },
    update: {},
    create: {
        phone: '2222222222',
      password: await bcrypt.hash('bob', 10),
      name: 'bob',
      balance: {
        create: {
            amount: 2000,
            locked: 0
        }
      },
      OnRampTransaction: {
        create: {
          createdAt: new Date(),
          status: "Failure",
          amount: 2000,
          token: "token__2",
          provider: "HDFC Bank",
        },
      },
    },
  })
  // console.log({ alice, bob })

  const TestUser= await prisma.user.upsert({
    where: { phone: '1234567890' },
    update: {},
    create: {
        phone: '1234567890',
      password: await bcrypt.hash('Test@123', 10),
      name: 'Test User',
      balance: {
        create: {
            amount: 10000000,
            locked: 0
        }
      },
      OnRampTransaction: {
        create: {
          createdAt: new Date(),
          status: "Success",
          amount: 2000,
          token: "1234567890",
          provider: "HDFC Bank",
        },
      },
    },
  })
  // console.log({ TestUser })

  const TurboBank= await prisma.bank.upsert({
    where: { accountNumber: '7091010902' },
    update: {},
    create: {
        name: 'TurboBank',
        accountNumber: '7091010902',
        balance: 1000000000,
        userId: "Turbo_Bank",
        password: await bcrypt.hash('Turbo@111', 10),
    },
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })