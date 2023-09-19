/*
  Warnings:

  - You are about to drop the column `letakMultimedia` on the `Multimedia` table. All the data in the column will be lost.
  - Added the required column `lokasiMultimedia` to the `Multimedia` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Multimedia" DROP COLUMN "letakMultimedia",
ADD COLUMN     "lokasiMultimedia" TEXT NOT NULL;
