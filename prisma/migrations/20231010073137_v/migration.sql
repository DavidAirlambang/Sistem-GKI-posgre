/*
  Warnings:

  - You are about to drop the column `tahun` on the `PengelolaanProgramKerja` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PengelolaanProgramKerja" DROP COLUMN "tahun",
ADD COLUMN     "tanggalProker" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP;
