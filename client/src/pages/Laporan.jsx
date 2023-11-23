/* eslint-disable react-refresh/only-export-components */
import { useContext, createContext, useState, useRef } from "react";
import LaporanDataTable from "@/app/laporan/data-table";
import { columns } from "@/app/laporan/column";
import { SelectLaporan } from "@/components/SelectItem";
import { DatePickerLaporan } from "@/components/DatePickerLaporan";
import { Button } from "@/components/ui/button";
import { downloadToExcelLaporan } from "@/lib/xlsx";
import { toast } from "react-toastify";

const AllLaporanContext = createContext();

const Laporan = () => {
  const [filterKomisi, setFilterKomisi] = useState();
  const [penerimaanData, setPenerimaanData] = useState([]);
  const [pengeluaranData, setPengeluaranData] = useState([]);
  const [totalPenerimaan, setTotalPenerimaan] = useState(0);
  const [totalPengeluaran, setTotalPengeluaran] = useState(0);
  const [saldoAwal, setSaldoAwal] = useState(0);

  const FormatMoney = (money) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(money);
  };

  const printRef = useRef();

  const handlePrint = () => {
    window.print();
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
        saldoAwal,
        setSaldoAwal,
      }}
    >
      <div className="pt-4">
        <h4 className="form-title">Laporan Adminstrasi Keuangan</h4>
        <div className="flex flex-col sm:flex-row items-center mt-4 w-full">
          {/* SelectLaporan */}
          <div className={`pb-4 mb-2 sm:mb-0 sm:mr-2 w-full lg:w-1/4`}>
            <SelectLaporan width={"sm:w-1/2"} />
          </div>

          {/* DatePickerLaporan */}
          <div className="pb-4 mb-2 sm:mb-0 sm:mr-2 w-full sm:w-1/2 lg:w-1/4">
            <DatePickerLaporan />
          </div>

          {/* Print and Export Buttons */}
          <div className="pb-4 w-full sm:w-1/2 lg:w-2/4 flex justify-end">
            <Button
              onClick={handlePrint}
              className="pb-4 ml-0 mb-2 sm:ml-4 sm:mb-0"
              disabled={
                penerimaanData.length !== 0 || pengeluaranData.length !== 0
                  ? false
                  : true
              }
            >
              Print
            </Button>
            <Button
              onClick={() => {
                try {
                  downloadToExcelLaporan(
                    penerimaanData,
                    pengeluaranData,
                    filterKomisi
                  );
                } catch (error) {
                  toast.error(error.response.data.msg);
                }
              }}
              className="pb-4 ml-2 sm:ml-2 mb-2 sm:mb-0"
              disabled={
                penerimaanData.length !== 0 || pengeluaranData.length !== 0
                  ? false
                  : true
              }
            >
              Export
            </Button>
          </div>
        </div>
      </div>
      {/* Bagian yang akan dicetak */}
      <div
        ref={printRef}
        className=" items-center justify-normal bg-black p-5 print:visible print:absolute print:left-0 print:top-0 print:font-sans print:text-black"
      >
        <div>
          <div className="flex justify-between items-center ">
            <h5 className="font-bold">Penerimaan</h5>
            <p className="mr-3">{`Total Penerimaan : ${FormatMoney(
              totalPenerimaan
            )}`}</p>
          </div>
          <LaporanDataTable columns={columns} data={penerimaanData} />
        </div>
        <div>
          <div className="flex justify-between items-center ">
            <h5 className="font-bold">Pengeluaran</h5>
            <p className="mr-3">{`Total Pengeluaran : ${FormatMoney(
              totalPengeluaran
            )}`}</p>
          </div>
          <LaporanDataTable columns={columns} data={pengeluaranData} />
        </div>
        <div className="flex justify-between">
          <h4>{`Saldo Periode dipilih : ${FormatMoney(
            totalPenerimaan - totalPengeluaran
          )}`}</h4>
          <h4>{`Saldo Awal : ${FormatMoney(saldoAwal)}`}</h4>
          <h4>{`Saldo Akhir : ${FormatMoney(
            saldoAwal + totalPenerimaan - totalPengeluaran
          )}`}</h4>
        </div>
      </div>
    </AllLaporanContext.Provider>
  );
};

export const useAllLaporanContext = () => useContext(AllLaporanContext);
export default Laporan;
