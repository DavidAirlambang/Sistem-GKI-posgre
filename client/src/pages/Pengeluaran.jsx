/* eslint-disable react-refresh/only-export-components */
import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form, useLoaderData, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useContext, createContext, useState, useEffect } from "react";
import { ROLE_SELECT } from "../../../utils/constants";

import { columns } from "../app/pengeluaran/column";
import PengeluaranDataTable from "@/app/pengeluaran/data-table";

const AllPengeluaranContext = createContext();

const Pengeluaran = () => {
  const { kreditData } = useLoaderData();
  const { user } = useOutletContext();

  const [dataTable, setDataTable] = useState([]);
  const [dataKomisi, setDataKomisi] = useState([]);
  const [filterKomisi, setFilterKomisi] = useState("All");
  const [sisaAnggaran, setSisaAnggaran] = useState(0);
  const [laporanProker, setLaporanProker] = useState("-");
  const [disable, setDisable] = useState(true);

  const ambilNamaProgram = async () => {
    try {
      const { data } = await customFetch.post("/proker/nama", {
        komisi: document.getElementById("penerimaAdministrasi").value,
      });
      const { programKerja } = await data;

      const namaPrograms = programKerja.map(
        (program) =>
          `(${program.kodeProgram}-${program.tahun}) ${program.namaProgram}`
      );

      setDataKomisi(namaPrograms);
      document.getElementById("laporanProker").value = "-";
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };

  const checkSisaAnggaran = async () => {
    try {
      const { data } = await customFetch.post("/proker/anggaran", {
        namaProgram: document.getElementById("namaProgram").value,
      });
      const { sisa, laporan } = data;
      setLaporanProker(laporan);
      if (document.getElementById("nominalAdministrasi").value <= sisa) {
        setDisable(false);
      }
      setSisaAnggaran(sisa);
      document.getElementById("sisa").value = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(sisa);
      document.getElementById("laporanProker").value = laporan;
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
    document.getElementById("laporanProker").reset();
  };

  const filteredRoles = Object.values(ROLE_SELECT).filter(
    (role) => role !== "admin"
  );

  useEffect(() => {
    const nominalInput = document.getElementById("nominalAdministrasi");

    const handleNominalChange = () => {
      let nominalValue = Math.abs(parseFloat(nominalInput.value));

      if (isNaN(nominalValue) || nominalValue < 0) {
        nominalInput.value = ""; // Clear the input if a negative value is entered
        nominalValue = 0;
      }

      const isDisabled = nominalValue <= sisaAnggaran ? false : true;
      setDisable(isDisabled);
    };

    nominalInput.addEventListener("input", handleNominalChange);

    return () => {
      nominalInput.removeEventListener("input", handleNominalChange);
    };
  }, [sisaAnggaran]);

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
          <div className="flex justify-between items-center form-title">
            <h4>Pengeluaran</h4>
          </div>

          <input type="hidden" name="tipeAdministrasi" value={"kredit"} />
          <div className="form-center">
            <FormRow
              type={"date"}
              labelText="Tanggal"
              name="tanggalAdministrasi"
            />
            <FormRow
              type={"number"}
              labelText="nominal"
              name="nominalAdministrasi"
              defaultValue={0}
            />
            <FormRowSelect
              labelText="penerima"
              name="penerimaAdministrasi"
              list={
                user.role === "admin" ||
                user.role === "majelis" ||
                user.role === "staff keuangan"
                  ? ["--pilih komisi--", ...filteredRoles]
                  : ["--pilih komisi--", user.role]
              }
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

            <FormRow labelText="Sisa Anggaran" name="sisa" readOnly />

            <FormRow
              type={"textarea"}
              name="laporanProker"
              labelText="Laporan Program Kerja"
              defaultValue={laporanProker}
            />
            <div></div>
            <div></div>
            <SubmitBtn formBtn disabled={disable} />
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
