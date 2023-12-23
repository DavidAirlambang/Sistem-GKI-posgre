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
import { downloadToExcelMultimedia as downloadToExcel } from "@/lib/xlsx";
import { useAllGudangContext } from "@/pages/Gudang";
import { CSVUploader } from "@/lib/CSVUploader";
import { useAllMultimediaContext } from "@/pages/Multimedia";
import customFetch from "@/utils/customFetch";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function MultimediaDataTable<TData, TValue>({
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
  const { setDataTable } = useAllMultimediaContext();

  const refreshTable = async () => {
    const { data } = await customFetch.get("multimedia");
    const { multimedia } = data;
    setDataTable(multimedia);
  };

  return (
    <div className="mt-5">
      {/* input */}
      <div className="flex items-center py-4">
        <Input
          placeholder="Cari nama Multimedia"
          value={
            (table.getColumn("namaMultimedia")?.getFilterValue() as string) ||
            ""
          }
          onChange={(e) => {
            console.log(e.target.value);
            console.log(sorting);
            table.getColumn("namaMultimedia")?.setFilterValue(e.target.value);
          }}
          className="max-w-sm text-black form-input"
        />

        {/* <ModeToggle /> */}

        {/* export */}
        <Button onClick={() => downloadToExcel(data)} className="mx-4">
          Export
        </Button>

        {/* import */}
        <CSVUploader path="/multimedia/upload" refresh={() => refreshTable()} />

        {/* visibility */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline" className="ml-4 text-black btn">
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

export default MultimediaDataTable;
