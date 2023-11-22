-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'no role',
    "active" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ruangan" (
    "noRuangan" TEXT NOT NULL,
    "namaRuangan" TEXT NOT NULL,
    "kapasitasRuangan" TEXT NOT NULL,
    "keteranganProjector" TEXT NOT NULL DEFAULT '-',
    "keteranganSoundSystem" TEXT NOT NULL DEFAULT '-',
    "jadwal" TEXT NOT NULL DEFAULT '-',
    "statusRuangan" TEXT NOT NULL DEFAULT 'Available',
    "komisi" TEXT NOT NULL DEFAULT '-',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Ruangan_pkey" PRIMARY KEY ("noRuangan")
);

-- CreateTable
CREATE TABLE "Gudang" (
    "noBarang" SERIAL NOT NULL,
    "namaBarang" TEXT NOT NULL,
    "jumlahBarang" INTEGER NOT NULL,
    "lokasiGudang" TEXT NOT NULL,
    "keterangan" TEXT NOT NULL DEFAULT '-',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nilaiAset" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Gudang_pkey" PRIMARY KEY ("noBarang")
);

-- CreateTable
CREATE TABLE "Multimedia" (
    "noMultimedia" SERIAL NOT NULL,
    "namaMultimedia" TEXT NOT NULL,
    "jenisMultimedia" TEXT NOT NULL,
    "lokasiMultimedia" TEXT NOT NULL,
    "jumlahMultimedia" INTEGER NOT NULL,
    "peminjamMultimedia" TEXT NOT NULL DEFAULT '-',
    "deskripsiMultimedia" TEXT NOT NULL DEFAULT '-',
    "nilaiAset" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Multimedia_pkey" PRIMARY KEY ("noMultimedia")
);

-- CreateTable
CREATE TABLE "AsetLain" (
    "noAsetLain" SERIAL NOT NULL,
    "namaAsetLain" TEXT NOT NULL,
    "jenisAsetLain" TEXT NOT NULL,
    "lokasiAsetLain" TEXT NOT NULL,
    "jumlahAsetLain" INTEGER NOT NULL,
    "peminjamAsetLain" TEXT NOT NULL DEFAULT '-',
    "deskripsiAsetLain" TEXT NOT NULL DEFAULT '-',
    "nilaiAset" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "AsetLain_pkey" PRIMARY KEY ("noAsetLain")
);

-- CreateTable
CREATE TABLE "SuratMasuk" (
    "noSuratMasuk" TEXT NOT NULL,
    "tanggalMasuk" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggalSuratMasuk" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pengirimMasuk" TEXT NOT NULL,
    "perihalMasuk" TEXT NOT NULL,
    "eventMasuk" TEXT NOT NULL,
    "disposisiMasuk" TEXT NOT NULL,

    CONSTRAINT "SuratMasuk_pkey" PRIMARY KEY ("noSuratMasuk")
);

-- CreateTable
CREATE TABLE "SuratKeluar" (
    "noSuratKeluar" TEXT NOT NULL,
    "tanggalSuratKeluar" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tujuanKeluar" TEXT NOT NULL,
    "perihalKeluar" TEXT NOT NULL,

    CONSTRAINT "SuratKeluar_pkey" PRIMARY KEY ("noSuratKeluar")
);

-- CreateTable
CREATE TABLE "AdministrasiKeuangan" (
    "noAdministrasi" SERIAL NOT NULL,
    "namaProgram" TEXT NOT NULL,
    "tanggalAdministrasi" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nominalAdministrasi" INTEGER NOT NULL,
    "tipeAdministrasi" TEXT NOT NULL,
    "penerimaAdministrasi" TEXT NOT NULL,
    "uraianAdministrasi" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "AdministrasiKeuangan_pkey" PRIMARY KEY ("noAdministrasi")
);

-- CreateTable
CREATE TABLE "ProgramKerja" (
    "noProker" SERIAL NOT NULL,
    "kodeProgram" TEXT NOT NULL,
    "tahun" INTEGER NOT NULL DEFAULT EXTRACT(YEAR FROM CURRENT_DATE),
    "komisi" TEXT NOT NULL,
    "namaProgram" TEXT NOT NULL,
    "penanggungJawab" TEXT NOT NULL,
    "tujuanKegiatan" TEXT NOT NULL,
    "targetPeserta" TEXT NOT NULL,
    "waktuPelaksanaan" TEXT NOT NULL,
    "rincianRencana" TEXT NOT NULL DEFAULT '',
    "totalAnggaran" INTEGER NOT NULL,
    "realisasi" INTEGER NOT NULL DEFAULT 0,
    "statusProker" TEXT NOT NULL DEFAULT 'Pending',
    "tanggalProker" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "laporanProker" TEXT NOT NULL DEFAULT '-',

    CONSTRAINT "ProgramKerja_pkey" PRIMARY KEY ("noProker")
);

-- CreateTable
CREATE TABLE "Viatikum" (
    "noViatikum" SERIAL NOT NULL,
    "kodeProgram" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "kelompok" TEXT NOT NULL,
    "viatikum" INTEGER NOT NULL,
    "pertahun" INTEGER NOT NULL,
    "tahun" INTEGER NOT NULL,
    "keterangan" TEXT NOT NULL DEFAULT '-',

    CONSTRAINT "Viatikum_pkey" PRIMARY KEY ("noViatikum")
);

-- CreateTable
CREATE TABLE "Log" (
    "noLog" SERIAL NOT NULL,
    "tanggalLog" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER,
    "kategoriLog" TEXT NOT NULL,
    "actionLog" TEXT NOT NULL,
    "keterangan" TEXT NOT NULL,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("noLog")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "SuratMasuk_noSuratMasuk_key" ON "SuratMasuk"("noSuratMasuk");

-- CreateIndex
CREATE UNIQUE INDEX "Viatikum_kodeProgram_key" ON "Viatikum"("kodeProgram");

-- AddForeignKey
ALTER TABLE "Ruangan" ADD CONSTRAINT "Ruangan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
