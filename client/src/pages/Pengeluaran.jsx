/* eslint-disable react-refresh/only-export-components */
import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useContext, createContext, useState, useEffect } from "react";
import { ROLE } from "../../../utils/constants";

import { columns } from "../app/pengeluaran/column";
import PengeluaranDataTable from "@/app/pengeluaran/data-table";

const loader = async () => {
  try {
    const { data } = await customFetch.post("/administrasi", {
      tipeAdministrasi: "kredit",
    });
    console.log(data);
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
      await customFetch.post("/administrasi/create", {
        ...data,
        tipeAdministrasi: "kredit",
      });
      return toast.success("Item added successfully ");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };
};

const AllPengeluaranContext = createContext();

const Pengeluaran = () => {
  const [dataTable, setDataTable] = useState([]);
  const [dataKomisi, setDataKomisi] = useState([]);
  const [filterKomisi, setFilterKomisi] = useState("All");

  const ambilNamaProgram = async () => {
    try {
      const { data } = await customFetch.post("/proker/nama", {
        komisi: document.getElementById("penerimaAdministrasi").value,
      });
      const { programKerja } = await data;
      const namaPrograms = programKerja.map((program) => program.namaProgram);

      setDataKomisi(namaPrograms);
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };

  const reset = () => {
    setDataKomisi([]);
    document.getElementById("tanggalAdministrasi").reset();
    document.getElementById("nominalAdministrasi").reset();
    document.getElementById("penerimaAdministrasi").reset();
    document.getElementById("uraianAdministrasi").reset();
    document.getElementById("namaProgram").reset();
  };

  const filteredRoles = Object.values(ROLE).filter((role) => role !== "admin");

  // fetching
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await loader();
      const { administrasi } = await data;
      setDataTable(administrasi || []);
    };

    fetchData();
  }, []);

  return (
    <AllPengeluaranContext.Provider
      value={{
        dataTable,
        setDataTable,
        filterKomisi,
        setFilterKomisi,
      }}
    >
      <Wrapper>
        <Form method="post" className="form">
          <h4 className="form-title">Pengeluaran</h4>
          <div className="form-center">
            <FormRow
              type={"date"}
              labelText="Tanggal"
              name="tanggalAdministrasi"
            />
            <FormRow labelText="nominal" name="nominalAdministrasi" />
            <FormRowSelect
              labelText="penerima"
              name="penerimaAdministrasi"
              list={["--pilih komisi--", ...filteredRoles]}
              onChange={() => ambilNamaProgram()}
            />
            <FormRowSelect
              labelText="Nama Program Kerja"
              name="namaProgram"
              list={dataKomisi}
              disable={dataKomisi.length > 0 ? false : true}
              required={true}
            />
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
      <PengeluaranDataTable columns={columns} data={dataTable} />
    </AllPengeluaranContext.Provider>
  );
};

export const useAllPengeluaranContext = () => useContext(AllPengeluaranContext);
export default Pengeluaran;
