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
