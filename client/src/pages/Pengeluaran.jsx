/* eslint-disable react-refresh/only-export-components */
import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useContext, createContext, useState } from "react";
import { ROLE } from "../../../utils/constants";

import { columns } from "../app/pengeluaran/column";
import PengeluaranDataTable from "@/app/pengeluaran/data-table";

const AllPengeluaranContext = createContext();

const Pengeluaran = () => {
  const { kreditData } = useLoaderData();
  const { administrasi } = kreditData;

  const [dataTable, setDataTable] = useState(administrasi);
  const [dataKomisi, setDataKomisi] = useState([]);
  const [filterKomisi, setFilterKomisi] = useState("All");
  const [sisaAnggaran, setSisaAnggaran] = useState(0);

  const formattedMoney = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(sisaAnggaran);

  const ambilNamaProgram = async () => {
    try {
      const { data } = await customFetch.post("/proker/nama", {
        komisi: document.getElementById("penerimaAdministrasi").value,
      });
      const { programKerja } = await data;

      const namaPrograms = programKerja.map(
        (program) => `(${program.noProker}) ${program.namaProgram}`
      );

      setDataKomisi(namaPrograms);
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };

  const checkSisaAnggaran = async () => {
    try {
      const { data } = await customFetch.post("/proker/anggaran", {
        namaProgram: document.getElementById("namaProgram").value,
      });
      const { sisa } = data;
      setSisaAnggaran(sisa);
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

  return (
    <AllPengeluaranContext.Provider
      value={{
        kreditData,
        dataTable,
        setDataTable,
        filterKomisi,
        setFilterKomisi,
      }}
    >
      <Wrapper>
        <Form method="post" className="form">
          <div className="flex justify-between items-center mb-5">
            <h4>Pengeluaran</h4>
            <p className="text-right">Sisa Anggaran: {formattedMoney}</p>
          </div>

          <input type="hidden" name="tipeAdministrasi" value={"kredit"} />
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
              onChange={() => {
                ambilNamaProgram();
              }}
            />
            <FormRowSelect
              labelText="Nama Program Kerja"
              name="namaProgram"
              list={["--pilih program--", ...dataKomisi]}
              disable={dataKomisi.length > 0 ? false : true}
              required={true}
              onChange={() => checkSisaAnggaran()}
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
