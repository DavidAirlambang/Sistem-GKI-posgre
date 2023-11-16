/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import {
  Link,
  useParams,
  useOutletContext,
  useSubmit,
  useLoaderData,
} from "react-router-dom";
import { ROLE_SELECT, RUANGAN_STATUS } from "../../../utils/constants";
import { Form, redirect } from "react-router-dom";
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
      await customFetch.patch(`/ruangs/booking/${params.noRuangan}`, data);
      toast.success("Ruangan Booked");
      return redirect("/dashboard/ruangs");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };
};

const BookingRuangan = () => {
  const { user } = useOutletContext();
  console.log(user);
  const list = [user.role];
  return (
    <Wrapper>
      <Form method="post" className="form">
        <input type="hidden" name="userId" value={user.id} />
        <h4 className="form-title">Booking Ruangan</h4>
        <div className="form-center">
          <FormRowSelect
            labelText="komisi/Majelis Jemaat"
            name="komisi"
            list={
              user.role === "admin" || user.role === "staff kantor"
                ? Object.values(ROLE_SELECT)
                : list
            }
          />
          <FormRow type="datetime-local" name="jadwal" />
          <FormRow
            type="text"
            name="keteranganSoundSystem"
            labelText="keterangan sound system"
            placeholder='isikan "-" jika tidak ada keterangan'
          />
          <FormRow
            type="text"
            name="keteranganProjector"
            labelText="keterangan projector"
            placeholder='isikan "-" jika tidak ada keterangan'
          />
          <SubmitBtn formBtn />
          <Link to="/dashboard/ruangs" className="btn form-btn delete-btn">
            Back
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};
export default BookingRuangan;
