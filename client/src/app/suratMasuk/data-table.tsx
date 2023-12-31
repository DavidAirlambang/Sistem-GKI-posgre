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
import { downloadToExcelSuratMasuk as downloadToExcel } from "@/lib/xlsx";
import { CSVUploader } from "@/lib/CSVUploader";
import { useAllSuratMasukContext } from "@/pages/SuratMasuk";
import customFetch from "@/utils/customFetch";
import { toast } from "react-toastify";
import { DatePickerWithRange } from "@/components/DateRangePicker";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function SuratMasukDataTable<TData, TValue>({
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
  const { dataTable, setDataTable } = useAllSuratMasukContext();

  const refreshTable = async () => {
    const { data } = await customFetch.get("suratMasuk");
    const { suratMasuk } = data;
    setDataTable(suratMasuk);
  };

  return (
    <div className="mt-5">
      {/* input */}
      <div className="flex flex-wrap items-center py-4">
        {/* <Input*/}
        <DatePickerWithRange
          filterFor="suratMasuk"
          className="w-full md:w-auto mb-4 mr-4 md:mb-0"
        />

        {/* export */}
        <Button
          onClick={() => {
            try {
              downloadToExcel(dataTable);
            } catch (error: any) {
              toast.error(error.response.data.msg);
            }
          }}
          className="mr-4 w-full md:w-auto mb-4 md:mb-0"
        >
          Export
        </Button>

        {/* import */}
        <CSVUploader
          path="/suratMasuk/upload"
          refresh={() => refreshTable()}
          className="w-full md:w-auto mb-4 md:mb-0"
        />

        {/* visibility
        <div className="w-full md:w-auto mb-4 md:mb-0">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline" className="ml-4 text-black btn w-full">
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded bg-slate-100">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize text-black w-35 p-2 hover:bg-slate-200 cursor-pointer"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value: boolean) => {
                        column.toggleVisibility(!!value);
                      }}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div> */}
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

export default SuratMasukDataTable;
