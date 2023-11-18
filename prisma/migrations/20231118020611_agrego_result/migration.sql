/*
  Warnings:

  - Added the required column `result` to the `Okr` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Okr" ADD COLUMN     "result" TEXT NOT NULL;
