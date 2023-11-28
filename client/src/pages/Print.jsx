import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { useLocation } from "react-router-dom";

export function Print() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

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
  return (
    <body className="text-black bg-white">
      <div className="max-w-full p-4">
        <h2 className="pb-4 text-center">{`Laporan Keuangan ${filterKomisi}`}</h2>
        <h4 className="py-4">Penerimaan</h4>
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
              <TableCell colSpan={2} className="font-medium text-black">
                Total
              </TableCell>
              <TableCell className="text-right text-black">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(totalPenerimaan)}
              </TableCell>
              <TableCell colSpan={2} className="font-medium"></TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </body>
  );
}
export default Print;
