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
  TableFooter,
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
    setFilterTahun,
    tipeStatus,
    setTipeStatus,
    totalRealisasi,
  } = useAllProgramKerjaContext();

  const refreshTable = async () => {
    setFilterTahun(undefined);
    (document.getElementById("filterTahun") as HTMLInputElement).value = "";
  };

  const filterTahun = async () => {
    const tahun = document.getElementById("filterTahun") as HTMLInputElement;
    setFilterTahun(tahun.value);
  };

  // ambil role
  const { user } = useOutletContext() as { user: any };

  // format total anggarna
  const formattedMoney = (target: any) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(target as number);

  return (
    <div className="mt-5">
      <div className="flex flex-wrap items-center pt-4">
        <div className="flex mr-4">
          {/* SelectItems */}
          <div className="w-full sm:w-auto pb-4 sm:mr-2 sm:mb-0">
            <SelectItems komisi={user.role} />
          </div>

          {/* Input */}
          <div className="w-full sm:w-auto pb-4 sm:mr-2 sm:mb-0">
            <Input
              placeholder="Cari kode"
              value={
                (table.getColumn("kodeProgram")?.getFilterValue() as string) ||
                ""
              }
              onChange={(e: any) => {
                table.getColumn("kodeProgram")?.setFilterValue(e.target.value);
              }}
              className="max-w-xs text-black form-input"
            />
          </div>
          <div className="w-full pb-4 sm:w-auto sm:mr-2 sm:mb-0">
            <Input
              placeholder="Cari nama program"
              value={
                (table.getColumn("namaProgram")?.getFilterValue() as string) ||
                ""
              }
              onChange={(e: any) => {
                table.getColumn("namaProgram")?.setFilterValue(e.target.value);
              }}
              className="max-w-xs text-black form-input ml-2"
            />
          </div>
        </div>

        {/* DatePicker */}
        <div className="w-full pb-4 sm:w-auto sm:mr-2 sm:mb-0">
          <DatePickerWithRange filterFor="programKerja" />
        </div>

        {/* filter tahun */}
        <div className="flex w-full max-w-sm items-center space-x-2 mb-4 mr-4">
          <Input
            id="filterTahun"
            placeholder="Filter Tahun..."
            className="text-black"
          />
          <Button
            disabled={dataTable.length === 0 ? true : false}
            type="submit"
            onClick={() => filterTahun()}
          >
            Filter
          </Button>
          <Button onClick={() => refreshTable()}>Reset</Button>
        </div>

        <div className="flex">
          {/* SelectStatus */}
          <div className="w-full pb-4 sm:w-auto sm:mr-2 mb-4 sm:mb-0">
            <SelectStatus />
          </div>

          {/* Export Button */}
          <div className="w-full pb-4 sm:w-auto sm:mr-2 mb-4 mr-2 sm:mb-0">
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

          {/* Create Button */}
          <div className="w-full pb-4 sm:w-auto">
            <Button className="btn p-0">
              <Link
                className="w-full  h-full flex items-center justify-center"
                to="/dashboard/createProgramKerja"
              >
                Create
              </Link>
            </Button>
          </div>
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

          {/* footer */}
          <TableFooter>
            <TableRow>
              <TableCell colSpan={8}>Total</TableCell>
              <TableCell>{formattedMoney(totalAnggaran)}</TableCell>
              <TableCell>{formattedMoney(totalRealisasi)}</TableCell>
              <TableCell colSpan={3}></TableCell>
            </TableRow>
          </TableFooter>
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
      </div>
    </div>
  );
}

export default ProgramKerjaDataTable;
