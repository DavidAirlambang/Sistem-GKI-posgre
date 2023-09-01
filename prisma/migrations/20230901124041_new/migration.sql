/*
  Warnings:

  - The primary key for the `Ruangan` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `fasilitas_ruangan` on the `Ruangan` table. All the data in the column will be lost.
  - You are about to drop the column `kapasitas_ruangan` on the `Ruangan` table. All the data in the column will be lost.
  - You are about to drop the column `nama_ruangan` on the `Ruangan` table. All the data in the column will be lost.
  - You are about to drop the column `no_ruangan` on the `Ruangan` table. All the data in the column will be lost.
  - Added the required column `kapasitasRuangan` to the `Ruangan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `namaRuangan` to the `Ruangan` table without a default value. This is not possible if the table is not empty.
  - The required column `noRuangan` was added to the `Ruangan` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Ruangan" DROP CONSTRAINT "Ruangan_pkey",
DROP COLUMN "fasilitas_ruangan",
DROP COLUMN "kapasitas_ruangan",
DROP COLUMN "nama_ruangan",
DROP COLUMN "no_ruangan",
ADD COLUMN     "fasilitasRuangan" TEXT[],
ADD COLUMN     "kapasitasRuangan" TEXT NOT NULL,
ADD COLUMN     "namaRuangan" TEXT NOT NULL,
ADD COLUMN     "noRuangan" TEXT NOT NULL,
ADD CONSTRAINT "Ruangan_pkey" PRIMARY KEY ("noRuangan");
