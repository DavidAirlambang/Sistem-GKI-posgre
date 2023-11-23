"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import React from "react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ModeToggle } from "@/components/ModeToggle";
import { downloadToExcelProgramKerja as downloadToExcel } from "@/lib/xlsx";
import { CSVUploader } from "@/lib/CSVUploader";
import { useAllProgramKerjaContext } from "@/pages/ProgramKerja";
import customFetch from "@/utils/customFetch";
import { toast } from "react-toastify";
import { DatePickerWithRange } from "@/components/DateRangePicker";
import { Link, redirect, useOutletContext } from "react-router-dom";
import { SelectItems, SelectStatus } from "@/components/SelectItem";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function ProgramKerjaDataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  // bikin hook sorting
  const [sorting, setSorting] = React.useState<SortingState>([]);
  // filter
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  // visibility
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  // state table
  const {
    dataTable,
    setDataTable,
    tableRole,
    setTableRole,
    totalAnggaran,
    setTotalAnggaran,
    tipeStatus,
    setTipeStatus,
  } = useAllProgramKerjaContext();

  const refreshTable = async () => {
    const { data } = await customFetch.post("/proker", {
      komisi: tableRole,
      status: tipeStatus,
    });
    const { programKerja, totalAnggaranSemua } = await data;
    const { _sum } = totalAnggaranSemua;
    const { totalAnggaran } = _sum;
    setDataTable(programKerja);
    setTotalAnggaran(totalAnggaran);
  };

  // ambil role
  const { user } = useOutletContext() as { user: any };

  // format total anggarna
  const formattedMoney = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(totalAnggaran as number);

  return (
    <div className="mt-5">
      <div className="flex flex-wrap items-center py-4">
        {/* SelectItems */}
        <div className="w-full sm:w-auto sm:mr-2 mb-4 sm:mb-0">
          <SelectItems komisi={user.role} />
        </div>

        {/* Input */}
        <div className="w-full sm:w-auto sm:mr-2 mb-4 sm:mb-0">
          <Input
            placeholder="Cari kode"
            value={
              (table.getColumn("kodeProgram")?.getFilterValue() as string) || ""
            }
            onChange={(e: any) => {
              table.getColumn("kodeProgram")?.setFilterValue(e.target.value);
            }}
            className="max-w-xs text-black form-input"
          />
        </div>
        <div className="w-full sm:w-auto sm:mr-2 mb-4 sm:mb-0">
          <Input
            placeholder="Cari nama program"
            value={
              (table.getColumn("namaProgram")?.getFilterValue() as string) || ""
            }
            onChange={(e: any) => {
              table.getColumn("namaProgram")?.setFilterValue(e.target.value);
            }}
            className="max-w-xs text-black form-input"
          />
        </div>

        {/* DatePicker */}
        <div className="w-full sm:w-auto sm:mr-2 mb-4 sm:mb-0">
          <DatePickerWithRange filterFor="programKerja" />
        </div>

        {/* Export Button */}
        <div className="w-full sm:w-auto sm:mr-2 mb-4 sm:mb-0">
          <Button
            disabled={tableRole === "admin" || tableRole === "majelis"}
            onClick={() => {
              try {
                downloadToExcel(dataTable, tableRole);
              } catch (error: any) {
                toast.error(error.response.data.msg);
              }
            }}
          >
            Export
          </Button>
        </div>

        {/* CSVUploader */}
        <div className="w-full sm:w-auto sm:mr-2 mb-4 sm:mb-0">
          <CSVUploader
            aktif={tableRole === "admin" || tableRole === "majelis"}
            komisi={tableRole}
            path="/proker/upload"
            refresh={() => refreshTable()}
          />
        </div>

        {/* SelectStatus */}
        <div className="w-full sm:w-auto sm:mr-2 mb-4 sm:mb-0">
          <SelectStatus />
        </div>

        {/* Create Button */}
        <div className="w-full sm:w-auto">
          <Button className="btn p-0">
            <Link
              className="w-full h-full flex items-center justify-center"
              to="/dashboard/createProgramKerja"
            >
              Create
            </Link>
          </Button>
        </div>

        {/* Additional Style for Small Screens */}
        <div className="w-full sm:hidden">
          {/* Add additional styling or content for small screens */}
          <p className="text-sm text-gray-500 mt-2">
            This is only visible on small screens.
          </p>
        </div>
      </div>

      {/* table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="text-blue">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>No Results</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* pagination */}
      <div className="flex items-center py-4">
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={() => {
            table.previousPage();
          }}
          disabled={!table.getCanPreviousPage()}
          className="text-black btn"
        >
          Previous
        </Button>
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={() => {
            table.nextPage();
          }}
          disabled={!table.getCanNextPage()}
          className="text-black btn ml-2"
        >
          Next
        </Button>

        <h5 className="ml-auto">
          Total Anggaran yang disetujui : <b>{formattedMoney}</b>
        </h5>
      </div>
    </div>
  );
}

export default ProgramKerjaDataTable;
