"use client";

import { toast } from "react-toastify";
import customFetch from "../../utils/customFetch";
import { Link, Form, redirect, useOutletContext } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import { User } from "../tabletype";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@radix-ui/react-dropdown-menu";
import { useAllUserContext } from "@/pages/User";

async function changeStatusUser(id: any, active: boolean) {
  try {
    await customFetch.post(`/auth/user/${id}`, { active });
    if (active === true) {
      toast.success("User Activated");
    } else {
      toast.success("User Deactivated");
    }
    return redirect("/dashboard/user");
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.msg) {
      toast.error(error.response.data.msg);
    } else {
      toast.error("An error occurred while change user status.");
    }
    return error;
  }
}

export const columns: ColumnDef<User>[] = [
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Role",
    accessorKey: "role",
  },
  {
    header: "Active",
    accessorKey: "active",
    cell: ({ row }) => {
      const user = row.original;
      return user.active ? "Active" : "Inactive";
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const userItem = row.original;
      const id = userItem.id;
      const { setDataTable, filterRole } = useAllUserContext();
      const { user } = useOutletContext() as { user: User };

      // fetch ulang
      const refreshTable = async () => {
        const { data } = await customFetch.post("/auth/user", {
          role: filterRole,
        });
        const { user } = data;
        setDataTable(user);
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} className="w-8 h-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel className="font-bold pb-3">
              Actions
            </DropdownMenuLabel>
            {/* ganti jdi action yang diinginkan */}
            <DropdownMenuItem
              className="pb-2 pl-2 rounded hover:bg-slate-300 cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(id.toString());
              }}
            >
              {" "}
              <Link to={`../user/${id}`}>edit item</Link>
            </DropdownMenuItem>
            {user.id !== userItem.id ? (
              <DropdownMenuItem
                className="pb-2 pl-2 rounded hover:bg-slate-300 cursor-pointer"
                onClick={async () => {
                  try {
                    await changeStatusUser(id, !userItem.active);
                    refreshTable();
                  } catch (error: any) {
                    if (
                      error.response &&
                      error.response.data &&
                      error.response.data.msg
                    ) {
                      toast.error(error.response.data.msg);
                    } else {
                      toast.error("An error occurred while deleting the item.");
                    }
                    return error;
                  }
                }}
              >
                {userItem.active ? "deactivate user" : "activate user"}
              </DropdownMenuItem>
            ) : null}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
