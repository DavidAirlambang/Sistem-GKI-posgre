/* eslint-disable react-refresh/only-export-components */
import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Link, useLoaderData } from "react-router-dom";
import { ADMINISTRASI } from "../../../utils/constants";
import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { format } from "date-fns";

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(
      `/administrasi/${params.noAdministrasi}`
    );
    return data;
  } catch (error) {
    toast.error(error.response.data.msg);
    return redirect("/dashboard/administrasi");
  }
};

export const action = () => {
  return async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.patch(`/administrasi/${params.noAdministrasi}`, data);
      toast.success("Item Updated");
      return redirect("/dashboard/administrasi");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };
};

const EditAdministrasi = () => {
  const { administrasi } = useLoaderData();
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Administrasi Keuangan</h4>
        <div className="form-center">
          <FormRow
            type={"date"}
            labelText="Tanggal"
            name="tanggalAdministrasi"
            defaultValue={format(
              new Date(administrasi.tanggalAdministrasi),
              "yyyy-MM-dd"
            )}
          />
          <FormRow
            labelText="nominal"
            name="nominalAdministrasi"
            defaultValue={administrasi.nominalAdministrasi}
          />
          <FormRowSelect
            labelText="tipe"
            name="tipeAdministrasi"
            list={Object.values(ADMINISTRASI)}
            defaultValue={administrasi.tipeAdministrasi}
          />
          <FormRow
            name="penerimaAdministrasi"
            labelText="penerima"
            defaultValue={administrasi.penerimaAdministrasi}
          />
          <FormRow
            name="uraianAdministrasi"
            labelText="uraian"
            defaultValue={administrasi.uraianAdministrasi}
          />
          <SubmitBtn formBtn />
          <Link
            to="/dashboard/administrasi"
            className="btn form-btn delete-btn"
          >
            Back
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};
export default EditAdministrasi;
