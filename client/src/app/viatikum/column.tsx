"use client";

import { toast } from "react-toastify";
import customFetch from "../../utils/customFetch";
import { Link, Form, redirect, useOutletContext } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import { Viatikum } from "../tabletype";
import { Button } from "@/components/ui/button";

import { useAllViatikumContext } from "../../pages/Viatikum";

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
import React from "react";

async function deleteViatikumItem(noViatikum: any) {
  try {
    await customFetch.delete(`/viatikum/${noViatikum}`);
    toast.success("Item deleted successfully");
    return redirect("/dashboard/viatikum");
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.msg) {
      toast.error(error.response.data.msg);
    } else {
      toast.error("An error occurred while deleting the item.");
    }
    return error;
  }
}

export const columns: ColumnDef<Viatikum>[] = [
  {
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          Nama
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorKey: "nama",
  },
  {
    header: "Kelompok",
    accessorKey: "kelompok",
  },
  {
    header: "Viatikum",
    accessorKey: "viatikum",
    cell: ({ row }) => {
      const viatikum = row.getValue("viatikum");

      const formattedMoney = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(viatikum as number);
      return <div className="font-medium">{formattedMoney}</div>;
    },
  },
  {
    header: "Pertahun",
    accessorKey: "pertahun",
    cell: ({ row }) => {
      const pertahun = row.getValue("pertahun");

      const formattedMoney = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(pertahun as number);
      return <div className="font-medium">{formattedMoney}</div>;
    },
  },
  {
    header: "Tahun",
    accessorKey: "tahun",
  },
  {
    header: "Keterangan",
    accessorKey: "keterangan",
    cell: ({ row }) => {
      const keterangan = row.getValue("keterangan");

      // Fungsi untuk mengganti baris baru dengan elemen <br>
      const formatTextWithLineBreaks = (text: any) => {
        const lines = text.split("\n");
        return lines.map((line: any, index: any) => (
          <React.Fragment key={index}>
            {line}
            {index < lines.length - 1 && <br />}
          </React.Fragment>
        ));
      };

      return (
        <div className="font-medium">
          {formatTextWithLineBreaks(keterangan)}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const Viatikum = row.original;
      const noViatikum = Viatikum.noViatikum;
      const { setDataTable } = useAllViatikumContext();

      // fetch ulang
      const refreshTable = async () => {
        const { data } = await customFetch.get("/viatikum");
        const { viatikum } = data;
        setDataTable(viatikum);
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
                navigator.clipboard.writeText(noViatikum.toString());
              }}
            >
              {" "}
              <Link to={`../viatikum/${noViatikum}`}>edit viatikum</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="pb-2 pl-2 rounded hover:bg-slate-300 cursor-pointer"
              onClick={async () => {
                try {
                  await deleteViatikumItem(noViatikum);
                  refreshTable();
                } catch (error: any) {
                  if (
                    error.response &&
                    error.response.data &&
                    error.response.data.msg
                  ) {
                    toast.error(error.response.data.msg);
                  } else {
                    toast.error("An error occurred while deleting viatikum.");
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
