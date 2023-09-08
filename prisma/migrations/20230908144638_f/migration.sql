/*
  Warnings:

  - Added the required column `namaBarang` to the `Gudang` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Gudang" ADD COLUMN     "namaBarang" TEXT NOT NULL,
ALTER COLUMN "keterangan" SET DEFAULT '-';
