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
import { GUDANG, ROLE, RUANGAN_STATUS } from "../../../utils/constants";
import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

const Gudang = () => {
  const { user } = useOutletContext();
  const list = [user.role];
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Barang Gudang</h4>
        <div className="form-center">
          <FormRow labelText="nama barang" name="namaBarang" />
          <FormRow labelText="jumlah barang" name="jumlahBarang" />
          <FormRowSelect
            labelText="lokasi"
            name="lokasiGudang"
            list={Object.values(GUDANG)}
          />
          <FormRow
            type="text"
            name="keteranganGudang"
            labelText="keterangan"
            placeholder='isikan "-" jika tidak ada keterangan'
          />
          <SubmitBtn formBtn/>
          {/* <Link to="/dashboard/gudang" className="btn form-btn delete-btn">
            Back
          </Link> */}
        </div>
      </Form>
    </Wrapper>
  );
};
export default Gudang;
