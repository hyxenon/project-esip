"use client";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";
import { SchoolModel } from "../../../school-management/SchoolForm";
import { useState } from "react";
import DeleteUserButton from "../DeleteUserButton";
import EditUserButton from "../EditUserButton";
import { Badge } from "@/components/ui/badge";
import ViewUserDetails from "@/components/(users)/ViewUserDetails";
import { FaRegEye } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  const [isViewOpen, setIsViewOpen] = useState(false);

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
      <ViewUserDetails
        isOpen={isViewOpen}
        setIsOpen={setIsViewOpen}
        user={user}
      />
      <div className="flex items-center justify-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="p-2"
                variant={"ghost"}
                onClick={() => setIsViewOpen(true)}
              >
                <FaRegEye className="text-[#283618] w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View User</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="p-2"
                variant={"ghost"}
                onClick={() => setIsEditOpen(true)}
              >
                <FaRegEdit className="text-[#BC6C25] w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit User</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="p-2"
                variant={"ghost"}
                onClick={() => setIsDeleteOpen(true)}
              >
                <MdDeleteForever className="w-4 h-4 text-red-500" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete User</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
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
            src={
              user.image
                ? user.image
                : `https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`
            }
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
    header: ({ column }) => {
      return <p className="text-center">Actions</p>;
    },
    cell: ({ row }) => <UserActions user={row.original} />,
  },
];
