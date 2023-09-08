/*
  Warnings:

  - The primary key for the `Gudang` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `kapasitas_gudang` on the `Gudang` table. All the data in the column will be lost.
  - You are about to drop the column `kodefikasi_isi_gudang` on the `Gudang` table. All the data in the column will be lost.
  - You are about to drop the column `no_gudang` on the `Gudang` table. All the data in the column will be lost.
  - Added the required column `jumlahBarang` to the `Gudang` table without a default value. This is not possible if the table is not empty.
  - Added the required column `keterangan` to the `Gudang` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lokasiGudang` to the `Gudang` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Gudang` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Gudang" DROP CONSTRAINT "Gudang_pkey",
DROP COLUMN "kapasitas_gudang",
DROP COLUMN "kodefikasi_isi_gudang",
DROP COLUMN "no_gudang",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "jumlahBarang" INTEGER NOT NULL,
ADD COLUMN     "keterangan" TEXT NOT NULL,
ADD COLUMN     "lokasiGudang" TEXT NOT NULL,
ADD COLUMN     "noBarang" SERIAL NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "Gudang_pkey" PRIMARY KEY ("noBarang");
