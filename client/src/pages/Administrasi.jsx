/* eslint-disable react-refresh/only-export-components */
import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useLoaderData } from "react-router-dom";
import { Form } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useContext, createContext, useState } from "react";
import { ADMINISTRASI } from "../../../utils/constants";

import { columns } from "../app/administrasi/column";
import AdministrasiDataTable from "@/app/administrasi/data-table";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/administrasi");
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
      await customFetch.post("/administrasi", data);
      return toast.success("Item added successfully ");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };
};

const AllAdministrasiContext = createContext();

const Administrasi = () => {
  const { data } = useLoaderData();
  const { administrasi } = data;

  const [dataTable, setDataTable] = useState(administrasi);

  const reset = () => {
    document.getElementById("tanggalAdministrasi").reset();
    document.getElementById("nominalAdministrasi").reset();
    document.getElementById("tipeAdministrasi").reset();
    document.getElementById("penerimaAdministrasi").reset();
    document.getElementById("uraianAdministrasi").reset();
  };

  return (
    <AllAdministrasiContext.Provider value={{ data, dataTable, setDataTable }}>
      <Wrapper>
        <Form method="post" className="form">
          <h4 className="form-title">Administrasi Keuangan</h4>
          <div className="form-center">
            <FormRow
              type={"date"}
              labelText="Tanggal"
              name="tanggalAdministrasi"
            />
            <FormRow labelText="nominal" name="nominalAdministrasi" />
            <FormRowSelect
              labelText="tipe"
              name="tipeAdministrasi"
              list={Object.values(ADMINISTRASI)}
            />
            <FormRow name="penerimaAdministrasi" labelText="penerima" />
            <FormRow name="uraianAdministrasi" labelText="uraian" />
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
      <AdministrasiDataTable columns={columns} data={dataTable} />
    </AllAdministrasiContext.Provider>
  );
};

export const useAllAdministrasiContext = () =>
  useContext(AllAdministrasiContext);
export default Administrasi;
