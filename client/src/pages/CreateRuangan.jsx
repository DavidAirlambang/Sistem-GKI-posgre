import { FormRow, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const action = () => {
  return async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.post("/ruangs", data);
      toast.success("Ruangan added successfully ");
      return redirect("/dashboard/ruangs");
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
          <FormRow type="text" name="namaRuangan" labelText="nama ruangan" />
          <FormRow
            type="text"
            name="kapasitasRuangan"
            labelText="kapasitas ruangan"
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};
export default Ruangan;
