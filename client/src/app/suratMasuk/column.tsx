"use client";

import { toast } from "react-toastify";
import customFetch from "../../utils/customFetch";
import { Link, Form, redirect, useOutletContext } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import { SuratMasuk } from "../tabletype";
import { Button } from "@/components/ui/button";

import { useAllSuratMasukContext } from "../../pages/SuratMasuk";

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

async function deleteSuratMasukItem(noSuratMasuk: any) {
  try {
    await customFetch.delete(`/suratMasuk/${noSuratMasuk}`);
    toast.success("Item deleted successfully");
    return redirect("/dashboard/suratMasuk");
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.msg) {
      toast.error(error.response.data.msg);
    } else {
      toast.error("An error occurred while deleting the item.");
    }
    return error;
  }
}

export const columns: ColumnDef<SuratMasuk>[] = [
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
    accessorKey: "noSuratMasuk",
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
          Tanggal Masuk
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorKey: "tanggalMasuk",
    // modif
    cell: ({ row }) => {
      const tanggalMasuk = row.getValue("tanggalMasuk");
      const formatted = new Date(tanggalMasuk as string).toLocaleDateString();
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
          Tanggal Surat
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorKey: "tanggalSuratMasuk",
    // modif
    cell: ({ row }) => {
      const tanggalSuratMasuk = row.getValue("tanggalSuratMasuk");
      const formatted = new Date(
        tanggalSuratMasuk as string
      ).toLocaleDateString();
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    header: "Pengirim",
    accessorKey: "pengirimMasuk",
  },
  {
    header: "Perihal",
    accessorKey: "perihalMasuk",
  },
  {
    header: "Event",
    accessorKey: "eventMasuk",
  },
  {
    header: "Disposisi",
    accessorKey: "disposisiMasuk",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const SuratMasuk = row.original;
      const noSuratMasuk = SuratMasuk.noSuratMasuk;
      const { setDataTable } = useAllSuratMasukContext();

      // fetch ulang
      const refreshTable = async () => {
        const { data } = await customFetch.get("/suratMasuk");
        const { suratMasuk } = data;
        setDataTable(suratMasuk);
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
                navigator.clipboard.writeText(noSuratMasuk.toString());
              }}
            >
              {" "}
              <Link to={`../suratMasuk/${noSuratMasuk}`}>edit surat</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="pb-2 pl-2 rounded hover:bg-slate-300 cursor-pointer"
              onClick={async () => {
                try {
                  await deleteSuratMasukItem(noSuratMasuk);
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
            {/* sampe sini */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
