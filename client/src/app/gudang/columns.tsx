"use client";

import { toast } from "react-toastify";
import customFetch from "../../utils/customFetch";
import { Link, Form, redirect, useOutletContext } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import { Barang } from "../tabletype";
import { Button } from "@/components/ui/button";

import { useAllGudangContext } from "../../pages/Gudang";

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

async function deleteGudangItem(noBarang: any) {
  try {
    await customFetch.delete(`/gudang/${noBarang}`);
    toast.success("Item deleted successfully");
    return redirect("/dashboard/gudang");
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.msg) {
      toast.error(error.response.data.msg);
    } else {
      toast.error("An error occurred while deleting the item.");
    }
    return error;
  }
}

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
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          Lokasi Gudang
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
      const { setDataTable } = useAllGudangContext();

      // fetch ulang
      const refreshTable = async () => {
        const { data } = await customFetch.get("/gudang");
        const { barangs } = data;
        console.log(barangs);
        setDataTable(barangs);
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
                navigator.clipboard.writeText(noBarang.toString());
              }}
            >
              {" "}
              <Link to={`../gudang/${noBarang}`}>edit item</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="pb-2 pl-2 rounded hover:bg-slate-300 cursor-pointer"
              onClick={async () => {
                try {
                  await deleteGudangItem(noBarang);
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
