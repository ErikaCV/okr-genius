/*
  Warnings:

  - You are about to drop the column `priority` on the `Okr` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Okr` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Okr" DROP COLUMN "priority",
DROP COLUMN "state";

-- CreateTable
CREATE TABLE "Suggestions" (
    "id" SERIAL NOT NULL,
    "priority" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "okrId" INTEGER NOT NULL,

    CONSTRAINT "Suggestions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Suggestions" ADD CONSTRAINT "Suggestions_okrId_fkey" FOREIGN KEY ("okrId") REFERENCES "Okr"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
