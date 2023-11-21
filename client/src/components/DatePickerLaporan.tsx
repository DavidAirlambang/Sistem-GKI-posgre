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
import { useAllLaporanContext } from "@/pages/Laporan";
import customFetch from "@/utils/customFetch";
import { toast } from "react-toastify";

export function DatePickerLaporan({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>();
  const {
    setPenerimaanData,
    setPengeluaranData,
    filterKomisi,
    setTotalPenerimaan,
    setTotalPengeluaran,
    setSaldoAwal,
  } = useAllLaporanContext();

  const fetchData = async () => {
    try {
      const start = format(date!.from!, "yyyy-MM-dd");
      const end = format(date!.to!, "yyyy-MM-dd");

      const debitResponse = await customFetch.post(
        "/administrasi/penerimaanFilter",
        {
          startDate: start,
          endDate: end,
          tipeAdministrasi: "debit",
          penerima: filterKomisi,
        }
      );

      const kreditResponse = await customFetch.post(
        "/administrasi/penerimaanFilter",
        {
          startDate: start,
          endDate: end,
          tipeAdministrasi: "kredit",
          penerima: filterKomisi,
        }
      );

      const {
        administrasi: penerimaan,
        totalNominal: nominalPenerimaan,
        saldoAwal,
      } = debitResponse.data;
      const { administrasi: pengeluaran, totalNominal: nominalPengeluaran } =
        kreditResponse.data;

      setPenerimaanData(penerimaan);
      setPengeluaranData(pengeluaran);
      setTotalPenerimaan(nominalPenerimaan);
      setTotalPengeluaran(nominalPengeluaran);
      setSaldoAwal(saldoAwal);
    } catch (error: any) {
      toast.error(error?.response?.data?.msg);
    }
  };

  return (
    <div className={cn("flex gap-2 text-black mr-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[500px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
            disabled={filterKomisi ? false : true}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
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
      <Button onClick={() => fetchData()} disabled={date ? false : true}>
        Cari
      </Button>
    </div>
  );
}
