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
import { useAllMultimediaContext } from "@/pages/Multimedia";

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
          placeholder={
            komisi === "admin" ||
            komisi === "majelis" ||
            komisi === "staff keuangan"
              ? "Pilih Komisi"
              : komisi
          }
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>
            {komisi === "admin" ||
            komisi === "majelis" ||
            komisi === "staff keuangan"
              ? "Pilih Komisi"
              : komisi}
          </SelectLabel>
          {komisi === "admin" ||
          komisi === "majelis" ||
          komisi === "staff keuangan"
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
      <SelectTrigger className="w-[200px] text-black mr-2">
        <SelectValue placeholder={"Pilih"} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{"Pilih Komisi"}</SelectLabel>

          {komisi === "admin" ||
          komisi === "majelis" ||
          komisi === "staff keuangan" ? (
            items.map((item: any) => {
              return (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              );
            })
          ) : (
            <SelectItem key={komisi} value={komisi}>
              {komisi}
            </SelectItem>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export function SelectStatus() {
  const { setTipeStatus } = useAllProgramKerjaContext();
  const items = Object.values(PROGRAM_KERJA);
  return (
    <Select
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
  if (
    user.role === "admin" ||
    user.role === "majelis" ||
    user.role === "staff keuangan"
  ) {
    items = [
      "All",
      ...Object.values(ROLE_SELECT).filter((role) => role !== "admin"),
    ];
  } else {
    items = [user.role];
  }

  return (
    <Select
      onValueChange={(val) => {
        setFilterKomisi(val);
      }}
    >
      <SelectTrigger className="text-black mr-2 xl:min-w-[600px] sm:w-auto">
        <SelectValue placeholder="Pilih Komisi atau Urusan" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Pilih Komisi atau Urusan</SelectLabel>
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
  const { setFilterRole, userStatus, setDataTable } = useAllUserContext();

  const refreshTable = async (role: string) => {
    const { data } = await customFetch.post("/user", {
      role,
      status: userStatus,
    });
    const { user } = data;

    setDataTable(user);
  };

  const items = ["All", "no role", ...Object.values(ROLE)];
  return (
    <Select
      onValueChange={async (val) => {
        setFilterRole(val);
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

export function SelectUserStatus() {
  const { setUserStatus, filterRole, setDataTable } = useAllUserContext();

  const refreshTable = async (status: string) => {
    const { data } = await customFetch.post("/user", {
      role: filterRole,
      status,
    });
    const { user } = data;

    setDataTable(user);
  };

  const items = ["All", "Active", "Inactive"];
  return (
    <Select
      onValueChange={async (val) => {
        setUserStatus(val);
        refreshTable(val);
      }}
    >
      <SelectTrigger className="w-[180px] text-black ml-4">
        <SelectValue placeholder={"Pilih Status"} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{"Pilih Status"}</SelectLabel>
          {items.map((item: any) => {
            return (
              <SelectItem className="status" key={item} value={item}>
                {item}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export function SelectMultimedia({ komisi }: any) {
  const { pilihKomisi, setPilihKomisi, setDataTable } =
    useAllMultimediaContext();

  const loader = async (val: string) => {
    try {
      const { data } = await customFetch.post("/multimedia/get", {
        penaggungjawabMultimedia: val,
      });
      const { multimedia } = data;
      setDataTable(multimedia);
      return { multimedia };
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
        setPilihKomisi(val);
        loader(val);
      }}
    >
      <SelectTrigger className="w-[200px] text-black mr-2">
        <SelectValue placeholder={pilihKomisi} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{"Pilih Komisi"}</SelectLabel>

          {komisi === "admin" ||
          komisi === "majelis" ||
          komisi === "staff kantor" ? (
            items.map((item: any) => {
              return (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              );
            })
          ) : (
            <SelectItem key={komisi} value={komisi}>
              {komisi}
            </SelectItem>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
