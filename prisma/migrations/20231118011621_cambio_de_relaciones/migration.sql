/*
  Warnings:

  - You are about to drop the column `userId` on the `Result` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Result" DROP CONSTRAINT "Result_userId_fkey";

-- AlterTable
ALTER TABLE "Result" DROP COLUMN "userId";
