import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function Print() {
  const [isPrinted, setIsPrinted] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const handlePrintClick = () => {
    setIsPrinted(true);

    setTimeout(() => {
      window.print();
    }, 150);

    setTimeout(() => {
      setIsPrinted(false);
    }, 250);
  };

  const filterKomisi = queryParams.get("filterKomisi");
  const penerimaanData = JSON.parse(
    decodeURIComponent(queryParams.get("penerimaanData"))
  );
  const pengeluaranData = JSON.parse(
    decodeURIComponent(queryParams.get("pengeluaranData"))
  );
  const totalPenerimaan = parseFloat(queryParams.get("totalPenerimaan"));
  const totalPengeluaran = parseFloat(queryParams.get("totalPengeluaran"));
  const saldoAwal = parseFloat(queryParams.get("saldoAwal"));

  // Pastikan data ada sebelum digunakan
  const penerimaans = penerimaanData || [];
  const pengeluarans = pengeluaranData || [];
  return (
    <body className={`${isPrinted ? "text-black" : ""} bg-white max-w-4xl`}>
      <div className="max-w-full p-4">
        <h2 className="pb-4 text-center">{`Laporan Keuangan ${filterKomisi}`}</h2>

        {/* print */}
        <div className="flex justify-between">
          <Link
            to="/dashboard/administrasi"
            className={`flex justify-between p-3 btn form-btn delete-btn ${
              isPrinted ? "invisible" : ""
            }`}
          >
            Back
          </Link>

          <Button
            onClick={handlePrintClick}
            className={`flex justify-between btn form-btn delete-btn ${
              isPrinted ? "invisible" : ""
            }`}
          >
            Print
          </Button>
        </div>

        {/* Penerimaan */}
        <h3 className="pt-4">Penerimaan</h3>
        <Table className="table-auto w-full max-w-[100%] md:max-w-[80%] lg:max-w-[70%] xl:max-w-[60%] 2xl:max-w-[50%] mx-auto">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Tanggal</TableHead>
              <TableHead>Nama Program</TableHead>
              <TableHead>Nominal</TableHead>
              <TableHead className="text-right">Penerima</TableHead>
              <TableHead className="text-right">Uraian</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {penerimaans.map((penerimaan) => (
              <TableRow key={penerimaan.noAdministrasi}>
                <TableCell className="font-medium">
                  {format(
                    new Date(penerimaan.tanggalAdministrasi),
                    "dd-MM-yyyy"
                  )}
                </TableCell>
                <TableCell>{penerimaan.namaProgram}</TableCell>
                <TableCell>
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(penerimaan.nominalAdministrasi)}
                </TableCell>
                <TableCell className="text-right">
                  {penerimaan.penerimaAdministrasi}
                </TableCell>
                <TableCell className="text-right">
                  {penerimaan.uraianAdministrasi}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell
                colSpan={2}
                className={`font-medium ${isPrinted ? "text-black" : ""}`}
              >
                Total
              </TableCell>
              <TableCell
                className={`text-right ${isPrinted ? "text-black" : ""}`}
              >
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(totalPenerimaan)}
              </TableCell>
              <TableCell colSpan={2} className="font-medium"></TableCell>
            </TableRow>
          </TableFooter>
        </Table>

        {/* pengeluaran */}
        <h3 className="py-4 mt-4">Pengeluaran</h3>
        <Table className="table-auto w-full max-w-[100%] md:max-w-[80%] lg:max-w-[70%] xl:max-w-[60%] 2xl:max-w-[50%] mx-auto">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Tanggal</TableHead>
              <TableHead>Nama Program</TableHead>
              <TableHead>Nominal</TableHead>
              <TableHead className="text-right">Penerima</TableHead>
              <TableHead className="text-right">Uraian</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pengeluarans.map((pengeluaran) => (
              <TableRow key={pengeluaran.noAdministrasi}>
                <TableCell className="font-medium">
                  {format(
                    new Date(pengeluaran.tanggalAdministrasi),
                    "dd-MM-yyyy"
                  )}
                </TableCell>
                <TableCell>{pengeluaran.namaProgram}</TableCell>
                <TableCell>
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(pengeluaran.nominalAdministrasi)}
                </TableCell>
                <TableCell className="text-right">
                  {pengeluaran.penerimaAdministrasi}
                </TableCell>
                <TableCell className="text-right">
                  {pengeluaran.uraianAdministrasi}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2} className="font-medium text-black">
                Total
              </TableCell>
              <TableCell className="text-right text-black">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(totalPengeluaran)}
              </TableCell>
              <TableCell colSpan={2} className="font-medium"></TableCell>
            </TableRow>
          </TableFooter>
        </Table>

        <div>
          <br />
          <p className="py-2 pb-1">{`Saldo Periode yang dipilih : ${new Intl.NumberFormat(
            "id-ID",
            {
              style: "currency",
              currency: "IDR",
            }
          ).format(totalPenerimaan - totalPengeluaran)}`}</p>
          <p className="py-1">{`Saldo Awal : ${new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(saldoAwal)}`}</p>
          <p className="py-1">{`Saldo Akhir : ${new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(saldoAwal + totalPenerimaan - totalPengeluaran)}`}</p>
        </div>

        <br />
        <br />
        <br />
        <br />
      </div>
      <footer
        className={`flex justify-between p-3  ${isPrinted ? "" : "invisible"}`}
      >
        {/* Tandatangan dan nama untuk disetujui (di kiri) */}
        <div className="text-center">
          <p>Disetujui Oleh</p>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <p>
            (&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)
          </p>
        </div>

        {/* Tandatangan dan nama untuk dibuat (di kanan) */}
        <div className="text-center">
          <p>Dibuat Oleh</p>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <p>
            (&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)
          </p>
        </div>
      </footer>
    </body>
  );
}
export default Print;
