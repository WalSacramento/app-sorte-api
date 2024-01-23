/*
  Warnings:

  - You are about to drop the `LuckyNumbers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LuckyNumbers" DROP CONSTRAINT "LuckyNumbers_drawId_fkey";

-- DropTable
DROP TABLE "LuckyNumbers";

-- CreateTable
CREATE TABLE "LuckyNumber" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "state" "State" NOT NULL,
    "drawId" TEXT NOT NULL,

    CONSTRAINT "LuckyNumber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "drawId" TEXT NOT NULL,
    "luckyNumber1Id" TEXT NOT NULL,
    "luckyNumber2Id" TEXT NOT NULL,
    "buyerName" TEXT,
    "buyerPhoneNumber" TEXT,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LuckyNumber" ADD CONSTRAINT "LuckyNumber_drawId_fkey" FOREIGN KEY ("drawId") REFERENCES "Draw"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_drawId_fkey" FOREIGN KEY ("drawId") REFERENCES "Draw"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_luckyNumber1Id_fkey" FOREIGN KEY ("luckyNumber1Id") REFERENCES "LuckyNumber"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_luckyNumber2Id_fkey" FOREIGN KEY ("luckyNumber2Id") REFERENCES "LuckyNumber"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
