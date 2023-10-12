/* eslint-disable react-refresh/only-export-components */
import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Link, redirect } from "react-router-dom";
import { Form } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { ROLE } from "../../../utils/constants";

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
  const filteredRoles = Object.values(ROLE).filter((role) => role !== "admin");
  const reset = () => {
    document.getElementById("tanggalProgramKerja").reset();
    document.getElementById("nominalProgramKerja").reset();
    document.getElementById("tipeProgramKerja").reset();
    document.getElementById("penerimaProgramKerja").reset();
    document.getElementById("uraianProgramKerja").reset();
  };

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Program Kerja</h4>
        <div className="form-center">
          <FormRowSelect
            name="komisi"
            labelText="komisi"
            list={filteredRoles}
          />
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
