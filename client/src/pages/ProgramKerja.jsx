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
  const [totalAnggaran, setTotalAnggaran] = useState(0);
  const [tipeStatus, setTipeStatus] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await customFetch.post("/proker", {
          komisi: tableRole,
          status: tipeStatus,
        });
        const { programKerja, totalAnggaranSemua } = await data;
        const { _sum } = totalAnggaranSemua;
        const { totalAnggaran } = _sum;
        setDataTable(programKerja);
        setTotalAnggaran(totalAnggaran);
      } catch (error) {
        toast.error(error?.response?.data?.msg);
      }
    };

    fetchData();
  }, [tableRole, tipeStatus, totalAnggaran, user.role]);

  return (
    <AllProgramKerjaContext.Provider
      value={{
        dataTable,
        setDataTable,
        tableRole,
        setTableRole,
        totalAnggaran,
        setTotalAnggaran,
        tipeStatus,
        setTipeStatus,
      }}
    >
      <ProgramKerjaDataTable columns={columns} data={dataTable} />
    </AllProgramKerjaContext.Provider>
  );
};

export const useAllProgramKerjaContext = () =>
  useContext(AllProgramKerjaContext);
export default ProgramKerja;
