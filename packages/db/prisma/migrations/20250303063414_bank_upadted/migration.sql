/*
  Warnings:

  - A unique constraint covering the columns `[accountNumber]` on the table `Bank` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Bank_accountNumber_key" ON "Bank"("accountNumber");
