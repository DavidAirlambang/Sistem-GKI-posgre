/* eslint-disable react-refresh/only-export-components */
import { FormRow, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Link, useLoaderData } from "react-router-dom";

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
            labelText="nama Aset Lain"
            name="namaAsetLain"
            defaultValue={asetLain.namaAsetLain}
          />
          <FormRow
            labelText="jenis Aset Lain"
            name="jenisAsetLain"
            defaultValue={asetLain.jenisAsetLain}
          />
          <FormRow
            labelText="jumlah Aset Lain"
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
            labelText="peminjam Aset Lain"
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
          <div></div>
          <div></div>
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
