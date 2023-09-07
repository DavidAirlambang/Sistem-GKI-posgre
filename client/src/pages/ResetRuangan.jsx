import { redirect } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export async function action({ params }) {
  try {
    await customFetch.patch(`/ruangs/reset/${params.noRuangan}`);
    toast.success('Room Reset Successful');
  } catch (error) {
    toast.error(error.response.data.msg);
  }
  return redirect('/dashboard/ruangs');
}