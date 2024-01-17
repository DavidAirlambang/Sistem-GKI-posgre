"use client";
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useLoaderData, useOutletContext } from "react-router-dom";
import { MULTIMEDIA, ROLE_SELECT } from "../../../utils/constants";
import { Form } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useContext, createContext, useState } from "react";

import { columns } from "../app/multimedia/columns";
import MultimediaDataTable from "@/app/multimedia/data-table";

export const action = () => {
  return async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      await customFetch.post("/multimedia", data);
      return toast.success("Item added successfully ");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };
};

const AllMultimediaContext = createContext();
const Multimedia = () => {
  const { user } = useOutletContext();

  const [dataTable, setDataTable] = useState([]);
  const [pilihKomisi, setPilihKomisi] = useState(user.role);

  const reset = () => {
    document.getElementById("namaMultimedia").reset();
    document.getElementById("jumlahMultimedia").reset();
    document.getElementById("deskripsiMultimedia").reset();
    document.getElementById("peminjamMultimedia").reset();
    document.getElementById("lokasiMultimedia").reset();
    document.getElementById("penaggungjawabMultimedia").reset();
  };

  const filteredRoles = Object.values(ROLE_SELECT).filter(
    (role) => role !== "admin"
  );

  return (
    <AllMultimediaContext.Provider
      value={{ pilihKomisi, setPilihKomisi, dataTable, setDataTable }}
    >
      <Wrapper>
        <Form method="post" className="form">
          <h4 className="form-title">Multimedia dan Kesenian</h4>
          <div className="form-center">
            <FormRow
              labelText="nama Multimedia dan Kesenian"
              name="namaMultimedia"
            />
            <FormRow
              labelText="jenis Multimedia dan Kesenian"
              name="jenisMultimedia"
            />
            <FormRow
              labelText="jumlah Multimedia dan Kesenian"
              name="jumlahMultimedia"
            />
            <FormRow labelText="lokasi" name="lokasiMultimedia" />
            <FormRow
              type="text"
              name="deskripsiMultimedia"
              labelText="deskripsi"
              placeholder='isikan "-" jika tidak ada deskripsi'
            />
            <FormRowSelect
              labelText="Penanggung Jawab Multimedia dan Kesenian"
              name="penaggungjawabMultimedia"
              list={
                user.role === "admin" ||
                user.role === "majelis" ||
                user.role === "staff kantor"
                  ? ["--pilih komisi--", ...filteredRoles]
                  : ["--pilih komisi--", user.role]
              }
            />
            <FormRow
              labelText="peminjam Multimedia dan Kesenian"
              name="peminjamMultimedia"
              placeholder='isikan "-" jika tidak ada yang pinjam'
            />
            <FormRow type="text" name="nilaiAset" labelText="nilai Aset" />
            <div></div>
            <SubmitBtn formBtn onclick={() => reset()} />
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
      <MultimediaDataTable columns={columns} data={dataTable} />
    </AllMultimediaContext.Provider>
  );
};

export const useAllMultimediaContext = () => useContext(AllMultimediaContext);
export default Multimedia;
