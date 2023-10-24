/* eslint-disable react-refresh/only-export-components */
import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Link, useLoaderData } from "react-router-dom";
import { GUDANG } from "../../../utils/constants";
import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/gudang/${params.noBarang}`);

    return data;
  } catch (error) {
    toast.error(error.response.data.msg);
    return redirect("/dashboard/gudang");
  }
};

export const action = () => {
  return async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.patch(`/gudang/${params.noBarang}`, data);
      toast.success("Item Updated");
      return redirect("/dashboard/gudang");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };
};

const EditGudang = () => {
  const { barang } = useLoaderData();

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Barang Gudang</h4>
        <div className="form-center">
          <FormRow
            labelText="nama barang"
            name="namaBarang"
            defaultValue={barang.namaBarang}
          />
          <FormRow
            labelText="jumlah barang"
            name="jumlahBarang"
            defaultValue={barang.jumlahBarang}
          />
          <FormRowSelect
            labelText="lokasi"
            name="lokasiGudang"
            list={Object.values(GUDANG)}
            defaultValue={barang.lokasiGudang}
          />
          <FormRow
            type="text"
            name="keterangan"
            labelText="keterangan"
            placeholder='isikan "-" jika tidak ada keterangan'
            defaultValue={barang.keterangan}
          />
          <FormRow
            type="text"
            name="nilaiAset"
            labelText="nilai Aset"
            defaultValue={barang.nilaiAset.toString()}
          />
          <div></div>
          <SubmitBtn formBtn />
          <Link to="/dashboard/gudang" className="btn form-btn delete-btn">
            Back
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};
export default EditGudang;
