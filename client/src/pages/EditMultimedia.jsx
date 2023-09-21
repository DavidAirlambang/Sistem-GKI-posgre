/* eslint-disable react-refresh/only-export-components */
import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Link, useLoaderData } from "react-router-dom";
import { MULTIMEDIA } from "../../../utils/constants";
import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(
      `/multimedia/${params.noMultimedia}`
    );
    return data;
  } catch (error) {
    toast.error(error.response.data.msg);
    return redirect("/dashboard/multimedia");
  }
};

export const action = () => {
  return async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.patch(`/multimedia/${params.noMultimedia}`, data);
      toast.success("Item Updated");
      return redirect("/dashboard/multimedia");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };
};

const EditMultimedia = () => {
  const { multimedia } = useLoaderData();
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Multimedia</h4>
        <div className="form-center">
          <FormRow
            labelText="nama Multimedia"
            name="namaMultimedia"
            defaultValue={multimedia.namaMultimedia}
          />
          <FormRow
            labelText="jenis Multimedia"
            name="jenisMultimedia"
            defaultValue={multimedia.jenisMultimedia}
          />
          <FormRow
            labelText="jumlah Multimedia"
            name="jumlahMultimedia"
            defaultValue={multimedia.jumlahMultimedia}
          />
          <FormRowSelect
            labelText="lokasi"
            name="lokasiMultimedia"
            list={Object.values(MULTIMEDIA)}
            defaultValue={multimedia.lokasiMultimedia}
          />
          <FormRow
            type="text"
            name="deskripsiMultimedia"
            labelText="deskripsi"
            defaultValue={multimedia.deskripsiMultimedia}
            placeholder='isikan "-" jika tidak ada deskripsi'
          />
          <FormRow
            labelText="peminjam Multimedia"
            name="peminjamMultimedia"
            defaultValue={multimedia.peminjamMultimedia}
            placeholder='isikan "-" jika tidak ada yang pinjam'
          />
          <SubmitBtn formBtn />
          <Link to="/dashboard/multimedia" className="btn form-btn delete-btn">
            Back
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};
export default EditMultimedia;
