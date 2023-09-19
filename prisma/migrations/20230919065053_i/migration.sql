/*
  Warnings:

  - You are about to drop the column `PeminjamMultimedia` on the `Multimedia` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Multimedia" DROP COLUMN "PeminjamMultimedia",
ADD COLUMN     "peminjamMultimedia" TEXT NOT NULL DEFAULT '-';
