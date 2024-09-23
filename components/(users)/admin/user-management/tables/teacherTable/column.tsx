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
import { SchoolModel } from "../../../school-management/SchoolForm";
import { useState } from "react";
import DeleteUserButton from "../DeleteUserButton";
import EditUserButton from "../EditUserButton";
import { Badge } from "@/components/ui/badge";

export type User = {
  id: string;
  name: string | null;
  email: string;
  role: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
  schoolId: string | null;
  school?: SchoolModel | null;
};

// Props type for the UserActions component
type UserActionsProps = {
  user: User;
};

const UserActions: React.FC<UserActionsProps> = ({ user }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <>
      <DeleteUserButton
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        name={user.name}
        id={user.id}
      />
      <EditUserButton
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        id={user.id}
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
          <DropdownMenuItem>View User</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsEditOpen(true)}>
            Edit User
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-red-500"
            onClick={() => setIsDeleteOpen(true)}
          >
            Delete User
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
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
      const user = row.original;

      return (
        <div className="flex items-center gap-2">
          <Image
            src={user.image ? user.image : "https://github.com/shadcn.png"}
            alt="logo"
            width={40}
            height={40}
            className="w-7 h-7 rounded-full"
          />
          <p>{user.name}</p>
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
    accessorKey: "school",
    header: "School",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center gap-2 mr-6 md:mr-0">
          <Image
            src={
              user.school
                ? user.school.image ||
                  "https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1721383200&semt=sph"
                : "https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1721383200&semt=sph"
            }
            alt="logo"
            width={30}
            height={30}
            className="w-7 h-7 rounded-full"
          />
          <p className="text-sm">
            {user.school ? user.school.schoolName : "No School Name"}
          </p>
        </div>
      );
    },
  },

  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <Badge
          variant={"outline"}
          className="bg-[#606C38] text-white tracking-wider"
        >
          {user.role}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <UserActions user={row.original} />,
  },
];
