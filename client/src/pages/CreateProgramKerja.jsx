/* eslint-disable react-refresh/only-export-components */
import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Link, redirect, useOutletContext } from "react-router-dom";
import { Form } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { ROLE_SELECT } from "../../../utils/constants";

export const action = () => {
  return async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      await customFetch.post("/proker/create", data);
      toast.success("Item added successfully ");
      return redirect("/dashboard/programKerja");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };
};

const CreateProgramKerja = () => {
  const { user } = useOutletContext();
  const filteredRoles = Object.values(ROLE_SELECT).filter(
    (role) => role !== "admin"
  );
  const reset = () => {
    document.getElementById("kodeProgram").reset();
    document.getElementById("tahun").reset();
    document.getElementById("namaProgram").reset();
    document.getElementById("penanggungJawab").reset();
    document.getElementById("tujuanKegiatan").reset();
    document.getElementById("targetPeserta").reset();
    document.getElementById("waktuPelaksanaan").reset();
    document.getElementById("totalAnggaran").reset();
    document.getElementById("tanggalProker").reset();
    document.getElementById("rincianRencana").reset();
  };

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Program Kerja</h4>
        <div className="form-center">
          <FormRowSelect
            name="komisi"
            labelText="komisi"
            list={
              user.role === "admin" ||
              user.role === "majelis" ||
              user.role === "staff keuangan"
                ? filteredRoles
                : [user.role]
            }
          />
          <FormRow name="kodeProgram" labelText="kode program" />
          <FormRow name="tahun" labelText="tahun program" />
          <FormRow name="namaProgram" labelText="nama program" />
          <FormRow name="penanggungJawab" labelText="penaggung jawab" />
          <FormRow name="tujuanKegiatan" labelText="tujuan kegiatan" />
          <FormRow name="targetPeserta" labelText="target peserta" />
          <FormRow name="waktuPelaksanaan" labelText="waktu pelaksanaan" />
          <FormRow name="totalAnggaran" labelText="total anggaran" />
          {/* <FormRow name="realisasi" labelText="realisasi" /> */}
          <FormRow type={"date"} name="tanggalProker" labelText="tanggal" />
          <FormRow
            type={"textarea"}
            name="rincianRencana"
            labelText="rincian rencana"
          />
          <div></div>
          <SubmitBtn formBtn />
          <button
            className="btn form-btn delete-btn"
            type="reset"
            onClick={() => reset()}
          >
            clear
          </button>

          <Link
            to="/dashboard/programKerja"
            className="btn form-btn delete-btn"
          >
            Back
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};
export default CreateProgramKerja;
