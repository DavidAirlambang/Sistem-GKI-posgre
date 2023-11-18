import xlsx, { IJsonSheet } from "json-as-xlsx";
export function downloadToExcelGudang(data: any) {
  let columns: IJsonSheet[] = [
    {
      sheet: "Barang",
      columns: [
        { label: "Nama Barang", value: "namaBarang" },
        { label: "Jumlah Barang", value: "jumlahBarang" },
        { label: "Keterangan", value: "keterangan" },
        { label: "Lokasi Gudang", value: "lokasiGudang" },
        { label: "Nilai Aset", value: "nilaiAset" },
      ],
      content: data,
    },
  ];

  let settings = {
    fileName: "Gudang Excel",
  };

  xlsx(columns, settings);
}

export function downloadToExcelMultimedia(data: any) {
  let columns: IJsonSheet[] = [
    {
      sheet: "Multimedia",
      columns: [
        { label: "Nama Multimedia", value: "namaMultimedia" },
        { label: "Jenis Multimedia", value: "jenisMultimedia" },
        { label: "Jumlah Multimedia", value: "jumlahMultimedia" },
        { label: "Peminjam Multimedia", value: "peminjamMultimedia" },
        { label: "Keterangan", value: "deskripsiMultimedia" },
        { label: "Lokasi Multimedia", value: "lokasiMultimedia" },
        { label: "Nilai Aset", value: "nilaiAset" },
      ],
      content: data,
    },
  ];

  let settings = {
    fileName: "Multimedia Excel",
  };

  xlsx(columns, settings);
}

export function downloadToExcelAsetLain(data: any) {
  let columns: IJsonSheet[] = [
    {
      sheet: "AsetLain",
      columns: [
        { label: "Nama AsetLain", value: "namaAsetLain" },
        { label: "Jenis AsetLain", value: "jenisAsetLain" },
        { label: "Jumlah AsetLain", value: "jumlahAsetLain" },
        { label: "Peminjam AsetLain", value: "peminjamAsetLain" },
        { label: "Keterangan", value: "deskripsiAsetLain" },
        { label: "Lokasi AsetLain", value: "lokasiAsetLain" },
      ],
      content: data,
    },
  ];

  let settings = {
    fileName: "Aset Lain Excel",
  };

  xlsx(columns, settings);
}
export function downloadToExcelSuratMasuk(data: any) {
  // Fungsi untuk mengonversi tipe DateTime menjadi string tanggal dalam format "yyyy-mm-dd"
  function formatDateToYyyyMmDd(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // Mengonversi nilai tanggalMasuk dan tanggalSuratMasuk dalam data
  data = data.map((item: any) => ({
    ...item,
    tanggalMasuk: formatDateToYyyyMmDd(new Date(item.tanggalMasuk)),
    tanggalSuratMasuk: formatDateToYyyyMmDd(new Date(item.tanggalSuratMasuk)),
  }));

  let columns: IJsonSheet[] = [
    {
      sheet: "SuratMasuk",
      columns: [
        { label: "No Surat", value: "noSuratMasuk" },
        { label: "Tanggal Masuk", value: "tanggalMasuk" },
        { label: "Tanggal Surat", value: "tanggalSuratMasuk" },
        { label: "Pengirim", value: "pengirimMasuk" },
        { label: "Perihal", value: "perihalMasuk" },
        { label: "Event", value: "eventMasuk" },
        { label: "Disposisi", value: "disposisiMasuk" },
      ],
      content: data,
    },
  ];

  let settings = {
    fileName: "Surat Masuk Excel",
  };

  xlsx(columns, settings);
}

export function downloadToExcelSuratKeluar(data: any) {
  function formatDateToYyyyMmDd(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  data = data.map((item: any) => ({
    ...item,
    tanggalSuratKeluar: formatDateToYyyyMmDd(new Date(item.tanggalSuratKeluar)),
  }));

  let columns: IJsonSheet[] = [
    {
      sheet: "SuratKeluar",
      columns: [
        { label: "No Surat", value: "noSuratKeluar" },
        { label: "Tanggal Surat", value: "tanggalSuratKeluar" },
        { label: "Tujuan", value: "tujuanKeluar" },
        { label: "Perihal", value: "perihalKeluar" },
      ],
      content: data,
    },
  ];

  let settings = {
    fileName: "Surat Keluar Excel",
  };

  xlsx(columns, settings);
}

export function downloadToExcelAdministrasi(
  data: any,
  komisi: string,
  tipe: string
) {
  function formatDateToYyyyMmDd(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  data = data.map((item: any) => ({
    ...item,
    tanggalAdministrasi: formatDateToYyyyMmDd(
      new Date(item.tanggalAdministrasi)
    ),
  }));

  let columns: IJsonSheet[] = [
    {
      sheet: "Administrasi",
      columns: [
        { label: "Tanggal", value: "tanggalAdministrasi" },
        { label: "Nama Program", value: "namaProgram" },
        { label: "Nominal", value: "nominalAdministrasi" },
        { label: "Tipe", value: "tipeAdministrasi" },
        { label: "Penerima", value: "penerimaAdministrasi" },
        { label: "Uraian", value: "uraianAdministrasi" },
      ],
      content: data,
    },
  ];

  let settings = {
    fileName: `Administrasi ${tipe} ${komisi} Excel`,
  };

  xlsx(columns, settings);
}

export function downloadToExcelProgramKerja(data: any, komisi: string) {
  function formatDateToYyyyMmDd(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  data = data.map((item: any) => ({
    ...item,
    tanggalProker: formatDateToYyyyMmDd(new Date(item.tanggalProker)),
  }));

  let columns: IJsonSheet[] = [
    {
      sheet: "ProgramKerja",
      columns: [
        { label: "Kode Program", value: "kodeProgram" },
        { label: "Nama Program", value: "namaProgram" },
        { label: "Penanggung Jawab", value: "penanggungJawab" },
        { label: "Tujuan Kegiatan", value: "tujuanKegiatan" },
        { label: "Target Peserta", value: "targetPeserta" },
        { label: "Waktu Pelaksanaan", value: "waktuPelaksanaan" },
        { label: "Rincian Rencana", value: "rincianRencana" },
        { label: "Total Anggaran", value: "totalAnggaran" },
        { label: "Realisasi", value: "realisasi" },
        { label: "Status", value: "statusProker" },
        { label: "Tanggal", value: "tanggalProker" },
        { label: "Laporan", value: "laporanProker" },
      ],
      content: data,
    },
  ];

  let settings = {
    fileName: `Program Kerja ${komisi} Excel`,
  };

  xlsx(columns, settings);
}

export function downloadToExcelViatikum(data: any) {
  let columns: IJsonSheet[] = [
    {
      sheet: "Viatikum",
      columns: [
        { label: "Kode Program", value: "kodeProgram" },
        { label: "Nama", value: "nama" },
        { label: "Kelompok", value: "kelompok" },
        { label: "Viatikum", value: "viatikum" },
        { label: "Pertahun", value: "pertahun" },
        { label: "Tahun", value: "tahun" },
        { label: "Keterangan", value: "keterangan" },
      ],
      content: data,
    },
  ];

  let settings = {
    fileName: `Viatikum Excel`,
  };

  xlsx(columns, settings);
}

export function downloadToExcelLaporan(
  penerimaan: any,
  pengeluaran: any,
  komisi: string
) {
  function formatDateToYyyyMmDd(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  penerimaan = penerimaan.map((item: any) => ({
    ...item,
    tanggalAdministrasi: formatDateToYyyyMmDd(
      new Date(item.tanggalAdministrasi)
    ),
  }));

  pengeluaran = pengeluaran.map((item: any) => ({
    ...item,
    tanggalAdministrasi: formatDateToYyyyMmDd(
      new Date(item.tanggalAdministrasi)
    ),
  }));

  let columns: IJsonSheet[] = [
    {
      sheet: "Penerimaan",
      columns: [
        { label: "Tanggal", value: "tanggalAdministrasi" },
        { label: "Nama Program", value: "namaProgram" },
        { label: "Nominal", value: "nominalAdministrasi" },
        { label: "Tipe", value: "tipeAdministrasi" },
        { label: "Penerima", value: "penerimaAdministrasi" },
        { label: "Uraian", value: "uraianAdministrasi" },
      ],
      content: penerimaan,
    },
    {
      sheet: "Pengeluaran",
      columns: [
        { label: "Tanggal", value: "tanggalAdministrasi" },
        { label: "Nama Program", value: "namaProgram" },
        { label: "Nominal", value: "nominalAdministrasi" },
        { label: "Tipe", value: "tipeAdministrasi" },
        { label: "Penerima", value: "penerimaAdministrasi" },
        { label: "Uraian", value: "uraianAdministrasi" },
      ],
      content: pengeluaran,
    },
  ];

  let settings = {
    fileName: `Laporan Administrasi keuangan ${komisi} Excel`,
  };

  xlsx(columns, settings);
}

export function downloadToExcelUser(data: any) {
  let columns: IJsonSheet[] = [
    {
      sheet: "User",
      columns: [
        { label: "Nama User", value: "name" },
        { label: "Email User", value: "email" },
        { label: "Role User", value: "role" },
      ],
      content: data,
    },
  ];

  let settings = {
    fileName: "User Excel",
  };

  xlsx(columns, settings);
}
