import { Form, redirect, Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, SubmitBtn } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
// eslint-disable-next-line react-refresh/only-export-components
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const pass = document.getElementById("password").value;
  const check = document.getElementById("checkPassword").value;

  if (pass !== check) {
    return toast.error("password tidak sama");
  }

  try {
    delete data.checkPassword;
    await customFetch.post("/auth/register", data);
    toast.success("Registration successful");
    return redirect("/");
  } catch (error) {
    toast.error(error?.response?.data?.msg);

    return error;
  }
};
const Register = () => {
  return (
    <Wrapper>
      <Form method="post" className="form">
        {/* <Logo /> */}
        <h4>Register</h4>
        <FormRow type="text" name="name" />
        <FormRow type="email" name="email" />
        <FormRow
          type="password"
          name="password"
          placeholder={"min 8 character"}
        />
        <FormRow
          type="password"
          name="checkPassword"
          labelText={"retype password"}
        />
        <SubmitBtn />
        <p>
          Already a member?
          <Link to="/." className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Register;
