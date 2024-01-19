/* eslint-disable react-refresh/only-export-components */
import { FormRow, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form, Link, redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(
      `/ruangs/booking/${params.noRuangan}`
    );
    return data;
  } catch (error) {
    toast.error(error.response.data.msg);
    return redirect("/dashboard/ruangan");
  }
};

export const action = () => {
  return async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.patch(`/ruangs/${params.noRuangan}`, data);
      toast.success("Ruangan Updated");
      return redirect("/dashboard/ruangs");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };
};
const Ruangan = () => {
  const { ruang } = useLoaderData();

  const deleteRuang = async (noRuangan) => {
    try {
      await customFetch.delete(`/ruangs/${noRuangan}`);
      toast.success("Item deleted successfully");
      return (window.location.href = "/dashboard/home");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        toast.error(error.response.data.msg);
      } else {
        toast.error("An error occurred while deleting the item.");
      }
      return error;
    }
  };

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Edit Ruangan</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="namaRuangan"
            labelText="nama ruangan"
            defaultValue={ruang.namaRuangan}
          />
          <FormRow
            type="text"
            name="kapasitasRuangan"
            labelText="kapasitas ruangan"
            defaultValue={ruang.kapasitasRuangan}
          />

          <div></div>
          <SubmitBtn formBtn />

          {/* delete */}
          <Link to="/dashboard/ruangs" className="btn form-btn delete-btn">
            Back
          </Link>
          {/* <button
            className="btn form-btn delete-btn"
            onClick={async () => {
              deleteRuang(ruang.noRuangan);
            }}
          >
            Delete
          </button> */}
        </div>
      </Form>
    </Wrapper>
  );
};
export default Ruangan;
