"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAllSuratMasukContext } from "@/pages/SuratMasuk";
import customFetch from "@/utils/customFetch";
import { toast } from "react-toastify";
import { useAllSuratKeluarContext } from "@/pages/SuratKeluar";
import { useAllAdministrasiContext } from "@/pages/Administrasi";
import { useAllProgramKerjaContext } from "@/pages/ProgramKerja";

export function DatePickerWithRange({ className, filterFor }: any) {
  const [date, setDate] = React.useState<DateRange | undefined>();

  // jenis table
  const { setDataTable, tableRole, tipeStatus, filterKomisi } =
    filterFor === "suratMasuk"
      ? useAllSuratMasukContext()
      : filterFor === "suratKeluar"
      ? useAllSuratKeluarContext()
      : filterFor === "administrasi"
      ? useAllAdministrasiContext()
      : filterFor === "programKerja"
      ? useAllProgramKerjaContext()
      : null;

  // surat Masuk
  const refreshTableSuratMasuk = async () => {
    const start = format(date!.from!, "yyyy-MM-dd");
    const end = format(date!.to!, "yyyy-MM-dd");
    try {
      const { data } = await customFetch.post("/suratMasuk/filter", {
        startDate: start,
        endDate: end,
      });
      const { suratMasuk } = data;

      setDataTable(suratMasuk);
    } catch (error: any) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

  const resetTableSuratMasuk = async () => {
    const { data } = await customFetch.get("suratMasuk");
    const { suratMasuk } = data;
    setDataTable(suratMasuk);
  };

  // surat Keluar
  const refreshTableSuratKeluar = async () => {
    const start = format(date!.from!, "yyyy-MM-dd");
    const end = format(date!.to!, "yyyy-MM-dd");
    try {
      const { data } = await customFetch.post("/suratKeluar/filter", {
        startDate: start,
        endDate: end,
      });
      const { suratKeluar } = data;

      setDataTable(suratKeluar);
    } catch (error: any) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

  const resetTableSuratKeluar = async () => {
    const { data } = await customFetch.get("suratKeluar");
    const { suratKeluar } = data;
    setDataTable(suratKeluar);
  };

  // administrasi
  const refreshTableAdministrasi = async () => {
    const start = format(date!.from!, "yyyy-MM-dd");
    const end = format(date!.to!, "yyyy-MM-dd");
    try {
      const { data } = await customFetch.post(
        "/administrasi/penerimaanFilter",
        {
          startDate: start,
          endDate: end,
          penerima: filterKomisi,
        }
      );
      const { administrasi } = data;

      setDataTable(administrasi);
    } catch (error: any) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

  const resetTableAdministrasi = async () => {
    const { data } = await customFetch.post("/administrasi", {
      penerima: filterKomisi,
    });
    const { administrasi } = data;

    setDataTable(administrasi);
  };

  // program kerja
  const refreshTableProgramKerja = async () => {
    const start = format(date!.from!, "yyyy-MM-dd");
    const end = format(date!.to!, "yyyy-MM-dd");
    try {
      const { data } = await customFetch.post("/proker/filter", {
        komisi: tableRole,
        startDate: start,
        endDate: end,
        status: tipeStatus,
      });
      const { programKerja } = data;

      setDataTable(programKerja);
    } catch (error: any) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

  const resetTableProgramKerja = async () => {
    const { data } = await customFetch.post("/proker", {
      komisi: tableRole,
      status: tipeStatus,
    });
    const { programKerja } = data;
    setDataTable(programKerja);
  };

  return (
    <div className={cn("gap-2 text-black  grid grid-flow-col", className)}>
      <Popover>
        <PopoverTrigger asChild disabled={tableRole === "admin" ? true : false}>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-black " />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
      <Button
        disabled={tableRole === "admin" ? true : false}
        className="delete-btn btn"
        onClick={() => {
          filterFor === "suratMasuk"
            ? refreshTableSuratMasuk()
            : filterFor === "suratKeluar"
            ? refreshTableSuratKeluar()
            : filterFor === "administrasi"
            ? refreshTableAdministrasi()
            : filterFor === "programKerja"
            ? refreshTableProgramKerja()
            : null;
        }}
      >
        Filter
      </Button>
      <Button
        disabled={tableRole === "admin" ? true : false}
        className="delete-btn btn"
        onClick={() => {
          setDate(undefined);
          filterFor === "suratMasuk"
            ? resetTableSuratMasuk()
            : filterFor === "suratKeluar"
            ? resetTableSuratKeluar()
            : filterFor === "administrasi"
            ? resetTableAdministrasi()
            : filterFor === "programKerja"
            ? resetTableProgramKerja()
            : null;
        }}
      >
        Reset
      </Button>
    </div>
  );
}
