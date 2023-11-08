import { redirect } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export async function action({ request, params }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.patch(`/ruangs/approve/${params.noRuangan}`, {
      userId: data.userId,
    });
    toast.success("Booking Approved");
  } catch (error) {
    toast.error(error.response.data.msg);
  }
  return redirect("/dashboard/ruangs");
}
