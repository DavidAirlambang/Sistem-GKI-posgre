import { ColumnDef } from "@tanstack/react-table";
import { Barang } from "../tabletype";

export const columns: ColumnDef<Barang>[] = [
  {
    header: "Nama Barang",
    accessorKey: "namaBarang",
  },
  {
    header: "Jumlah Barang",
    accessorKey: "jumlahBarang",
  },
  {
    header: "Lokasi Gudang",
    accessorKey: "lokasiGudang",
  },
  {
    header: "Keterangan",
    accessorKey: "keterangan",
  },
  {
    header: "Last Update",
    accessorKey: "updatedAt",
  },
];
