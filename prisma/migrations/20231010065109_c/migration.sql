/*
  Warnings:

  - You are about to drop the column `anggaran_diajukan` on the `PengelolaanProgramKerja` table. All the data in the column will be lost.
  - You are about to drop the column `kode_program` on the `PengelolaanProgramKerja` table. All the data in the column will be lost.
  - You are about to drop the column `nama_program` on the `PengelolaanProgramKerja` table. All the data in the column will be lost.
  - You are about to drop the column `nominal_rencana` on the `PengelolaanProgramKerja` table. All the data in the column will be lost.
  - You are about to drop the column `penanggung_jwb` on the `PengelolaanProgramKerja` table. All the data in the column will be lost.
  - You are about to drop the column `rincian_rencana` on the `PengelolaanProgramKerja` table. All the data in the column will be lost.
  - You are about to drop the column `target_peserta` on the `PengelolaanProgramKerja` table. All the data in the column will be lost.
  - You are about to drop the column `tgl_pelaksanaan` on the `PengelolaanProgramKerja` table. All the data in the column will be lost.
  - You are about to drop the column `total_anggaran` on the `PengelolaanProgramKerja` table. All the data in the column will be lost.
  - You are about to drop the column `tujuan_kegiatan` on the `PengelolaanProgramKerja` table. All the data in the column will be lost.
  - Added the required column `namaProgram` to the `PengelolaanProgramKerja` table without a default value. This is not possible if the table is not empty.
  - Added the required column `penanggungJawab` to the `PengelolaanProgramKerja` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetPeserta` to the `PengelolaanProgramKerja` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalAnggaran` to the `PengelolaanProgramKerja` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tujuanKegiatan` to the `PengelolaanProgramKerja` table without a default value. This is not possible if the table is not empty.
  - Added the required column `waktuPelaksanaan` to the `PengelolaanProgramKerja` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "PengelolaanProgramKerja_kode_program_key";

-- AlterTable
ALTER TABLE "PengelolaanProgramKerja" DROP COLUMN "anggaran_diajukan",
DROP COLUMN "kode_program",
DROP COLUMN "nama_program",
DROP COLUMN "nominal_rencana",
DROP COLUMN "penanggung_jwb",
DROP COLUMN "rincian_rencana",
DROP COLUMN "target_peserta",
DROP COLUMN "tgl_pelaksanaan",
DROP COLUMN "total_anggaran",
DROP COLUMN "tujuan_kegiatan",
ADD COLUMN     "namaProgram" TEXT NOT NULL,
ADD COLUMN     "penanggungJawab" TEXT NOT NULL,
ADD COLUMN     "rincianRencana" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "statusProker" TEXT NOT NULL DEFAULT 'pending',
ADD COLUMN     "targetPeserta" TEXT NOT NULL,
ADD COLUMN     "totalAnggaran" INTEGER NOT NULL,
ADD COLUMN     "tujuanKegiatan" TEXT NOT NULL,
ADD COLUMN     "waktuPelaksanaan" TEXT NOT NULL;
