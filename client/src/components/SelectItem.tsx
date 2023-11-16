import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PROGRAM_KERJA, ROLE, ROLE_SELECT } from "../../../utils/constants";
import { useAllProgramKerjaContext } from "@/pages/ProgramKerja";
import { useAllAdministrasiContext } from "@/pages/Administrasi";
import customFetch from "@/utils/customFetch";
import { toast } from "react-toastify";
import { useAllPengeluaranContext } from "@/pages/Pengeluaran";
import { useAllLaporanContext } from "@/pages/Laporan";
import { useAllUserContext } from "@/pages/User";
import { useOutletContext } from "react-router-dom";
import { User } from "@/app/tabletype";

export function SelectItems({ komisi }: any) {
  const { setTableRole } = useAllProgramKerjaContext();
  const items = Object.values(ROLE_SELECT).filter((role) => role !== "admin");
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
export function SelectItemsAdministrasi({ komisi, tipe }: any) {
  const { setDataTable, setFilterKomisi } =
    tipe === "debit" ? useAllAdministrasiContext() : useAllPengeluaranContext();

  const loader = async (penerima: string) => {
    try {
      const { data } = await customFetch.post("/administrasi", {
        tipeAdministrasi: tipe,
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
    ...Object.values(ROLE_SELECT).filter((role) => role !== "admin"),
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

export function SelectLaporan() {
  const { user } = useOutletContext() as { user: User };
  const { setFilterKomisi } = useAllLaporanContext();
  let items;
  user.role === "admin" || user.role === "majelis"
    ? (items = [
        "All",
        ...Object.values(ROLE_SELECT).filter((role) => role !== "admin"),
      ])
    : (items = [user.role]);
  return (
    <Select
      onValueChange={(val) => {
        setFilterKomisi(val);
      }}
    >
      <SelectTrigger className="w-[500px] text-black mr-2">
        <SelectValue placeholder={"Pilih Komisi atau Urusan"} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{"Pilih Komisi atau Urusan"}</SelectLabel>
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

export function SelectUserRole() {
  const { setFilterRole, filterRole, setDataTable } = useAllUserContext();

  const refreshTable = async (role: string) => {
    const { data } = await customFetch.post("/auth/user", { role });
    const { user } = data;

    setDataTable(user);
  };

  const items = ["All", ...Object.values(ROLE)];
  return (
    <Select
      onValueChange={async (val) => {
        refreshTable(val);
      }}
    >
      <SelectTrigger className="w-[180px] text-black ml-4">
        <SelectValue placeholder={"Pilih Role"} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{"Pilih Role"}</SelectLabel>
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
