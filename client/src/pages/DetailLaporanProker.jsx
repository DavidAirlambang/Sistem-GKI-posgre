import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Link, useLoaderData } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const DetailLaporanProker = () => {
  const { programKerja } = useLoaderData();
  const hasil =
    programKerja.totalAnggaran >= programKerja.realisasi
      ? "Surplus"
      : "Deficit";

  return (
    <Wrapper>
      <div className="grid w-full gap-1.5">
        <h5 className="pb-2">
          Nama Program Kerja : {programKerja.namaProgram}
        </h5>
        <h5 className="pb-2">
          Total Anggaran :{" "}
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(programKerja.totalAnggaran)}
        </h5>
        <h5 className="pb-2">
          Realisasi :{" "}
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(programKerja.realisasi)}
        </h5>
        <h5 className="pb-3">
          Status : <span className="bg-green-800">{hasil}</span>
        </h5>
        <Label htmlFor="message">Detail</Label>
        <Textarea
          disabled
          className="form-textarea"
          value={programKerja.laporanProker}
        />
      </div>
      <Link to="/dashboard/programKerja" className="btn form-btn delete-btn">
        Back
      </Link>
    </Wrapper>
  );
};
export default DetailLaporanProker;
