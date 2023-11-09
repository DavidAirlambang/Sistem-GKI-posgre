"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Administrasi } from "../tabletype";
import { Button } from "@/components/ui/button";

import { useAllAdministrasiContext } from "../../pages/Administrasi";

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

export const columns: ColumnDef<Administrasi>[] = [
  {
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          Tanggal 
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorKey: "tanggalAdministrasi",
    // modif
    cell: ({ row }) => {
      const tanggalAdministrasi = row.getValue("tanggalAdministrasi");
      const options = { day: "2-digit", month: "2-digit", year: "numeric" };
      const tanggalObj = new Date(tanggalAdministrasi as string);
      const day = String(tanggalObj.getDate()).padStart(2, "0");
      const month = String(tanggalObj.getMonth() + 1).padStart(2, "0");
      const year = tanggalObj.getFullYear();
      const formatted = `${day}/${month}/${year}`;
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          Nama Program
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorKey: "namaProgram",
  },
  {
    header: "Nominal",
    accessorKey: "nominalAdministrasi",
    cell: ({ row }) => {
      const nominalAdministrasi = row.getValue("nominalAdministrasi");

      const formattedMoney = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(nominalAdministrasi as number);
      return <div className="font-medium">{formattedMoney}</div>;
    },
  },

  {
    header: "Penerima",
    accessorKey: "penerimaAdministrasi",
  },
  {
    header: "Uraian",
    accessorKey: "uraianAdministrasi",
  },
];
