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
import React, { useContext } from "react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ModeToggle } from "@/components/ModeToggle";
import { downloadToExcelAdministrasi as downloadToExcel } from "@/lib/xlsx";
import { CSVUploader } from "@/lib/CSVUploader";
import { useAllPengeluaranContext } from "@/pages/Pengeluaran";
import customFetch from "@/utils/customFetch";
import { toast } from "react-toastify";
import { DatePickerWithRange } from "@/components/DateRangePicker";
import { SelectItemsAdministrasi } from "@/components/SelectItem";
import { useOutletContext } from "react-router-dom";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function PengeluaranDataTable<TData, TValue>({
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
    // kalo ada perubahan panggil set sorting
    onSortingChange: setSorting,
    // kalo ada filter panggil set column filter
    onColumnFiltersChange: setColumnFilters,
    // atur visibility
    onColumnVisibilityChange: setColumnVisibility,
    // define hook yang dipake
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  // state table
  const { dataTable, setDataTable, filterKomisi } = useAllPengeluaranContext();

  const { user } = useOutletContext() as { user: any };

  return (
    <div className="mt-5">
      {/* input */}
      <div className="flex flex-col md:flex-row items-center py-4">
        <div className="flex items-center">
          <SelectItemsAdministrasi komisi={user.role} tipe={"kredit"} />

          <Button
            onClick={() => {
              try {
                downloadToExcel(dataTable, filterKomisi, "Pengeluaran");
              } catch (error: any) {
                toast.error(error.response.data.msg);
              }
            }}
            className="ml-0 md:mr-2"
          >
            Export
          </Button>
        </div>

        <DatePickerWithRange filterFor="pengeluaran" className="mt-2 md:mt-0" />

        {/* Uncomment the following lines if you want to include the CSVUploader */}
        {/* <CSVUploader
    path="/administrasi/upload"
    refresh={() => refreshTable()}
  /> */}

        {/* Include your visibility components here */}
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
      <div className="flex items-center justify-start space-x-2 py-4">
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
          className="text-black btn"
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default PengeluaranDataTable;
