/* eslint-disable no-unused-vars */
import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useLoaderData } from "react-router-dom";
import { GUDANG, MULTIMEDIA } from "../../../utils/constants";
import { Form } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useContext, createContext, useState } from "react";

import { columns } from "../app/gudang/columns";

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
  const reset = () => {
    document.getElementById("namaMultimedia").reset();
    document.getElementById("jumlahMultimedia").reset();
    document.getElementById("deskripsiMultimedia").reset();
    document.getElementById("peminjamMultimedia").reset();
    document.getElementById("lokasiMultimedia").reset();
  };

  return (
    <AllMultimediaContext.Provider>
      <Wrapper>
        <Form method="post" className="form">
          <h4 className="form-title">Multimedia</h4>
          <div className="form-center">
            <FormRow labelText="nama Multimedia" name="namaMultimedia" />
            <FormRow labelText="jenis Multimedia" name="jenisMultimedia" />
            <FormRow labelText="jumlah Multimedia" name="jumlahMultimedia" />
            <FormRowSelect
              labelText="lokasi"
              name="lokasiMultimedia"
              list={Object.values(MULTIMEDIA)}
            />
            <FormRow
              type="text"
              name="deskripsiMultimedia"
              labelText="deskripsi"
              placeholder='isikan "-" jika tidak ada deskripsi'
            />
            <FormRow
              labelText="peminjam Multimedia"
              name="peminjamMultimedia"
              placeholder='isikan "-" jika tidak ada yang pinjam'
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
    </AllMultimediaContext.Provider>
  );
};
export default Multimedia;
