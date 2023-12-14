/* eslint-disable react-refresh/only-export-components */
import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Link, useLoaderData, useOutletContext } from "react-router-dom";
import { ROLE_SELECT } from "../../../utils/constants";
import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { format } from "date-fns";

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/proker/${params.noProker}`);
    return data;
  } catch (error) {
    toast.error(error.response.data.msg);
    return redirect("/dashboard/programKerja");
  }
};

export const action = () => {
  return async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.patch(`/proker/${params.noProker}`, data);

      toast.success("Item Updated");
      return redirect("/dashboard/programKerja");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };
};

const EditProgramKerja = () => {
  const { user } = useOutletContext();
  const { programKerja } = useLoaderData();
  const filteredRoles = Object.values(ROLE_SELECT).filter(
    (role) => role !== "admin"
  );

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Program Kerja</h4>
        <div className="form-center">
          <FormRow
            name="kodeProgram"
            labelText="kode program"
            defaultValue={programKerja.kodeProgram}
            readOnly
          />
          <FormRow
            name="tahun"
            labelText="tahun program"
            defaultValue={programKerja.tahun}
            readOnly
          />
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
            defaultValue={programKerja.komisi}
          />
          <FormRow
            name="namaProgram"
            labelText="nama program"
            defaultValue={programKerja.namaProgram}
          />
          <FormRow
            name="penanggungJawab"
            labelText="penaggung jawab"
            defaultValue={programKerja.penanggungJawab}
          />
          <FormRow
            name="tujuanKegiatan"
            labelText="tujuan kegiatan"
            defaultValue={programKerja.tujuanKegiatan}
          />
          <FormRow
            name="targetPeserta"
            labelText="target peserta"
            defaultValue={programKerja.targetPeserta}
          />
          <FormRow
            name="waktuPelaksanaan"
            labelText="waktu pelaksanaan"
            defaultValue={programKerja.waktuPelaksanaan}
          />
          <FormRow
            name="totalAnggaran"
            labelText="total anggaran"
            defaultValue={programKerja.totalAnggaran}
          />
          <FormRow
            type={"date"}
            name="tanggalProker"
            labelText="tanggal"
            defaultValue={format(
              new Date(programKerja.tanggalProker),
              "yyyy-MM-dd"
            )}
          />
          <FormRow
            type={"textarea"}
            name="rincianRencana"
            labelText="rincian rencana"
            defaultValue={programKerja.rincianRencana}
          />
          <div></div>
          <SubmitBtn formBtn />
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
export default EditProgramKerja;
