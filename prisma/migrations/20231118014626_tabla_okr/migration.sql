/*
  Warnings:

  - You are about to drop the `Prompt` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Result` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Prompt" DROP CONSTRAINT "Prompt_userId_fkey";

-- DropForeignKey
ALTER TABLE "Result" DROP CONSTRAINT "Result_promptId_fkey";

-- DropTable
DROP TABLE "Prompt";

-- DropTable
DROP TABLE "Result";

-- CreateTable
CREATE TABLE "Okr" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Okr_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Okr" ADD CONSTRAINT "Okr_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
