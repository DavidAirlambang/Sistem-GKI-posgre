/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useLoaderData } from "react-router-dom";
import { Form } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useContext, createContext, useState } from "react";
import { ASETLAIN } from "../../../utils/constants";

import { columns } from "../app/asetLain/columns";
import AsetLainDataTable from "@/app/asetLain/data-table";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/asetLain");
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
      await customFetch.post("/asetLain", data);
      return toast.success("Item added successfully ");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };
};

const AllAsetLainContext = createContext();
const AsetLain = () => {
  const { data } = useLoaderData();
  const { asetLain } = data;

  const [dataTable, setDataTable] = useState(asetLain);

  const reset = () => {
    document.getElementById("namaAsetLain").reset();
    document.getElementById("jumlahAsetLain").reset();
    document.getElementById("deskripsiAsetLain").reset();
    document.getElementById("peminjamAsetLain").reset();
    document.getElementById("lokasiAsetLain").reset();
  };

  return (
    <AllAsetLainContext.Provider value={{ data, dataTable, setDataTable }}>
      <Wrapper>
        <Form method="post" className="form">
          <h4 className="form-title">Aset Lain</h4>
          <div className="form-center">
            <FormRow labelText="nama aset lain" name="namaAsetLain" />
            <FormRow labelText="jenis aset lain" name="jenisAsetLain" />
            <FormRow labelText="jumlah aset lain" name="jumlahAsetLain" />
            <FormRowSelect
              labelText="lokasi"
              name="lokasiAsetLain"
              list={Object.values(ASETLAIN)}
            />
            <FormRow
              type="text"
              name="deskripsiAsetLain"
              labelText="deskripsi"
              placeholder='isikan "-" jika tidak ada deskripsi'
            />
            <FormRow
              labelText="peminjam aset lain"
              name="peminjamAsetLain"
              placeholder='isikan "-" jika tidak ada yang pinjam'
            />
            <SubmitBtn formBtn />
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
      <AsetLainDataTable columns={columns} data={dataTable} />
    </AllAsetLainContext.Provider>
  );
};

export const useAllAsetLainContext = () => useContext(AllAsetLainContext);
export default AsetLain;
