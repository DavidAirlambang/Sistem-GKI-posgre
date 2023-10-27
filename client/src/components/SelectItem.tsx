import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PROGRAM_KERJA, ROLE } from "../../../utils/constants";
import { useAllProgramKerjaContext } from "@/pages/ProgramKerja";
import { useAllAdministrasiContext } from "@/pages/Administrasi";
import customFetch from "@/utils/customFetch";
import { toast } from "react-toastify";
import { useAllPengeluaranContext } from "@/pages/Pengeluaran";

export function SelectItems({ komisi }: any) {
  const { setTableRole } = useAllProgramKerjaContext();
  const items = Object.values(ROLE).filter((role) => role !== "admin");
  return (
    <Select
      onValueChange={(val) => {
        setTableRole(val);
      }}
    >
      <SelectTrigger className="w-[180px] text-black mr-2">
        <SelectValue
          placeholder={komisi === "admin" ? "Pilih Komisi" : komisi}
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>
            {komisi === "admin" ? "Pilih Komisi" : komisi}
          </SelectLabel>
          {komisi === "admin"
            ? items.map((item: any) => {
                return (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                );
              })
            : null}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
export function SelectItemsAdministrasi({ komisi }: any) {
  const { setDataTable, setFilterKomisi } =
    useAllAdministrasiContext() || useAllPengeluaranContext();

  const loader = async (penerima: string) => {
    try {
      const { data } = await customFetch.post("/administrasi", {
        penerima: penerima,
      });
      const { administrasi } = data;
      setDataTable(administrasi);
      return { administrasi };
    } catch (error: any) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

  const items = [
    "All",
    ...Object.values(ROLE).filter((role) => role !== "admin"),
  ];

  return (
    <Select
      onValueChange={(val) => {
        setFilterKomisi(val);
        loader(val);
      }}
    >
      <SelectTrigger className="w-[180px] text-black mr-2">
        <SelectValue placeholder={komisi === "admin" ? "All" : komisi} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>
            {komisi === "admin" ? "Pilih Komisi" : komisi}
          </SelectLabel>

          {komisi === "admin"
            ? items.map((item: any) => {
                return (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                );
              })
            : null}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export function SelectStatus() {
  const { dataTable, setTipeStatus } = useAllProgramKerjaContext();
  const items = Object.values(PROGRAM_KERJA);
  return (
    <Select
      disabled={dataTable.length != 0 ? false : true}
      onValueChange={(val) => {
        setTipeStatus(val);
      }}
    >
      <SelectTrigger className="w-[180px] text-black mr-2">
        <SelectValue placeholder={"Filter Status"} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{"Filter Status"}</SelectLabel>
          {items.map((item: any) => {
            return (
              <SelectItem className="tipe" key={item} value={item}>
                {item}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
