"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Barang } from "../tabletype";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@radix-ui/react-dropdown-menu";

export const columns: ColumnDef<Barang>[] = [
  {
    // sort by name
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          Nama Barang
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
    // modif
    cell: ({ row }) => {
      const updatedAt = row.getValue("updatedAt");
      const formatted = new Date(updatedAt as string).toLocaleString();
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const barang = row.original;
      const noBarang = barang.noBarang;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} className="w-8 h-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel className="font-bold pb-3">
              Actions
            </DropdownMenuLabel>
            {/* ganti jdi action yang diinginkan */}
            <DropdownMenuItem
              className="pb-2 hover:backdrop-blur-sm"
              onClick={() => {
                navigator.clipboard.writeText(noBarang.toString());
              }}
            >
              copy barang
            </DropdownMenuItem>
            {/* sampe sini */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
