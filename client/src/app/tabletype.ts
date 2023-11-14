export type Barang = {
  jumlahBarang: number;
  keterangan: string;
  lokasiGudang: string;
  namaBarang: string;
  noBarang: number;
  createdAt: string;
  updatedAt: string;
};

export type Multimedia = {
  createdAt: string;
  updatedAt: string;
  noMultimedia: number;
  namaMultimedia: string;
  jenisMultimedia: string;
  jumlahMultimedia: number;
  peminjamMultimedia: string;
  deskripsiMultimedia: string;
  lokasiMultimedia: string;
};

export type AsetLain = {
  createdAt: string;
  updatedAt: string;
  noAsetLain: number;
  namaAsetLain: string;
  jenisAsetLain: string;
  jumlahAsetLain: number;
  peminjamAsetLain: string;
  deskripsiAsetLain: string;
  lokasiAsetLain: string;
};

export type SuratMasuk = {
  noSuratMasuk: string;
  tanggalMasuk: string;
  tanggalSuratMasuk: string;
  pengirimMasuk: string;
  perihalMasuk: string;
  eventMasuk: string;
  disposisiMasuk: string;
};

export type SuratKeluar = {
  noSuratKeluar: string;
  tanggalSuratKeluar: string;
  tujuanKeluar: string;
  perihalKeluar: string;
};

export type Administrasi = {
  noAdministrasi: number;
  tanggalAdministrasi: string;
  nominalAdministrasi: number;
  tipeAdministrasi: string;
  penerimaAdministrasi: string;
  uraianAdministrasi: string;
  namaProgram: string;
};

export type ProgramKerja = {
  noProker: number;
  komisi: string;
  namaProgram: string;
  penanggungJawab: string;
  tujuanKegiatan: string;
  targetPeserta: string;
  waktuPelaksanaan: string;
  rincianRencana: string;
  totalAnggaran: number;
  realisasi: number;
  statusProker: string;
  tanggalProker: string;
};

export type Viatikum = {
  noViatikum: number;
  nama: string;
  kelompok: string;
  viatikum: number;
  pertahun: number;
  tahun: number;
  keterangan: string;
};

export type User = {
  id: number;
  email: string;
  name: string;
  role: string;
};
