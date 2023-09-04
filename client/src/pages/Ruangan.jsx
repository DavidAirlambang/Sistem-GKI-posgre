import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useOutletContext } from "react-router-dom";
import { RUANGAN_STATUS } from "../../../utils/constants";
import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const action = () => {
  return async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.post("/ruangs", data);
      // queryClient.invalidateQueries(["ruangs"]);
      window.location.reload();
      
      return toast.success("Ruangan added successfully ");
      
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };
};

const Ruangan = () => {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Tambah Ruangan</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="noRuangan"
            labelText="no ruangan"
          />
          <FormRow type="text" name="namaRuangan" labelText="nama ruangan" />
          <FormRow
            type="text"
            name="kapasitasRuangan"
            labelText="kapasitas ruangan"
          />
          <FormRow
            type="text"
            name="fasilitasRuangan"
            labelText="fasilitas ruangan"
          />
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
