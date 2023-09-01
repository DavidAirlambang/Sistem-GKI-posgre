/*
  Warnings:

  - You are about to drop the column `userId` on the `Viatikum` table. All the data in the column will be lost.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Viatikum" DROP CONSTRAINT "Viatikum_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Viatikum" DROP COLUMN "userId";
