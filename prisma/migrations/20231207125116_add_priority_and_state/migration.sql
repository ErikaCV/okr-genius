/*
  Warnings:

  - Added the required column `priority` to the `Okr` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Okr` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Okr" ADD COLUMN     "priority" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL;
