import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Administrasi, Pengeluaran } from ".";
import { useOutletContext } from "react-router-dom";

export default function AllAdministrasi() {
  const { user } = useOutletContext();
  return (
    <Tabs
      defaultValue={user.role === "admin" ? "penerimaan" : "pengeluaran"}
      className="w-[400px]"
    >
      <TabsList>
        {user.role === "admin" ? (
          <TabsTrigger value="penerimaan">Penerimaan</TabsTrigger>
        ) : (
          ""
        )}
        <TabsTrigger value="pengeluaran">Pengeluaran</TabsTrigger>
      </TabsList>
      <TabsContent value="penerimaan">
        <Administrasi />
      </TabsContent>
      <TabsContent value="pengeluaran">
        <Pengeluaran />
      </TabsContent>
    </Tabs>
  );
}
