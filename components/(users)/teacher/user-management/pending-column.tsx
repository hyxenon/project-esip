"use client";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import DeletePendingUser from "./delete-pending-user";
import AcceptPendingUser from "./accept-pending-user";
import { Badge } from "@/components/ui/badge";
import { PendingUserModel } from "@/models/models";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaUserCheck } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

type PendingUserActionsProps = {
  user: PendingUserModel;
};

const PendingUserActions: React.FC<PendingUserActionsProps> = ({ user }) => {
  const [isAcceptOpen, setIsAcceptOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <>
      <DeletePendingUser
        id={user.id}
        isOpen={isDeleteOpen}
        name={user.name}
        setIsOpen={setIsDeleteOpen}
      />
      <AcceptPendingUser
        id={user.id}
        isOpen={isAcceptOpen}
        setIsOpen={setIsAcceptOpen}
        name={user.name}
      />
      <div className="flex items-center justify-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={"ghost"}
                className="p-2"
                onClick={() => setIsAcceptOpen(true)}
              >
                <FaUserCheck className="text-[#606C38] w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Accept User</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={"ghost"}
                className="p-2"
                onClick={() => setIsDeleteOpen(true)}
              >
                <MdDeleteForever className="w-4 h-4 text-red-500" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Remove User Request</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </>
  );
};

export const pendingColumn: ColumnDef<PendingUserModel>[] = [
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
            src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`}
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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Role
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
    cell: ({ row }) => <PendingUserActions user={row.original} />,
  },
];
