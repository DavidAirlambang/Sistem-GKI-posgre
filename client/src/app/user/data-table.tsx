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
import { downloadToExcelUser as downloadToExcel } from "@/lib/xlsx";
import { useAllUserContext } from "@/pages/User";
import { CSVUploader } from "@/lib/CSVUploader";
import customFetch from "@/utils/customFetch";
import { SelectUserRole, SelectUserStatus } from "@/components/SelectItem";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function UserDataTable<TData, TValue>({
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
  const { setDataTable, filterRole, setFilterRole } = useAllUserContext();

  const refreshTable = async () => {
    const { data } = await customFetch.post("/user", { role: filterRole });
    const { barangs } = data;
    setDataTable(barangs);
  };

  return (
    <div className="mt-5">
      {/* input */}
      <div className="flex items-center py-4">
        <Input
          placeholder="Cari nama user"
          value={(table.getColumn("name")?.getFilterValue() as string) || ""}
          onChange={(e: any) => {
            table.getColumn("name")?.setFilterValue(e.target.value);
          }}
          className="max-w-sm text-black form-input"
        />

        <SelectUserRole />
        <SelectUserStatus />

        {/* export */}
        <Button onClick={() => downloadToExcel(data)} className="ml-4">
          Export
        </Button>
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

export default UserDataTable;
