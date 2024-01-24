/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useLoaderData, useOutletContext } from "react-router-dom";
import { MULTIMEDIA, ROLE_SELECT } from "../../../utils/constants";
import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import {
  useContext,
  createContext,
  useState,
  useEffect,
  useCallback,
} from "react";

import { columns } from "../app/multimedia/columns";
import MultimediaDataTable from "@/app/multimedia/data-table";

export const action = () => {
  return async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      await customFetch.post("/multimedia", data);
      toast.success("Item added successfully ");
      document.getElementById("multimediaForm").reset();
      document.getElementById("datanya").reset();
      return redirect("/dashboard/multimedia");
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
  const [pilihKomisi, setPilihKomisi] = useState(
    user.role === "admin" ||
      user.role === "staff kantor" ||
      user.role === "majelis"
      ? "All"
      : user.role
  );

  const loader = useCallback(async () => {
    try {
      const { data } = await customFetch.post("/multimedia/get", {
        penaggungjawabMultimedia: pilihKomisi,
      });
      const { multimedia } = data;
      setDataTable(multimedia);
      return { multimedia };
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  }, [pilihKomisi]);

  // Panggil loader saat komponen dimount dan ketika pilihKomisi berubah
  useEffect(() => {
    loader();
  }, [pilihKomisi, loader]);

  const reset = () => {
    document.getElementById("multimediaForm").reset();
  };

  useEffect(() => {
    loader();
  }, [dataTable, loader]);

  const filteredRoles = Object.values(ROLE_SELECT).filter(
    (role) => role !== "admin"
  );

  return (
    <AllMultimediaContext.Provider
      value={{ pilihKomisi, setPilihKomisi, dataTable, setDataTable }}
    >
      <Wrapper>
        <Form id="multimediaForm" method="post" className="form">
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
            <div className="sm:hidden"></div>
            <div></div>
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
      <div id="datanya">
        <MultimediaDataTable columns={columns} data={dataTable} />
      </div>
    </AllMultimediaContext.Provider>
  );
};

export const useAllMultimediaContext = () => useContext(AllMultimediaContext);
export default Multimedia;
