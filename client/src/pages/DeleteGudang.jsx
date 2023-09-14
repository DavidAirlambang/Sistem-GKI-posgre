import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const action = async ({ params }) => {
  try {
    await customFetch.delete(`/gudang/${params.noBarang}`);
    return toast.success("Item deleted successfully");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};
