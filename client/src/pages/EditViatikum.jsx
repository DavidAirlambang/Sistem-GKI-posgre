/* eslint-disable react-refresh/only-export-components */
import { FormRow, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Link, useLoaderData } from "react-router-dom";
import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/viatikum/${params.noViatikum}`);
    return data;
  } catch (error) {
    toast.error(error.response.data.msg);
    return redirect("/dashboard/viatikum");
  }
};

export const action = () => {
  return async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.patch(`/viatikum/${params.noViatikum}`, data);
      toast.success("Item Updated");
      return redirect("/dashboard/viatikum");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };
};

const EditViatikum = () => {
  const hitungPerTahun = () => {
    const viatikum = document.getElementById("viatikum").value;
    console.log(viatikum * 12);
    document.getElementById("pertahun").value = (viatikum * 12).toString();
  };

  const { viatikum } = useLoaderData();

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Viatikum</h4>
        <div className="form-center">
          <input type="hidden" value={viatikum.kodeProgram} />
          <FormRow labelText="nama" name="nama" defaultValue={viatikum.nama} />
          <FormRow
            labelText="kelompok"
            name="kelompok"
            defaultValue={viatikum.kelompok}
          />
          <FormRow
            labelText="viatikum"
            name="viatikum"
            onChange={() => {
              hitungPerTahun();
            }}
            defaultValue={viatikum.viatikum}
          />
          <FormRow
            labelText="pertahun"
            name="pertahun"
            defaultValue={viatikum.pertahun}
            readOnly
          />
          <FormRow
            labelText="tahun"
            name="tahun"
            defaultValue={viatikum.tahun || new Date().getFullYear().toString()}
          />
          <FormRow
            type={"textarea"}
            name="keterangan"
            labelText="keterangan"
            defaultValue={viatikum.keterangan}
          />
          <SubmitBtn formBtn />
          <Link to="/dashboard/viatikum" className="btn form-btn delete-btn">
            Back
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};
export default EditViatikum;
