/* eslint-disable react-refresh/only-export-components */
import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useLoaderData } from "react-router-dom";
import { Form } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useContext, createContext, useState } from "react";
import { ROLE_SELECT } from "../../../utils/constants";

import { columns } from "../app/administrasi/column";
import AdministrasiDataTable from "@/app/administrasi/data-table";

export const loader = async () => {
  try {
    const debitResponse = await customFetch.post("/administrasi", {
      tipeAdministrasi: "debit",
    });

    const kreditResponse = await customFetch.post("/administrasi", {
      tipeAdministrasi: "kredit",
    });

    const debitData = debitResponse.data;
    const kreditData = kreditResponse.data;

    return { debitData, kreditData };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

export const action = () => {
  return async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    // pemisahan
    const laporanProker = data.laporanProker;
    delete data.laporanProker;

    try {
      await customFetch.post("/administrasi/create", {
        ...data,
      });

      // update realisasi
      if (data.tipeAdministrasi === "kredit") 
        await customFetch.post("/proker/realisasi", {
          namaProgram: data.namaProgram,
          realisasi: data.nominalAdministrasi,
          laporan: laporanProker,
        });
      return toast.success("Item added successfully ");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };
};

const AllAdministrasiContext = createContext();

const Administrasi = () => {
  const { debitData } = useLoaderData();

  const [dataTable, setDataTable] = useState([]);
  const [dataKomisi, setDataKomisi] = useState([]);
  const [filterKomisi, setFilterKomisi] = useState("All");

  const ambilNamaProgram = async () => {
    try {
      const { data } = await customFetch.post("/proker/nama", {
        komisi: document.getElementById("penerimaAdministrasi").value,
      });
      const { programKerja } = await data;
      // Menggunakan map untuk mengembalikan nama program
      const namaPrograms = programKerja.map(
        (program) =>
          `(${program.kodeProgram}-${program.tahun}) ${program.namaProgram}`
      );

      // Mengatur state dataKomisi dengan nilai yang baru
      setDataKomisi(namaPrograms);

      // Karena setState adalah asinkron, Anda mungkin ingin melakukan log di sini.
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

  const filteredRoles = Object.values(ROLE_SELECT).filter(
    (role) => role !== "admin"
  );

  return (
    <AllAdministrasiContext.Provider
      value={{
        debitData,
        dataTable,
        setDataTable,
        filterKomisi,
        setFilterKomisi,
      }}
    >
      <Wrapper>
        <Form method="post" className="form">
          <h4 className="form-title">Penerimaan</h4>
          <input type="hidden" name="tipeAdministrasi" value={"debit"} />
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
              list={["--pilih program--", ...dataKomisi]}
              disable={dataKomisi.length > 0 ? false : true}
              required={true}
            />
            <FormRow name="uraianAdministrasi" labelText="uraian" />
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
      <AdministrasiDataTable columns={columns} data={dataTable} />
    </AllAdministrasiContext.Provider>
  );
};

export const useAllAdministrasiContext = () =>
  useContext(AllAdministrasiContext);
export default Administrasi;
