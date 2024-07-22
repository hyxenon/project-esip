"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { EditSchoolButton } from "./editSchoolButton";
import DeleteSchoolButton from "./deleteSchoolButton";
import StatusChange from "./statusChange";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type School = {
  email: string;
  schoolName: string;
  streetAddress: string;
  city: string;
  province: string;
  postalCode: string;
  image: string | null;
  contactNumber: string;
  updatedAt: Date;
  createdAt: Date;
  id: string;
  status: string;
};

export const columns: ColumnDef<School>[] = [
  {
    accessorKey: "schoolName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const school = row.original;

      return (
        <div className="flex items-center gap-2">
          <Image
            src={
              school.image === null
                ? "https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1721383200&semt=sph"
                : school.image
            }
            alt="logo"
            width={40}
            height={40}
            className="w-7 h-7 rounded-full"
          />
          <p>{school.schoolName}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const school = row.original;
      const [isEditOpen, setIsEditOpen] = useState(false);
      const [isDeleteOpen, setIsDeleteOpen] = useState(false);
      const [isStatusChangeOpen, setStatusChangeOpen] = useState(false);

      return (
        <>
          <EditSchoolButton
            isOpen={isEditOpen}
            setIsOpen={setIsEditOpen}
            schoolId={school.id}
          />
          <DeleteSchoolButton
            isOpen={isDeleteOpen}
            setIsOpen={setIsDeleteOpen}
            schoolId={school.id}
            schoolName={school.schoolName}
          />
          <StatusChange
            isOpen={isStatusChangeOpen}
            setIsOpen={setStatusChangeOpen}
            schoolId={school.id}
            schoolName={school.schoolName}
            status={school.status}
          />
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>View School Details</DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setIsEditOpen(true);
                }}
              >
                Edit School
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setStatusChangeOpen(true)}
                className={
                  school.status === "Active" ? "text-red-500" : "text-green-500"
                }
              >
                {school.status === "Active" ? "Unsubscribe" : "Subscribe"}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setIsDeleteOpen(true)}
                className="text-red-500"
              >
                Delete School
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];
