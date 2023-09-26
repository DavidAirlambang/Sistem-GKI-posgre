"use client";

import { toast } from "react-toastify";
import customFetch from "../../utils/customFetch";
import { Link, Form, redirect, useOutletContext } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import { AsetLain } from "../tabletype";
import { Button } from "@/components/ui/button";

import { useAllAsetLainContext } from "../../pages/AsetLain";

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

async function deleteAsetLainItem(noAsetLain: any) {
  try {
    await customFetch.delete(`/asetLain/${noAsetLain}`);
    toast.success("Item deleted successfully");
    return redirect("/dashboard/asetLain");
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.msg) {
      toast.error(error.response.data.msg);
    } else {
      toast.error("An error occurred while deleting the item.");
    }
    return error;
  }
}

export const columns: ColumnDef<AsetLain>[] = [
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
          Nama AsetLain
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorKey: "namaAsetLain",
  },
  {
    header: "Jenis AsetLain",
    accessorKey: "jenisAsetLain",
  },
  {
    header: "Jumlah AsetLain",
    accessorKey: "jumlahAsetLain",
  },
  {
    header: "Peminjam AsetLain",
    accessorKey: "peminjamAsetLain",
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
          Lokasi AsetLain
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorKey: "lokasiAsetLain",
  },
  {
    header: "Keterangan",
    accessorKey: "deskripsiAsetLain",
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const AsetLain = row.original;
      const noAsetLain = AsetLain.noAsetLain;
      const { setDataTable } = useAllAsetLainContext();

      // fetch ulang
      const refreshTable = async () => {
        const { data } = await customFetch.get("/asetLain");
        const { asetLain } = data;
        console.log(asetLain);
        setDataTable(asetLain);
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
                navigator.clipboard.writeText(noAsetLain.toString());
              }}
            >
              {" "}
              <Link to={`../asetLain/${noAsetLain}`}>edit item</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="pb-2 pl-2 rounded hover:bg-slate-300 cursor-pointer"
              onClick={async () => {
                try {
                  await deleteAsetLainItem(noAsetLain);
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
