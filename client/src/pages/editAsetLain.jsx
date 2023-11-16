/* eslint-disable react-refresh/only-export-components */
import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Link, useLoaderData } from "react-router-dom";
import { ASETLAIN } from "../../../utils/constants";
import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/asetLain/${params.noAsetLain}`);
    return data;
  } catch (error) {
    toast.error(error.response.data.msg);
    return redirect("/dashboard/asetLain");
  }
};

export const action = () => {
  return async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.patch(`/asetLain/${params.noAsetLain}`, data);
      toast.success("Item Updated");
      return redirect("/dashboard/asetLain");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };
};

const EditAsetLain = () => {
  const { asetLain } = useLoaderData();
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Aset Lain</h4>
        <div className="form-center">
          <FormRow
            labelText="nama AsetLain"
            name="namaAsetLain"
            defaultValue={asetLain.namaAsetLain}
          />
          <FormRow
            labelText="jenis AsetLain"
            name="jenisAsetLain"
            defaultValue={asetLain.jenisAsetLain}
          />
          <FormRow
            labelText="jumlah AsetLain"
            name="jumlahAsetLain"
            defaultValue={asetLain.jumlahAsetLain}
          />
          <FormRow
            labelText="lokasi"
            name="lokasiAsetLain"
            defaultValue={asetLain.lokasiAsetLain}
          />
          {/* <FormRowSelect
            labelText="lokasi"
            name="lokasiAsetLain"
            list={Object.values(ASETLAIN)}
            defaultValue={asetLain.lokasiAsetLain}
          /> */}
          <FormRow
            type="text"
            name="deskripsiAsetLain"
            labelText="deskripsi"
            defaultValue={asetLain.deskripsiAsetLain}
            placeholder='isikan "-" jika tidak ada deskripsi'
          />
          <FormRow
            labelText="peminjam AsetLain"
            name="peminjamAsetLain"
            defaultValue={asetLain.peminjamAsetLain}
            placeholder='isikan "-" jika tidak ada yang pinjam'
          />
          <FormRow
            type="text"
            name="nilaiAset"
            labelText="nilai Aset"
            defaultValue={asetLain.nilaiAset.toString()}
          />
          <SubmitBtn formBtn />
          <Link to="/dashboard/asetLain" className="btn form-btn delete-btn">
            Back
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};
export default EditAsetLain;
