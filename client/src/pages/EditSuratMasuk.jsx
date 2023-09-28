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
      `/suratMasuk/${params.noSuratMasuk}`
    );
    return data;
  } catch (error) {
    toast.error(error.response.data.msg);
    return redirect("/dashboard/suratMasuk");
  }
};

export const action = () => {
  return async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.patch(`/suratMasuk/${params.noSuratMasuk}`, data);
      toast.success("Item Updated");
      return redirect("/dashboard/suratMasuk");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };
};

const EditSuratMasuk = () => {
  const { suratMasuk } = useLoaderData();
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Surat Masuk</h4>
        <div className="form-center">
          <FormRow
            labelText="no Surat"
            name="noSuratMasuk"
            defaultValue={suratMasuk.noSuratMasuk}
          />
          <FormRow
            type={"date"}
            labelText="tanggal Masuk"
            name="tanggalMasuk"
            defaultValue={format(
              new Date(suratMasuk.tanggalMasuk),
              "yyyy-MM-dd"
            )}
          />
          <FormRow
            type={"date"}
            labelText="tanggal Surat"
            name="tanggalSuratMasuk"
            defaultValue={format(
                new Date(suratMasuk.tanggalSuratMasuk),
                "yyyy-MM-dd"
              )}
          />
          <FormRow
            labelText="pengirim Surat"
            name="pengirimMasuk"
            defaultValue={suratMasuk.pengirimMasuk}
          />
          <FormRow
            name="perihalMasuk"
            labelText="perihal"
            defaultValue={suratMasuk.perihalMasuk}
          />
          <FormRow
            labelText="event"
            name="eventMasuk"
            defaultValue={suratMasuk.eventMasuk}
          />
          <FormRow
            labelText="disposisi"
            name="disposisiMasuk"
            defaultValue={suratMasuk.disposisiMasuk}
          />
          <SubmitBtn formBtn />
          <Link to="/dashboard/suratMasuk" className="btn form-btn delete-btn">
            Back
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};
export default EditSuratMasuk;
