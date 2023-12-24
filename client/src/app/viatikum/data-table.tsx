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
import { downloadToExcelViatikum as downloadToExcel } from "@/lib/xlsx";
import { CSVUploader } from "@/lib/CSVUploader";
import { useAllViatikumContext } from "@/pages/Viatikum";
import customFetch from "@/utils/customFetch";
import { toast } from "react-toastify";
import { DatePickerWithRange } from "@/components/DateRangePicker";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function ViatikumDataTable<TData, TValue>({
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
  const { dataTable, setDataTable } = useAllViatikumContext();

  const filterTable = async () => {
    const tahun = document.getElementById(
      "tahunFilter"
    ) as HTMLInputElement | null;
    const tahunCari = tahun?.value;
    if (tahunCari) {
      try {
        const { data } = await customFetch.post("/viatikum/periode", {
          tahun: tahunCari,
        });
        const { viatikum } = data;
        setDataTable(viatikum);
      } catch (error: any) {
        toast.error(error?.response?.data?.msg);
        return error;
      }
    }
  };

  const refreshTable = async () => {
    (document.getElementById("tahunFilter")! as HTMLInputElement).value = "";
    const { data } = await customFetch.get("viatikum");
    const { viatikum } = data;
    setDataTable(viatikum);
  };

  return (
    <div className="mt-5">
      {/* input */}
      <div className="flex flex-col sm:flex-row items-center py-4">
        {/* Filter Section */}
        <div className="flex w-full max-w-sm items-center mb-2 sm:mb-0">
          <Input
            id="tahunFilter"
            type="tahun"
            placeholder="Tahun"
            className="form-input py"
          />
          {/* Filter buttons */}
          <div className="flex space-x-2 ml-2">
            <Button type="submit" className="btn" onClick={() => filterTable()}>
              Filter
            </Button>
            <Button
              type="submit"
              className="btn"
              onClick={() => refreshTable()}
            >
              Reset
            </Button>
          </div>
        </div>

        {/* Export and Import Section */}
        <div className="flex w-full sm:w-auto items-center space-y-2 sm:space-y-0 sm:ml-4">
          {/* Export Button */}
          <Button
            onClick={() => {
              try {
                downloadToExcel(dataTable);
              } catch (error: any) {
                toast.error(error.response.data.msg);
              }
            }}
            className="btn"
          >
            Export
          </Button>

          {/* Import Section */}
          <div className="ml-2 pb-1">
            <CSVUploader
              path="/viatikum/upload"
              refresh={() => refreshTable()}
            />
          </div>
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

export default ViatikumDataTable;
