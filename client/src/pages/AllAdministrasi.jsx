import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Administrasi, Laporan, Pengeluaran } from ".";
import { useOutletContext } from "react-router-dom";

export default function AllAdministrasi() {
  const { user } = useOutletContext();
  return (
    <Tabs
      defaultValue={user.role === "admin" ? "laporan" : "pengeluaran"}
      className="w-[400px]"
    >
      <TabsList>
        {user.role === "admin" ? (
          <TabsTrigger value="penerimaan">Penerimaan</TabsTrigger>
        ) : (
          ""
        )}
        <TabsTrigger value="pengeluaran">Pengeluaran</TabsTrigger>
        <TabsTrigger value="laporan">Laporan</TabsTrigger>
      </TabsList>
      <TabsContent value="penerimaan">
        <Administrasi />
      </TabsContent>
      <TabsContent value="pengeluaran">
        <Pengeluaran />
      </TabsContent>
      <TabsContent value="laporan">
        <Laporan />
      </TabsContent>
    </Tabs>
  );
}
