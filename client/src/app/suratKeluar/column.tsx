"use client";

import { toast } from "react-toastify";
import customFetch from "../../utils/customFetch";
import { Link, Form, redirect, useOutletContext } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import { SuratKeluar } from "../tabletype";
import { Button } from "@/components/ui/button";

import { useAllSuratKeluarContext } from "../../pages/SuratKeluar";

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

async function deleteSuratKeluarItem(noSuratKeluar: any) {
  try {
    await customFetch.delete(`/suratKeluar/${noSuratKeluar}`);
    toast.success("Item deleted successfully");
    return redirect("/dashboard/suratKeluar");
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.msg) {
      toast.error(error.response.data.msg);
    } else {
      toast.error("An error occurred while deleting the item.");
    }
    return error;
  }
}

export const columns: ColumnDef<SuratKeluar>[] = [
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
          Nomer Surat
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorKey: "noSuratKeluar",
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
          Tanggal Surat
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorKey: "tanggalSuratKeluar",
    // modif
    cell: ({ row }) => {
      const tanggalSuratKeluar = row.getValue("tanggalSuratKeluar");
      const options = { day: "2-digit", month: "2-digit", year: "numeric" };

      // Konversi tanggal menjadi objek Date
      const tanggalObj = new Date(tanggalSuratKeluar as string);

      // Ekstrak day, month, dan year dari tanggalObj
      const day = String(tanggalObj.getDate()).padStart(2, "0");
      const month = String(tanggalObj.getMonth() + 1).padStart(2, "0"); // Bulan dimulai dari 0, jadi perlu ditambahkan 1
      const year = tanggalObj.getFullYear();

      // Format tanggal sesuai dengan "dd/mm/yyyy"
      const formatted = `${day}/${month}/${year}`;

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    header: "Tujuan",
    accessorKey: "tujuanKeluar",
  },
  {
    header: "Perihal",
    accessorKey: "perihalKeluar",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const SuratKeluar = row.original;
      const noSuratKeluar = SuratKeluar.noSuratKeluar;
      const { setDataTable } = useAllSuratKeluarContext();

      // fetch ulang
      const refreshTable = async () => {
        const { data } = await customFetch.get("/suratKeluar");
        const { suratKeluar } = data;
        setDataTable(suratKeluar);
      };

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
              className="pb-2 pl-2 rounded hover:bg-slate-300 cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(noSuratKeluar.toString());
              }}
            >
              {" "}
              <Link to={`../suratKeluar/${noSuratKeluar}`}>edit surat</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="pb-2 pl-2 rounded hover:bg-slate-300 cursor-pointer"
              onClick={async () => {
                try {
                  await deleteSuratKeluarItem(noSuratKeluar);
                  refreshTable();
                } catch (error: any) {
                  if (
                    error.response &&
                    error.response.data &&
                    error.response.data.msg
                  ) {
                    toast.error(error.response.data.msg);
                  } else {
                    toast.error("An error occurred while deleting surat.");
                  }
                  return error;
                }
              }}
            >
              delete surat
            </DropdownMenuItem>
            {/* sampe sini */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
