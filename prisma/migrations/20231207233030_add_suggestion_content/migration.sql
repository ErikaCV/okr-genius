/*
  Warnings:

  - Added the required column `content` to the `Suggestions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Suggestions" ADD COLUMN     "content" TEXT NOT NULL;
