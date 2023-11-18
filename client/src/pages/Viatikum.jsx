/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useLoaderData } from "react-router-dom";
import { Form } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useContext, createContext, useState } from "react";

import { columns } from "../app/viatikum/column";
import ViatikumDataTable from "@/app/viatikum/data-table";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/viatikum");
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
      await customFetch.post("/viatikum", data);
      return toast.success("Viatikum added successfully ");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };
};

const AllViatikumContext = createContext();

const Viatikum = () => {
  const { data } = useLoaderData();
  const { viatikum } = data;

  const [dataTable, setDataTable] = useState(viatikum);

  const reset = () => {
    document.getElementById("nama").reset();
    document.getElementById("kelompok").reset();
    document.getElementById("viatikum").reset();
    document.getElementById("pertahun").reset();
    document.getElementById("tahun").reset();
    document.getElementById("keterangan").reset();
    document.getElementById("kodeProgram").reset();
  };

  const hitungPerTahun = () => {
    const viatikum = document.getElementById("viatikum").value;
    console.log(viatikum * 12);
    document.getElementById("pertahun").value = (viatikum * 12).toString();
  };

  return (
    <AllViatikumContext.Provider value={{ data, dataTable, setDataTable }}>
      <Wrapper>
        <Form method="post" className="form">
          <h4 className="form-title">Viatikum</h4>
          <div className="form-center">
            <FormRow labelText="kode Program" name="kodeProgram" />
            <FormRow labelText="nama" name="nama" />
            <FormRow labelText="kelompok" name="kelompok" />
            <FormRow
              labelText="viatikum"
              name="viatikum"
              onChange={() => {
                hitungPerTahun();
              }}
            />
            <FormRow labelText="pertahun" name="pertahun" readOnly />
            <FormRow
              labelText="tahun"
              name="tahun"
              defaultValue={new Date().getFullYear().toString()}
            />
            <FormRow
              type={"textarea"}
              name="keterangan"
              labelText="keterangan"
            />
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
      <ViatikumDataTable columns={columns} data={dataTable} />
    </AllViatikumContext.Provider>
  );
};

export const useAllViatikumContext = () => useContext(AllViatikumContext);
export default Viatikum;
