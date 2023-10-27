/* eslint-disable react-refresh/only-export-components */
import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useLoaderData } from "react-router-dom";
import { Form } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useContext, createContext, useState } from "react";
import { ROLE } from "../../../utils/constants";

import { columns } from "../app/pengeluaran/column";
import PengeluaranDataTable from "@/app/pengeluaran/data-table";

export const loader = async () => {
  try {
    const { data } = await customFetch.post("/administrasi", {
      tipeAdministrasi: "kredit",
    });
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
  return <div>Pengeluaran</div>;
};
export default Pengeluaran;
