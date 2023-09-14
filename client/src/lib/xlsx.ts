import xlsx, { IJsonSheet } from "json-as-xlsx";
export function downloadToExcel(data: any) {
  let columns: IJsonSheet[] = [
    {
      sheet: "Barang",
      columns: [
        { label: "Nama Barang", value: "namaBarang" },
        { label: "Jumlah Barang", value: "jumlahBarang" },
        { label: "Keterangan", value: "keterangan" },
        { label: "Lokasi Gudang", value: "lokasiGudang" },
        {
          label: "Last Update",
          value: (row) => new Date(row.updatedAt).toLocaleString(),
        },
      ],
      content: data,
    },
  ];

  let settings = {
    fileName: "Gudang Excel",
  };

  xlsx(columns, settings);
}
