/*
  Warnings:

  - The primary key for the `AsetLain` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `deskripsi` on the `AsetLain` table. All the data in the column will be lost.
  - You are about to drop the column `id_aset_lain` on the `AsetLain` table. All the data in the column will be lost.
  - You are about to drop the column `jenis` on the `AsetLain` table. All the data in the column will be lost.
  - You are about to drop the column `jumlah` on the `AsetLain` table. All the data in the column will be lost.
  - You are about to drop the column `kapasitas` on the `AsetLain` table. All the data in the column will be lost.
  - You are about to drop the column `kodefikasi_aset_lain` on the `AsetLain` table. All the data in the column will be lost.
  - You are about to drop the column `letak` on the `AsetLain` table. All the data in the column will be lost.
  - You are about to drop the column `nama` on the `AsetLain` table. All the data in the column will be lost.
  - Added the required column `jenisAsetLain` to the `AsetLain` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jumlahAsetLain` to the `AsetLain` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lokasiAsetLain` to the `AsetLain` table without a default value. This is not possible if the table is not empty.
  - Added the required column `namaAsetLain` to the `AsetLain` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AsetLain" DROP CONSTRAINT "AsetLain_pkey",
DROP COLUMN "deskripsi",
DROP COLUMN "id_aset_lain",
DROP COLUMN "jenis",
DROP COLUMN "jumlah",
DROP COLUMN "kapasitas",
DROP COLUMN "kodefikasi_aset_lain",
DROP COLUMN "letak",
DROP COLUMN "nama",
ADD COLUMN     "deskripsiAsetLain" TEXT NOT NULL DEFAULT '-',
ADD COLUMN     "jenisAsetLain" TEXT NOT NULL,
ADD COLUMN     "jumlahAsetLain" INTEGER NOT NULL,
ADD COLUMN     "lokasiAsetLain" TEXT NOT NULL,
ADD COLUMN     "namaAsetLain" TEXT NOT NULL,
ADD COLUMN     "noAsetLain" SERIAL NOT NULL,
ADD COLUMN     "peminjamAsetLain" TEXT NOT NULL DEFAULT '-',
ADD CONSTRAINT "AsetLain_pkey" PRIMARY KEY ("noAsetLain");
