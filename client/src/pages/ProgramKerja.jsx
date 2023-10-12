/* eslint-disable react-refresh/only-export-components */
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useContext, createContext, useState, useEffect } from "react";

import { columns } from "../app/programKerja/column";
import ProgramKerjaDataTable from "@/app/programKerja/data-table";

const AllProgramKerjaContext = createContext();

const ProgramKerja = () => {
  const { user } = useOutletContext();
  const [dataTable, setDataTable] = useState([]);
  const [tableRole, setTableRole] = useState(user.role);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await customFetch.post("/proker", {
          komisi: tableRole,
        });
        const { programKerja } = await data;
        setDataTable(programKerja);
      } catch (error) {
        toast.error(error?.response?.data?.msg);
      }
    };

    fetchData();
  }, [tableRole, user.role]);

  return (
    <AllProgramKerjaContext.Provider
      value={{ dataTable, setDataTable, tableRole, setTableRole }}
    >
      <ProgramKerjaDataTable columns={columns} data={dataTable} />
    </AllProgramKerjaContext.Provider>
  );
};

export const useAllProgramKerjaContext = () =>
  useContext(AllProgramKerjaContext);
export default ProgramKerja;
