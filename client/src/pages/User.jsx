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
    const { data } = await customFetch.get("/auth/user");
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
      await customFetch.post("/multimedia", data);
      return toast.success("Item added successfully ");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };
};

const AllUserContext = createContext();

const User = () => {
  const { data } = useLoaderData();
  const { user } = data;
  console.log(user);

  const [dataTable, setDataTable] = useState(user);
  const [filterRole, setFilterRole] = useState();
  return (
    <AllUserContext.Provider
      value={{
        dataTable,
        setDataTable,
        filterRole,
        setFilterRole,
      }}
    >
      <h4>User Management</h4>
      <UserDataTable columns={columns} data={dataTable} />
    </AllUserContext.Provider>
  );
};

export const useAllUserContext = () => useContext(AllUserContext);
export default User;
