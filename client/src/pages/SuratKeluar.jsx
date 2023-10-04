/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useLoaderData } from "react-router-dom";
import { Form } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useContext, createContext, useState } from "react";

import { columns } from "../app/suratKeluar/column";
import SuratKeluarDataTable from "@/app/suratKeluar/data-table";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/suratKeluar");
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
      await customFetch.post("/suratKeluar", data);
      return toast.success("Surat added successfully ");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };
};

const AllSuratKeluarContext = createContext();
const SuratKeluar = () => {
  const { data } = useLoaderData();
  const { suratKeluar } = data;
  // console.log(suratKeluar);

  const [dataTable, setDataTable] = useState(suratKeluar);

  const reset = () => {
    document.getElementById("noSuratKeluar").reset();
    document.getElementById("tanggalSuratKeluar").reset();
    document.getElementById("tujuanKeluar").reset();
    document.getElementById("perihalKeluar").reset();
  };

  return (
    <AllSuratKeluarContext.Provider value={{ data, dataTable, setDataTable }}>
      <Wrapper>
        <Form method="post" className="form">
          <h4 className="form-title">Surat Keluar</h4>
          <div className="form-center">
            <FormRow labelText="no Surat" name="noSuratKeluar" />
            <FormRow
              type={"date"}
              labelText="tanggal Surat"
              name="tanggalSuratKeluar"
            />
            <FormRow labelText="tujuan Surat" name="tujuanKeluar" />
            <FormRow name="perihalKeluar" labelText="perihal" />
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
      <SuratKeluarDataTable columns={columns} data={dataTable} />
    </AllSuratKeluarContext.Provider>
  );
};

export const useAllSuratKeluarContext = () => useContext(AllSuratKeluarContext);
export default SuratKeluar;
