/*
  Warnings:

  - You are about to drop the column `userId` on the `Ruangan` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Ruangan" DROP CONSTRAINT "Ruangan_userId_fkey";

-- AlterTable
ALTER TABLE "Ruangan" DROP COLUMN "userId";
