/*
  Warnings:

  - The values [AVALIABLE] on the enum `State` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "State_new" AS ENUM ('AVAILABLE', 'UNAVALIABLE', 'RESERVED');
ALTER TABLE "Ticket" ALTER COLUMN "State" DROP DEFAULT;
ALTER TABLE "Ticket" ALTER COLUMN "State" TYPE "State_new" USING ("State"::text::"State_new");
ALTER TYPE "State" RENAME TO "State_old";
ALTER TYPE "State_new" RENAME TO "State";
DROP TYPE "State_old";
ALTER TABLE "Ticket" ALTER COLUMN "State" SET DEFAULT 'AVAILABLE';
COMMIT;

-- AlterTable
ALTER TABLE "Ticket" ALTER COLUMN "State" SET DEFAULT 'AVAILABLE';
