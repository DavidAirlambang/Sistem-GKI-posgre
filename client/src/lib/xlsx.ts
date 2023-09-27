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
