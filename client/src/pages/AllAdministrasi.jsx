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
import { Administrasi } from ".";
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
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, ll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
