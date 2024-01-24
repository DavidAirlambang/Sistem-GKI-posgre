/* eslint-disable react-refresh/only-export-components */
import { FormRow, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Link, useLoaderData } from "react-router-dom";
import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { format } from "date-fns";

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(
      `/suratKeluar/${encodeURIComponent(params.noSuratKeluar)}`
    );
    return data;
  } catch (error) {
    toast.error(error.response.data.msg);
    return redirect("/dashboard/suratKeluar");
  }
};

export const action = () => {
  return async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.patch(
        `/suratKeluar/${encodeURIComponent(params.noSuratKeluar)}`,
        data
      );
      toast.success("Item Updated");
      return redirect("/dashboard/suratKeluar");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };
};

const EditSuratKeluar = () => {
  const { suratKeluar } = useLoaderData();
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Surat Keluar</h4>
        <div className="form-center">
          <FormRow
            labelText="no Surat"
            name="noSuratKeluar"
            defaultValue={suratKeluar.noSuratKeluar}
          />
          <FormRow
            type={"date"}
            labelText="tanggal Surat"
            name="tanggalSuratKeluar"
            defaultValue={format(
              new Date(suratKeluar.tanggalSuratKeluar),
              "yyyy-MM-dd"
            )}
          />
          <FormRow
            labelText="tujuan Surat"
            name="tujuanKeluar"
            defaultValue={suratKeluar.tujuanKeluar}
          />
          <FormRow
            name="perihalKeluar"
            labelText="perihal"
            defaultValue={suratKeluar.perihalKeluar}
          />
          <div></div>
          <div></div>
          <SubmitBtn formBtn />
          <Link to="/dashboard/suratKeluar" className="btn form-btn delete-btn">
            Back
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};
export default EditSuratKeluar;
