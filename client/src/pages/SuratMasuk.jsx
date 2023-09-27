/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useLoaderData } from "react-router-dom";
import { MULTIMEDIA } from "../../../utils/constants";
import { Form } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useContext, createContext, useState } from "react";

import { columns } from "../app/multimedia/columns";
import MultimediaDataTable from "@/app/multimedia/data-table";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/suratMasuk");
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
      await customFetch.post("/suratMasuk", data);
      return toast.success("Surat added successfully ");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };
};

const AllSuratMasukContext = createContext();
const SuratMasuk = () => {
  const { data } = useLoaderData();
  const { suratMasuk } = data;
  console.log(suratMasuk);
  return (
    <AllSuratMasukContext.Provider>
      <h2>Surat Masuk</h2>
    </AllSuratMasukContext.Provider>
  );
};
export default SuratMasuk;
