/* eslint-disable react-refresh/only-export-components */
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useContext, createContext, useState } from "react";
import LaporanDataTable from "@/app/laporan/data-table";
import { columns } from "@/app/laporan/column";
import { SelectLaporan } from "@/components/SelectItem";
import { Button } from "@/components/ui/button";
import { DatePickerLaporan } from "@/components/DatePickerLaporan";

const AllLaporanContext = createContext();

const Laporan = () => {
  const [dataTable, setDataTable] = useState([]);
  const [filterKomisi, setFilterKomisi] = useState();
  const [penerimaanData, setPenerimaanData] = useState();
  const [pengeluaranData, setPengeluaranData] = useState();
  const [start, setStart] = useState();
  const [end, setEnd] = useState();

  const fetchData = async () => {
    try {
      console.log(start);
      console.log(end);
      const debitResponse = await customFetch.post("/filterPenerimaan", {
        startDate: start,
        endDate: end,
        tipeAdministrasi: "debit",
        penerima: filterKomisi,
      });

      const kreditResponse = await customFetch.post("/filterPenerimaan", {
        startDate: start,
        endDate: end,
        tipeAdministrasi: "kredit",
        penerima: filterKomisi,
      });

      const { administrasi: penerimaan } = debitResponse.data;
      const { administrasi: pengeluaran } = kreditResponse.data;

      setPenerimaanData(penerimaan);
      setPengeluaranData(pengeluaran);
      setDataTable(penerimaan);
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };

  return (
    <AllLaporanContext.Provider
      value={{
        dataTable,
        setDataTable,
        filterKomisi,
        setFilterKomisi,
        penerimaanData,
        setPenerimaanData,
        pengeluaranData,
        setPengeluaranData,
        setStart,
        setEnd,
      }}
    >
      <div className="py-4">
        <h4 className="form-title">Laporan Adminstrasi Keuangan</h4>
        <div className="flex items-center mt-4 w-full">
          <SelectLaporan />
          <DatePickerLaporan />
          <Button onClick={() => fetchData()}>test</Button>
        </div>
      </div>
      <div>
        <LaporanDataTable columns={columns} data={dataTable} />
        <LaporanDataTable columns={columns} data={dataTable} />
      </div>
    </AllLaporanContext.Provider>
  );
};

export const useAllLaporanContext = () => useContext(AllLaporanContext);
export default Laporan;
