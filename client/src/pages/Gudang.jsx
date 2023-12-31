/* eslint-disable no-unused-vars */
import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useLoaderData } from "react-router-dom";
import { GUDANG } from "../../../utils/constants";
import { Form } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import GudangTable, { GudangDataTable } from "../app/gudang/data-table";
import { useContext, createContext, useState } from "react";

import { columns } from "../app/gudang/columns";

import { ThemeProvider } from "../components/ThemeProvider";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/gudang");
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
      await customFetch.post("/gudang", data);
      // queryClient.invalidateQueries(["ruangs"]);
      // window.location.reload();
      return toast.success("Item added successfully ");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };
};

const AllGudangContext = createContext();
const Gudang = () => {
  const { data } = useLoaderData();
  const { barangs } = data;

  const [dataTable, setDataTable] = useState(barangs);

  const reset = () => {
    document.getElementById("namaBarang").reset();
    document.getElementById("jumlahBarang").reset();
    document.getElementById("keterangan").reset();
    document.getElementById("lokasi").reset();
  };

  return (
    <AllGudangContext.Provider value={{ data, dataTable, setDataTable }}>
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
              name="keterangan"
              labelText="keterangan"
              placeholder='isikan "-" jika tidak ada keterangan'
            />
            <FormRow type="text" name="nilaiAset" labelText="nilai Aset" />
            <div></div>
            <SubmitBtn formBtn />
            {/* <Link to="/dashboard/gudang" className="btn form-btn delete-btn">
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
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <GudangDataTable columns={columns} data={dataTable} />
      </ThemeProvider>
      {/* data={data} */}
    </AllGudangContext.Provider>
  );
};

export const useAllGudangContext = () => useContext(AllGudangContext);

export default Gudang;
