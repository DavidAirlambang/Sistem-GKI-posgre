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

export function DatePickerWithRange({ className, filterFor }: any) {
  const [date, setDate] = React.useState<DateRange | undefined>();

  // sementara
  const { setDataTable } = useAllSuratMasukContext();

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

  return (
    <div className={cn("gap-2 text-black  grid grid-flow-col", className)}>
      <Popover>
        <PopoverTrigger asChild>
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
        className="delete-btn btn"
        onClick={() => {
          if (filterFor === "suratMasuk") refreshTableSuratMasuk();
        }}
      >
        Filter
      </Button>
      <Button
        className="delete-btn btn"
        onClick={() => {
          setDate(undefined);
          if (filterFor === "suratMasuk") resetTableSuratMasuk();
        }}
      >
        Reset
      </Button>
    </div>
  );
}