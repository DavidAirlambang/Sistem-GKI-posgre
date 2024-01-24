/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useLoaderData } from "react-router-dom";
import { Form } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useContext, createContext, useState } from "react";

import { columns } from "../app/suratMasuk/column";
import SuratMasukDataTable from "@/app/suratMasuk/data-table";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/suratMasuk");
    return { data };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

export const action = () => {
  return async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      await customFetch.post("/suratMasuk", data);
      return toast.success("Surat added successfully ");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };
};

const AllSuratMasukContext = createContext();
const SuratMasuk = () => {
  const { data } = useLoaderData();
  const { suratMasuk } = data;
  // console.log(suratMasuk);

  const [dataTable, setDataTable] = useState(suratMasuk);

  const reset = () => {
    document.getElementById("noSuratMasuk").reset();
    document.getElementById("tanggalMasuk").reset();
    document.getElementById("tanggalSuratMasuk").reset();
    document.getElementById("pengirimMasuk").reset();
    document.getElementById("perihalMasuk").reset();
    document.getElementById("eventMasuk").reset();
    document.getElementById("disposisiMasuk").reset();
  };

  return (
    <AllSuratMasukContext.Provider value={{ data, dataTable, setDataTable }}>
      <Wrapper>
        <Form method="post" className="form">
          <h4 className="form-title">Surat Masuk</h4>
          <div className="form-center">
            <FormRow labelText="no Surat" name="noSuratMasuk" />
            <FormRow
              type={"date"}
              labelText="tanggal Masuk"
              name="tanggalMasuk"
            />
            <FormRow
              type={"date"}
              labelText="tanggal Surat"
              name="tanggalSuratMasuk"
            />
            <FormRow labelText="pengirim Surat" name="pengirimMasuk" />
            <FormRow name="perihalMasuk" labelText="perihal" />
            <FormRow labelText="event" name="eventMasuk" />
            <FormRow labelText="disposisi" name="disposisiMasuk" />
            <div></div>
            <div></div>
            <SubmitBtn formBtn />
            {/* <Link to="/dashboard/Multimedia" className="btn form-btn delete-btn">
        Back
      </Link> */}
            <button
              className="btn form-btn delete-btn"
              type="reset"
              onClick={() => reset()}
            >
              clear
            </button>
          </div>
        </Form>
      </Wrapper>
      <SuratMasukDataTable columns={columns} data={dataTable} />
    </AllSuratMasukContext.Provider>
  );
};

export const useAllSuratMasukContext = () => useContext(AllSuratMasukContext);
export default SuratMasuk;
