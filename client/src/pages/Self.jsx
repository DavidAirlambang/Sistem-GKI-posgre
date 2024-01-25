/* eslint-disable react-refresh/only-export-components */
import { FormRow, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Link, useOutletContext } from "react-router-dom";

import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const action = () => {
  return async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    if (data.newPassword.length < 8) {
      return toast.error("Password baru minimal 8 character");
    }

    try {
      await customFetch.post(`/user/${data.id}`, data);
      toast.success("Profile Updated");
      return (window.location.href = "/");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };
};

const Self = () => {
  const { user } = useOutletContext();

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Edit User</h4>
        <input type="text" name="id" id="id" value={user.id} hidden />
        <div className="form-center">
          <FormRow
            labelText="email"
            name="email"
            defaultValue={user.email}
            readOnly
          />
          <FormRow labelText="nama" name="name" defaultValue={user.name} />
          <FormRow
            labelText="role"
            name="role"
            defaultValue={user.role}
            readOnly
          />
          <FormRow
            type={"password"}
            labelText="old password"
            name="oldPassword"
            placeholder={"Masukan Password lama"}
          />
          <FormRow
            type={"password"}
            labelText="new password"
            name="newPassword"
            placeholder={"Masukan Password baru (min 8 character)"}
          />
          <div></div>
          <SubmitBtn formBtn />
          <Link to="/dashboard/home" className="btn form-btn delete-btn">
            Back
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};
export default Self;
