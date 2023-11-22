/* eslint-disable react-refresh/only-export-components */
import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Link, useLoaderData, useOutletContext } from "react-router-dom";
import { ROLE_SELECT } from "../../../utils/constants";
import { Form } from "react-router-dom";

const DuplicateProgramKerja = () => {
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
          />
          <FormRow name="tahun" labelText="tahun program" />
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
          <FormRow type={"date"} name="tanggalProker" labelText="tanggal" />
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
export default DuplicateProgramKerja;
