import Wrapper from "../assets/wrappers/JobsContainer";

import { useContext, createContext } from "react";
import { useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import Ruangan from "../components/Ruangan";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/ruangs");
    return { data };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AllRuangsContext = createContext();
const Ruang = () => {
  const { data } = useLoaderData();
  const { ruangans } = data;
  if (ruangans.length === 0) {
    return (
      <Wrapper>
        <h2>Belum ada ruangan</h2>
      </Wrapper>
    );
  }
  return (
    <AllRuangsContext.Provider value={{ data }}>
      <Wrapper>
        <div className="jobs">
          {ruangans?.map((ruangan) => {
            return <Ruangan key={ruangan.noRuangan} {...ruangan} />;
          })}
        </div>
      </Wrapper>
    </AllRuangsContext.Provider>
  );
};

export const useAllRuangsContext = () => useContext(AllRuangsContext);

export default Ruang;
