/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useContext, createContext, useState } from "react";
import UserDataTable from "@/app/user/data-table";
import { columns } from "@/app/user/columns";

export const loader = async () => {
  try {
    const { data } = await customFetch.post("/user");
    return { data };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AllUserContext = createContext();

const User = () => {
  const { data } = useLoaderData();
  const { user } = data;

  const [dataTable, setDataTable] = useState(user);
  const [filterRole, setFilterRole] = useState();
  const [userStatus, setUserStatus] = useState();
  return (
    <AllUserContext.Provider
      value={{
        dataTable,
        setDataTable,
        filterRole,
        setFilterRole,
        userStatus,
        setUserStatus,
      }}
    >
      <h4>User Management</h4>
      <UserDataTable columns={columns} data={dataTable} />
    </AllUserContext.Provider>
  );
};

export const useAllUserContext = () => useContext(AllUserContext);
export default User;
