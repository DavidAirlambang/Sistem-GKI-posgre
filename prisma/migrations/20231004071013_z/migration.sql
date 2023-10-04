/*
  Warnings:

  - You are about to drop the column `debit` on the `AdministrasiKeuangan` table. All the data in the column will be lost.
  - You are about to drop the column `kredit` on the `AdministrasiKeuangan` table. All the data in the column will be lost.
  - Added the required column `penerima` to the `AdministrasiKeuangan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipe` to the `AdministrasiKeuangan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AdministrasiKeuangan" DROP COLUMN "debit",
DROP COLUMN "kredit",
ADD COLUMN     "penerima" TEXT NOT NULL,
ADD COLUMN     "tipe" TEXT NOT NULL,
ALTER COLUMN "tanggal" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "tanggal" SET DATA TYPE DATE,
ALTER COLUMN "uraian" SET DEFAULT '';

-- AlterTable
ALTER TABLE "SuratKeluar" ALTER COLUMN "tanggalSuratKeluar" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "tanggalSuratKeluar" SET DATA TYPE DATE;
