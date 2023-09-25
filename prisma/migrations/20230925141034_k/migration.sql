/*
  Warnings:

  - The primary key for the `SuratKeluar` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `no_surat` on the `SuratKeluar` table. All the data in the column will be lost.
  - You are about to drop the column `perihal` on the `SuratKeluar` table. All the data in the column will be lost.
  - You are about to drop the column `tanggal_srt_klr` on the `SuratKeluar` table. All the data in the column will be lost.
  - You are about to drop the column `tujuan` on the `SuratKeluar` table. All the data in the column will be lost.
  - The primary key for the `SuratMasuk` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `dari` on the `SuratMasuk` table. All the data in the column will be lost.
  - You are about to drop the column `disposisi` on the `SuratMasuk` table. All the data in the column will be lost.
  - You are about to drop the column `event` on the `SuratMasuk` table. All the data in the column will be lost.
  - You are about to drop the column `no_srt_msk` on the `SuratMasuk` table. All the data in the column will be lost.
  - You are about to drop the column `perihal` on the `SuratMasuk` table. All the data in the column will be lost.
  - You are about to drop the column `tanggal_masuk` on the `SuratMasuk` table. All the data in the column will be lost.
  - You are about to drop the column `tanggal_surat` on the `SuratMasuk` table. All the data in the column will be lost.
  - The required column `noSuratKeluar` was added to the `SuratKeluar` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `perihalKeluar` to the `SuratKeluar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggalSuratKeluar` to the `SuratKeluar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tujuanKeluar` to the `SuratKeluar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `disposisiMasuk` to the `SuratMasuk` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventMasuk` to the `SuratMasuk` table without a default value. This is not possible if the table is not empty.
  - The required column `noSuratMasuk` was added to the `SuratMasuk` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `pengirimMasuk` to the `SuratMasuk` table without a default value. This is not possible if the table is not empty.
  - Added the required column `perihalMasuk` to the `SuratMasuk` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggalMasuk` to the `SuratMasuk` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggalSuratMasuk` to the `SuratMasuk` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SuratKeluar" DROP CONSTRAINT "SuratKeluar_pkey",
DROP COLUMN "no_surat",
DROP COLUMN "perihal",
DROP COLUMN "tanggal_srt_klr",
DROP COLUMN "tujuan",
ADD COLUMN     "noSuratKeluar" TEXT NOT NULL,
ADD COLUMN     "perihalKeluar" TEXT NOT NULL,
ADD COLUMN     "tanggalSuratKeluar" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "tujuanKeluar" TEXT NOT NULL,
ADD CONSTRAINT "SuratKeluar_pkey" PRIMARY KEY ("noSuratKeluar");

-- AlterTable
ALTER TABLE "SuratMasuk" DROP CONSTRAINT "SuratMasuk_pkey",
DROP COLUMN "dari",
DROP COLUMN "disposisi",
DROP COLUMN "event",
DROP COLUMN "no_srt_msk",
DROP COLUMN "perihal",
DROP COLUMN "tanggal_masuk",
DROP COLUMN "tanggal_surat",
ADD COLUMN     "disposisiMasuk" TEXT NOT NULL,
ADD COLUMN     "eventMasuk" TEXT NOT NULL,
ADD COLUMN     "noSuratMasuk" TEXT NOT NULL,
ADD COLUMN     "pengirimMasuk" TEXT NOT NULL,
ADD COLUMN     "perihalMasuk" TEXT NOT NULL,
ADD COLUMN     "tanggalMasuk" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "tanggalSuratMasuk" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "SuratMasuk_pkey" PRIMARY KEY ("noSuratMasuk");
