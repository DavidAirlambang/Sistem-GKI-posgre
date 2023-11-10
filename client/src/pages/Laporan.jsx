/* eslint-disable react-refresh/only-export-components */
import { useContext, createContext, useState } from "react";
import LaporanDataTable from "@/app/laporan/data-table";
import { columns } from "@/app/laporan/column";
import { SelectLaporan } from "@/components/SelectItem";
import { DatePickerLaporan } from "@/components/DatePickerLaporan";

const AllLaporanContext = createContext();

const Laporan = () => {
  const [filterKomisi, setFilterKomisi] = useState();
  const [penerimaanData, setPenerimaanData] = useState([]);
  const [pengeluaranData, setPengeluaranData] = useState([]);
  const [totalPenerimaan, setTotalPenerimaan] = useState(0);
  const [totalPengeluaran, setTotalPengeluaran] = useState(0);

  const FormatMoney = (money) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(money);
  };

  return (
    <AllLaporanContext.Provider
      value={{
        filterKomisi,
        setFilterKomisi,
        penerimaanData,
        setPenerimaanData,
        pengeluaranData,
        setPengeluaranData,
        totalPenerimaan,
        setTotalPenerimaan,
        totalPengeluaran,
        setTotalPengeluaran,
      }}
    >
      <div className="py-4">
        <h4 className="form-title">Laporan Adminstrasi Keuangan</h4>
        <div className="flex items-center mt-4 w-full">
          <SelectLaporan />
          <DatePickerLaporan />
        </div>
      </div>
      <div className="flex items-center justify-normal bg-black p-5">
        <div className="p-3">
          <div className="flex justify-between items-center ">
            <h5 className="font-bold">Penerimaan</h5>
            <p className="mr-3">{`Total Penerimaan : ${FormatMoney(
              totalPenerimaan
            )}`}</p>
          </div>
          <LaporanDataTable columns={columns} data={penerimaanData} />
        </div>
        <div className="w-[20px]"></div>
        <div>
          <div className="flex justify-between items-center ">
            <h5 className="font-bold">Pengeluaran</h5>
            <p className="mr-3">{`Total Pengeluaranan : ${FormatMoney(
              totalPengeluaran
            )}`}</p>
          </div>
          <LaporanDataTable columns={columns} data={pengeluaranData} />
        </div>
      </div>
    </AllLaporanContext.Provider>
  );
};

export const useAllLaporanContext = () => useContext(AllLaporanContext);
export default Laporan;
