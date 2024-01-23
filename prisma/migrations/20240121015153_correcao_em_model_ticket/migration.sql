/*
  Warnings:

  - You are about to drop the column `drawId` on the `LuckyNumber` table. All the data in the column will be lost.
  - You are about to drop the column `luckyNumber1Id` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `luckyNumber2Id` on the `Ticket` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "LuckyNumber" DROP CONSTRAINT "LuckyNumber_drawId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_luckyNumber1Id_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_luckyNumber2Id_fkey";

-- AlterTable
ALTER TABLE "LuckyNumber" DROP COLUMN "drawId";

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "luckyNumber1Id",
DROP COLUMN "luckyNumber2Id";

-- CreateTable
CREATE TABLE "_LuckyNumberToTicket" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_LuckyNumberToTicket_AB_unique" ON "_LuckyNumberToTicket"("A", "B");

-- CreateIndex
CREATE INDEX "_LuckyNumberToTicket_B_index" ON "_LuckyNumberToTicket"("B");

-- AddForeignKey
ALTER TABLE "_LuckyNumberToTicket" ADD CONSTRAINT "_LuckyNumberToTicket_A_fkey" FOREIGN KEY ("A") REFERENCES "LuckyNumber"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LuckyNumberToTicket" ADD CONSTRAINT "_LuckyNumberToTicket_B_fkey" FOREIGN KEY ("B") REFERENCES "Ticket"("id") ON DELETE CASCADE ON UPDATE CASCADE;
