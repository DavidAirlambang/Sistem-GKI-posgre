/*
  Warnings:

  - The primary key for the `Multimedia` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `deskripsi` on the `Multimedia` table. All the data in the column will be lost.
  - You are about to drop the column `id_multimedia` on the `Multimedia` table. All the data in the column will be lost.
  - You are about to drop the column `jenis` on the `Multimedia` table. All the data in the column will be lost.
  - You are about to drop the column `jumlah` on the `Multimedia` table. All the data in the column will be lost.
  - You are about to drop the column `kapasitas` on the `Multimedia` table. All the data in the column will be lost.
  - You are about to drop the column `kodefikasi_multimedia` on the `Multimedia` table. All the data in the column will be lost.
  - You are about to drop the column `letak` on the `Multimedia` table. All the data in the column will be lost.
  - You are about to drop the column `nama` on the `Multimedia` table. All the data in the column will be lost.
  - Added the required column `PeminjamMultimedia` to the `Multimedia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deskripsiMultimedia` to the `Multimedia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jenisMultimedia` to the `Multimedia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jumlahMultimedia` to the `Multimedia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `letakMultimedia` to the `Multimedia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `namaMultimedia` to the `Multimedia` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Multimedia" DROP CONSTRAINT "Multimedia_pkey",
DROP COLUMN "deskripsi",
DROP COLUMN "id_multimedia",
DROP COLUMN "jenis",
DROP COLUMN "jumlah",
DROP COLUMN "kapasitas",
DROP COLUMN "kodefikasi_multimedia",
DROP COLUMN "letak",
DROP COLUMN "nama",
ADD COLUMN     "PeminjamMultimedia" TEXT NOT NULL,
ADD COLUMN     "deskripsiMultimedia" TEXT NOT NULL,
ADD COLUMN     "jenisMultimedia" TEXT NOT NULL,
ADD COLUMN     "jumlahMultimedia" INTEGER NOT NULL,
ADD COLUMN     "letakMultimedia" TEXT NOT NULL,
ADD COLUMN     "namaMultimedia" TEXT NOT NULL,
ADD COLUMN     "noMultimedia" SERIAL NOT NULL,
ADD CONSTRAINT "Multimedia_pkey" PRIMARY KEY ("noMultimedia");
