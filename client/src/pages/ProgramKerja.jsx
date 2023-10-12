/* eslint-disable react-refresh/only-export-components */
import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useLoaderData, useOutletContext } from "react-router-dom";
import { Form } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useContext, createContext, useState } from "react";
import { PROGRAM_KERJA } from "../../../utils/constants";

import { columns } from "../app/programKerja/column";
import ProgramKerjaDataTable from "@/app/programKerja/data-table";

export const loader = async () => {
  try {
    const { data } = await customFetch.post("/proker");
    return { data };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AllProgramKerjaContext = createContext();

const ProgramKerja = () => {
  const { data } = useLoaderData();
  const { programKerja } = data;

  const [dataTable, setDataTable] = useState(programKerja);

  return (
    <AllProgramKerjaContext.Provider value={{ data, dataTable, setDataTable }}>
      <ProgramKerjaDataTable columns={columns} data={dataTable} />
    </AllProgramKerjaContext.Provider>
  );
};

export const useAllProgramKerjaContext = () =>
  useContext(AllProgramKerjaContext);
export default ProgramKerja;
