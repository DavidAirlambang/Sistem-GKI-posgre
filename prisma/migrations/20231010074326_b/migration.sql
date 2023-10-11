/*
  Warnings:

  - You are about to drop the `PengelolaanProgramKerja` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "PengelolaanProgramKerja";

-- CreateTable
CREATE TABLE "ProgramKerja" (
    "no" SERIAL NOT NULL,
    "komisi" TEXT NOT NULL,
    "namaProgram" TEXT NOT NULL,
    "penanggungJawab" TEXT NOT NULL,
    "tujuanKegiatan" TEXT NOT NULL,
    "targetPeserta" TEXT NOT NULL,
    "waktuPelaksanaan" TEXT NOT NULL,
    "rincianRencana" TEXT NOT NULL DEFAULT '',
    "totalAnggaran" INTEGER NOT NULL,
    "realisasi" INTEGER NOT NULL,
    "statusProker" TEXT NOT NULL DEFAULT 'pending',
    "tanggalProker" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProgramKerja_pkey" PRIMARY KEY ("no")
);
