"use client";

import { toast } from "react-toastify";
import customFetch from "../../utils/customFetch";
import { Link, Form, redirect, useOutletContext } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import { Administrasi } from "../tabletype";
import { Button } from "@/components/ui/button";

import { useAllPengeluaranContext } from "../../pages/Pengeluaran";

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

async function deleteAdministrasiItem(
  noAdministrasi: any,
  nominalAdministrasi: any,
  namaProgram: string
) {
  try {
    await customFetch.delete(`/administrasi/${noAdministrasi}`);

    // kurangin pengeluaran
    await customFetch.post("/proker/realisasi", {
      namaProgram: namaProgram,
      realisasi: -nominalAdministrasi,
    });

    toast.success("Item deleted successfully");
    return redirect("/dashboard/administrasi");
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.msg) {
      toast.error(error.response.data.msg);
    } else {
      toast.error("An error occurred while deleting the item.");
    }
    return error;
  }
}

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
  {
    id: "actions",
    cell: ({ row }) => {
      const Administrasi = row.original;
      const namaProgram = Administrasi.namaProgram;
      const noAdministrasi = Administrasi.noAdministrasi;
      const nominalAdministrasi = Administrasi.nominalAdministrasi;
      const { setDataTable, komisiTable } = useAllPengeluaranContext();

      // fetch ulang
      const refreshTable = async () => {
        const { data } = await customFetch.post("/administrasi", {
          penerima: komisiTable,
          tipeAdministrasi: "kredit",
        });
        const { administrasi } = data;
        setDataTable(administrasi);
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
            {/* <DropdownMenuItem
              className="pb-2 pl-2 rounded hover:bg-slate-300 cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(noAdministrasi.toString());
              }}
            >
              {" "}
              <Link to={`../Administrasi/${noAdministrasi}`}>edit</Link>
            </DropdownMenuItem> */}
            <DropdownMenuItem
              className="pb-2 pl-2 rounded hover:bg-slate-300 cursor-pointer"
              onClick={async () => {
                try {
                  await deleteAdministrasiItem(
                    noAdministrasi,
                    nominalAdministrasi,
                    namaProgram
                  );
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
              delete item
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
