-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ruangan" (
    "no_ruangan" TEXT NOT NULL,
    "nama_ruangan" TEXT NOT NULL,
    "kapasitas_ruangan" TEXT NOT NULL,
    "fasilitas_ruangan" TEXT[],
    "jadwal" TEXT NOT NULL,

    CONSTRAINT "Ruangan_pkey" PRIMARY KEY ("no_ruangan")
);

-- CreateTable
CREATE TABLE "Gudang" (
    "no_gudang" SERIAL NOT NULL,
    "kapasitas_gudang" TEXT NOT NULL,
    "kodefikasi_isi_gudang" TEXT NOT NULL,

    CONSTRAINT "Gudang_pkey" PRIMARY KEY ("no_gudang")
);

-- CreateTable
CREATE TABLE "Multimedia" (
    "id_multimedia" SERIAL NOT NULL,
    "kodefikasi_multimedia" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "jenis" TEXT NOT NULL,
    "kapasitas" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "letak" TEXT NOT NULL,
    "jumlah" INTEGER NOT NULL,

    CONSTRAINT "Multimedia_pkey" PRIMARY KEY ("id_multimedia")
);

-- CreateTable
CREATE TABLE "AsetLain" (
    "id_aset_lain" SERIAL NOT NULL,
    "kodefikasi_aset_lain" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "jenis" TEXT NOT NULL,
    "kapasitas" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "letak" TEXT NOT NULL,
    "jumlah" INTEGER NOT NULL,

    CONSTRAINT "AsetLain_pkey" PRIMARY KEY ("id_aset_lain")
);

-- CreateTable
CREATE TABLE "SuratMasuk" (
    "no_srt_msk" SERIAL NOT NULL,
    "tanggal_masuk" TIMESTAMP(3) NOT NULL,
    "tanggal_surat" TIMESTAMP(3) NOT NULL,
    "dari" TEXT NOT NULL,
    "perihal" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "disposisi" TEXT NOT NULL,

    CONSTRAINT "SuratMasuk_pkey" PRIMARY KEY ("no_srt_msk")
);

-- CreateTable
CREATE TABLE "SuratKeluar" (
    "no_surat" TEXT NOT NULL,
    "tanggal_srt_klr" TIMESTAMP(3) NOT NULL,
    "tujuan" TEXT NOT NULL,
    "perihal" TEXT NOT NULL,

    CONSTRAINT "SuratKeluar_pkey" PRIMARY KEY ("no_surat")
);

-- CreateTable
CREATE TABLE "AdministrasiKeuangan" (
    "no" SERIAL NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "uraian" TEXT NOT NULL,
    "debit" BOOLEAN NOT NULL,
    "kredit" BOOLEAN NOT NULL,
    "nominal" INTEGER NOT NULL,

    CONSTRAINT "AdministrasiKeuangan_pkey" PRIMARY KEY ("no")
);

-- CreateTable
CREATE TABLE "PengelolaanProgramKerja" (
    "no" SERIAL NOT NULL,
    "kode_program" TEXT NOT NULL,
    "komisi" TEXT NOT NULL,
    "nama_program" TEXT NOT NULL,
    "penanggung_jwb" TEXT NOT NULL,
    "tujuan_kegiatan" TEXT NOT NULL,
    "target_peserta" TEXT NOT NULL,
    "tgl_pelaksanaan" TEXT NOT NULL,
    "rincian_rencana" TEXT[],
    "nominal_rencana" INTEGER[],
    "anggaran_diajukan" INTEGER NOT NULL,
    "total_anggaran" INTEGER NOT NULL,
    "realisasi" INTEGER NOT NULL,

    CONSTRAINT "PengelolaanProgramKerja_pkey" PRIMARY KEY ("no")
);

-- CreateTable
CREATE TABLE "Viatikum" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "kelompok" TEXT[],
    "periode" TEXT NOT NULL,
    "nominal_viatikum" INTEGER NOT NULL,
    "nominal_total" INTEGER NOT NULL,
    "keterangan" TEXT NOT NULL,
    "id_user" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Viatikum_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PengelolaanProgramKerja_kode_program_key" ON "PengelolaanProgramKerja"("kode_program");

-- AddForeignKey
ALTER TABLE "Viatikum" ADD CONSTRAINT "Viatikum_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
