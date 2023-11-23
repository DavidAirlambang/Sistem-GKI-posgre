/* eslint-disable react-refresh/only-export-components */
import { FormRow, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useLoaderData } from "react-router-dom";
import { Form } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { format } from "date-fns";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/limit");
    return { data };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

export const action = () => {
  return async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      await customFetch.patch("/limit", data);
      return toast.success("Batas tanggal updated");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };
};

const Limit = () => {
  const { data } = useLoaderData();
  const { limit } = data;
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Atur Periode</h4>
        <div className="form-center">
          <FormRow
            type={"datetime-local"}
            labelText="Awal Periode"
            name="awal"
            defaultValue={format(new Date(limit.awal), "yyyy-MM-dd hh:mm:ss")}
          />
          <FormRow
            type={"datetime-local"}
            labelText="Akhir Periode"
            name="akhir"
            defaultValue={format(new Date(limit.akhir), "yyyy-MM-dd hh:mm:ss")}
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};
export default Limit;
