/* eslint-disable react-refresh/only-export-components */
import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Link, useLoaderData } from "react-router-dom";
import { ROLE } from "../../../utils/constants";
import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/user/${params.id}`);
    console.log(data);
    return data;
  } catch (error) {
    toast.error(error.response.data.msg);
    return redirect("/dashboard/user");
  }
};

export const action = () => {
  return async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.post(`/user/role/${params.id}`, data);
      toast.success("Item Updated");
      return redirect("/dashboard/userManagement");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };
};

const EditUser = () => {
  const { user } = useLoaderData();

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Edit User</h4>
        <div className="form-center">
          <FormRow
            labelText="email"
            name="email"
            defaultValue={user.email}
            readOnly
          />
          <FormRow
            labelText="nama"
            name="name"
            defaultValue={user.name}
            readOnly
          />
          <FormRowSelect
            labelText="role"
            name="role"
            list={Object.values(ROLE)}
            defaultValue={user.role}
          />
          <SubmitBtn formBtn />
          <Link to="/dashboard/user" className="btn form-btn delete-btn">
            Back
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};
export default EditUser;
