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

const EditViatikum = () => {
  return <div>EditViatikum</div>;
};
export default EditViatikum;
