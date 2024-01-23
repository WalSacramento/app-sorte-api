/*
  Warnings:

  - You are about to drop the `LuckyNumber` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_LuckyNumberToTicket` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LuckyNumber" DROP CONSTRAINT "LuckyNumber_drawId_fkey";

-- DropForeignKey
ALTER TABLE "_LuckyNumberToTicket" DROP CONSTRAINT "_LuckyNumberToTicket_A_fkey";

-- DropForeignKey
ALTER TABLE "_LuckyNumberToTicket" DROP CONSTRAINT "_LuckyNumberToTicket_B_fkey";

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "State" "State" NOT NULL DEFAULT 'AVALIABLE',
ADD COLUMN     "luckyNumber1" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "luckyNumber2" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "LuckyNumber";

-- DropTable
DROP TABLE "_LuckyNumberToTicket";
