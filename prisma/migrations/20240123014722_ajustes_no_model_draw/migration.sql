-- AlterTable
ALTER TABLE "LuckyNumber" ADD COLUMN     "drawId" TEXT;

-- AddForeignKey
ALTER TABLE "LuckyNumber" ADD CONSTRAINT "LuckyNumber_drawId_fkey" FOREIGN KEY ("drawId") REFERENCES "Draw"("id") ON DELETE SET NULL ON UPDATE CASCADE;
