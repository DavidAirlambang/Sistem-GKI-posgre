/*
  Warnings:

  - The primary key for the `AdministrasiKeuangan` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `no` on the `AdministrasiKeuangan` table. All the data in the column will be lost.
  - You are about to drop the column `nominal` on the `AdministrasiKeuangan` table. All the data in the column will be lost.
  - You are about to drop the column `penerima` on the `AdministrasiKeuangan` table. All the data in the column will be lost.
  - You are about to drop the column `tanggal` on the `AdministrasiKeuangan` table. All the data in the column will be lost.
  - You are about to drop the column `tipe` on the `AdministrasiKeuangan` table. All the data in the column will be lost.
  - You are about to drop the column `uraian` on the `AdministrasiKeuangan` table. All the data in the column will be lost.
  - Added the required column `nominalAdministrasi` to the `AdministrasiKeuangan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `penerimaAdministrasi` to the `AdministrasiKeuangan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipeAdministrasi` to the `AdministrasiKeuangan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AdministrasiKeuangan" DROP CONSTRAINT "AdministrasiKeuangan_pkey",
DROP COLUMN "no",
DROP COLUMN "nominal",
DROP COLUMN "penerima",
DROP COLUMN "tanggal",
DROP COLUMN "tipe",
DROP COLUMN "uraian",
ADD COLUMN     "noAdministrasi" SERIAL NOT NULL,
ADD COLUMN     "nominalAdministrasi" INTEGER NOT NULL,
ADD COLUMN     "penerimaAdministrasi" TEXT NOT NULL,
ADD COLUMN     "tanggalAdministrasi" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "tipeAdministrasi" TEXT NOT NULL,
ADD COLUMN     "uraianAdministrasi" TEXT NOT NULL DEFAULT '',
ADD CONSTRAINT "AdministrasiKeuangan_pkey" PRIMARY KEY ("noAdministrasi");
