"use client";

import { toast } from "react-toastify";
import customFetch from "../../utils/customFetch";
import { Link, Form, redirect, useOutletContext } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import { Multimedia } from "../tabletype";
import { Button } from "@/components/ui/button";

import { useAllMultimediaContext } from "../../pages/Multimedia";

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

async function deleteMultimediaItem(noMultimedia: any) {
  try {
    await customFetch.delete(`/multimedia/${noMultimedia}`);
    toast.success("Item deleted successfully");
    return redirect("/dashboard/multimedia");
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.msg) {
      toast.error(error.response.data.msg);
    } else {
      toast.error("An error occurred while deleting the item.");
    }
    return error;
  }
}

export const columns: ColumnDef<Multimedia>[] = [
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
          Nama Multimedia dan Kesenian
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorKey: "namaMultimedia",
  },
  {
    header: "Jenis Multimedia dan Kesenian",
    accessorKey: "jenisMultimedia",
  },
  {
    header: "Jumlah Multimedia dan Kesenian",
    accessorKey: "jumlahMultimedia",
  },
  {
    header: "Penanggung Jawab Multimedia dan Kesenian",
    accessorKey: "penaggungjawabMultimedia",
  },
  {
    header: "Peminjam Multimedia dan Kesenian",
    accessorKey: "peminjamMultimedia",
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
          Lokasi Multimedia
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorKey: "lokasiMultimedia",
  },
  {
    header: "Keterangan",
    accessorKey: "deskripsiMultimedia",
  },
  {
    header: "Nilai Aset",
    accessorKey: "nilaiAset",
    cell: ({ row }) => {
      const nilaiAset = row.getValue("nilaiAset");

      const formattedMoney = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(nilaiAset as number);
      return <div className="font-medium">{formattedMoney}</div>;
    },
  },
  // {
  //   header: "Last Update",
  //   accessorKey: "updatedAt",
  //   // modif
  //   cell: ({ row }) => {
  //     const updatedAt = row.getValue("updatedAt");
  //     const formatted = new Date(updatedAt as string).toLocaleString();
  //     return <div className="font-medium">{formatted}</div>;
  //   },
  // },
  {
    id: "actions",
    cell: ({ row }) => {
      const Multimedia = row.original;
      const noMultimedia = Multimedia.noMultimedia;
      const { setDataTable, pilihKomisi } = useAllMultimediaContext();

      // fetch ulang
      const refreshTable = async () => {
        const { data } = await customFetch.post("/multimedia/get", {
          penaggungjawabKomisi: pilihKomisi,
        });
        const { multimedia } = data;
        // console.log(multimedia);
        setDataTable(multimedia);
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
                navigator.clipboard.writeText(noMultimedia.toString());
              }}
            >
              {" "}
              <Link to={`../multimedia/${noMultimedia}`}>edit item</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="pb-2 pl-2 rounded hover:bg-slate-300 cursor-pointer"
              onClick={async () => {
                try {
                  await deleteMultimediaItem(noMultimedia);
                  refreshTable();
                } catch (error: any) {
                  if (
                    error.response &&
                    error.response.data &&
                    error.response.data.msg
                  ) {
                    toast.error(error.response.data.msg);
                  } else {
                    toast.error("An error occurred while deleting the item.");
                  }
                  return error;
                }
              }}
            >
              delete item
            </DropdownMenuItem>
            {/* sampe sini */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
