"use client";

import { toast } from "react-toastify";
import customFetch from "../../utils/customFetch";
import { Link, Form, redirect, useOutletContext } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import { ProgramKerja } from "../tabletype";
import { Button } from "@/components/ui/button";

import { useAllProgramKerjaContext } from "../../pages/ProgramKerja";

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

async function deleteProgramKerjaItem(noProker: any) {
  try {
    await customFetch.delete(`/proker/${noProker}`);
    toast.success("Item deleted successfully");
    return redirect("/dashboard/programKerja");
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.msg) {
      toast.error(error.response.data.msg);
    } else {
      toast.error("An error occurred while deleting the item.");
    }
    return error;
  }
}

async function processProgramKerjaItem(status: any, noProker: any) {
  try {
    await customFetch.post(`/proker/process/${noProker}`, {
      statusProker: status,
    });
    return toast.success(`berhasil ${status}`);
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.msg) {
      toast.error(error.response.data.msg);
    } else {
      toast.error(`An error occurred while ${status}`);
    }
    return error;
  }
}

export const columns: ColumnDef<ProgramKerja>[] = [
  {
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          Kode Program
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorKey: "kodeProgram",
  },
  {
    header: "Nama Program",
    accessorKey: "namaProgram",
  },
  {
    header: "Tahun Program",
    accessorKey: "tahun",
  },
  {
    header: "Penanggung Jawab",
    accessorKey: "penanggungJawab",
  },
  {
    header: "Tujuan Kegiatan",
    accessorKey: "tujuanKegiatan",
  },
  {
    header: "Target Peserta",
    accessorKey: "targetPeserta",
  },
  {
    header: "Waktu Pelaksanaan",
    accessorKey: "waktuPelaksanaan",
  },
  {
    header: "Rincian Rencana",
    accessorKey: "rincianRencana",
    cell: ({ row }) => {
      const rincianRencana = row.getValue("rincianRencana");

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
          {formatTextWithLineBreaks(rincianRencana)}
        </div>
      );
    },
  },
  {
    header: "Total Anggaran",
    accessorKey: "totalAnggaran",
    cell: ({ row }) => {
      const totalAnggaran = row.getValue("totalAnggaran");

      const formattedMoney = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(totalAnggaran as number);
      return <div className="font-medium">{formattedMoney}</div>;
    },
  },
  {
    header: "Realisasi",
    accessorKey: "realisasi",
    cell: ({ row }) => {
      const realisasi = row.getValue("realisasi");

      const formattedMoney = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(realisasi as number);
      return <div className="font-medium">{formattedMoney}</div>;
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
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorKey: "statusProker",
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
          Tanggal
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorKey: "tanggalProker",
    // modif
    cell: ({ row }) => {
      const tanggalProker = row.getValue("tanggalProker");
      const options = { day: "2-digit", month: "2-digit", year: "numeric" };
      const tanggalObj = new Date(tanggalProker as string);
      const day = String(tanggalObj.getDate()).padStart(2, "0");
      const month = String(tanggalObj.getMonth() + 1).padStart(2, "0");
      const year = tanggalObj.getFullYear();
      const formatted = `${day}/${month}/${year}`;
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const ProgramKerja = row.original;
      const noProker = ProgramKerja.noProker;
      const status = ProgramKerja.statusProker;
      const { setDataTable, tableRole, setTotalAnggaran } =
        useAllProgramKerjaContext();

      // fetch ulang
      const refreshTable = async () => {
        const { data } = await customFetch.post("/proker", {
          komisi: tableRole,
        });
        const { programKerja, totalAnggaranSemua } = await data;
        const { _sum } = totalAnggaranSemua;
        const { totalAnggaran } = _sum;
        setDataTable(programKerja);
        setTotalAnggaran(totalAnggaran);
      };

      // check role
      const { user } = useOutletContext() as { user: any };

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
            <DropdownMenuItem
              className="pb-2 pl-2 rounded hover:bg-slate-300 cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(noProker.toString());
              }}
            >
              {" "}
              <Link to={`../detailProgramKerja/${noProker}`}>
                Detail Laporan
              </Link>
            </DropdownMenuItem>
            {(status !== "Approved" && status !== "Done") ||
            user.role === "admin" ? (
              <DropdownMenuItem
                className="pb-2 pl-2 rounded hover:bg-slate-300 cursor-pointer"
                onClick={() => {
                  navigator.clipboard.writeText(noProker.toString());
                }}
              >
                {" "}
                <Link to={`../editProgramKerja/${noProker}`}>edit proker</Link>
              </DropdownMenuItem>
            ) : null}

            {/* duplicate */}
            <DropdownMenuItem
              className="pb-2 pl-2 rounded hover:bg-slate-300 cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(noProker.toString());
              }}
            >
              {" "}
              <Link to={`../duplicateProgramKerja/${noProker}`}>
                duplicate proker
              </Link>
            </DropdownMenuItem>

            {/* process */}
            {(status !== "Approved" &&
              status !== "Done" &&
              (user.role === "majelis" || user.role === "staff keuangan")) ||
            user.role === "admin" ? (
              <>
                <DropdownMenuItem
                  className="pb-2 pl-2 rounded hover:bg-slate-300 cursor-pointer"
                  onClick={async () => {
                    try {
                      await processProgramKerjaItem("Approved", noProker);
                      refreshTable();
                    } catch (error: any) {
                      if (
                        error.response &&
                        error.response.data &&
                        error.response.data.msg
                      ) {
                        toast.error(error.response.data.msg);
                      } else {
                        toast.error("An error occurred approving.");
                      }
                      return error;
                    }
                  }}
                >
                  approve proker
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="pb-2 pl-2 rounded hover:bg-slate-300 cursor-pointer"
                  onClick={async () => {
                    try {
                      await processProgramKerjaItem("Denied", noProker);
                      refreshTable();
                    } catch (error: any) {
                      if (
                        error.response &&
                        error.response.data &&
                        error.response.data.msg
                      ) {
                        toast.error(error.response.data.msg);
                      } else {
                        toast.error("An error occurred denying.");
                      }
                      return error;
                    }
                  }}
                >
                  deny proker
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="pb-2 pl-2 rounded hover:bg-slate-300 cursor-pointer"
                  onClick={async () => {
                    try {
                      await deleteProgramKerjaItem(noProker);
                      refreshTable();
                    } catch (error: any) {
                      if (
                        error.response &&
                        error.response.data &&
                        error.response.data.msg
                      ) {
                        toast.error(error.response.data.msg);
                      } else {
                        toast.error("An error occurred while deleting.");
                      }
                      return error;
                    }
                  }}
                >
                  delete proker
                </DropdownMenuItem>
              </>
            ) : null}
            {status === "Approved" ? (
              <DropdownMenuItem
                className="pb-2 pl-2 rounded hover:bg-slate-300 cursor-pointer"
                onClick={async () => {
                  try {
                    await processProgramKerjaItem("Done", noProker);
                    refreshTable();
                  } catch (error: any) {
                    if (
                      error.response &&
                      error.response.data &&
                      error.response.data.msg
                    ) {
                      toast.error(error.response.data.msg);
                    } else {
                      toast.error("An error occurred denying.");
                    }
                    return error;
                  }
                }}
              >
                done proker
              </DropdownMenuItem>
            ) : null}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
