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
