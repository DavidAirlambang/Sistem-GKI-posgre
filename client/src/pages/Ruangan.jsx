import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useOutletContext } from "react-router-dom";
import { JOB_STATUS, JOB_TYPE, RUANGAN_STATUS } from "../../../utils/constants";
import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

const Ruangan = () => {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Tambah Ruangan</h4>
        <div className="form-center">
          <FormRow type="text" name="namaRuangan" labelText="nama ruangan" />
          <FormRow type="text" name="kapasitas" />
          <FormRow type="text" name="fasilitas" />
          <FormRowSelect
            labelText="status"
            name="statusRuangan"
            defaultValue={RUANGAN_STATUS.AVAILABLE}
            list={Object.values(RUANGAN_STATUS)}
          />
          <FormRow type="text" name="jadwal" />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};
export default Ruangan;
