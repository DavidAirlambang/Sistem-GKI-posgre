import { redirect } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export async function action({ params }) {
  try {
    await customFetch.patch(`/ruangs/approve/${params.noRuangan}`);
    toast.success('Booking Approved');
  } catch (error) {
    toast.error(error.response.data.msg);
  }
  return redirect('/dashboard/ruangs');
}