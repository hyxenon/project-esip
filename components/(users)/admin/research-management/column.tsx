"use client";
import { CiLock } from "react-icons/ci";
import { LuBookOpen } from "react-icons/lu";
import { LuBookOpenCheck } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ResearchPaperModel } from "@/models/models";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { useState } from "react";

import DeletePaperBtn from "../../teacher/paper-management/DeletePaperBtn";
import Image from "next/image";
import Link from "next/link";

const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

// Props type for the ResearchPaperActions component
type ResearchPaperActionsProps = {
  data: ResearchPaperModel;
};

const ResearchPaperActions: React.FC<ResearchPaperActionsProps> = ({
  data,
}) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <>
      <DeletePaperBtn
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        name={data.title}
        id={data.id!}
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
          <Link href={`/search/${data.id}`} target="_blank">
            <DropdownMenuItem>View Details</DropdownMenuItem>
          </Link>

          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-red-500"
            onClick={() => setIsDeleteOpen(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export const columns: ColumnDef<ResearchPaperModel>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.original;
      const truncateParagraph = (text: string, maxWords = 10) => {
        const words = text.split(" ");

        if (words.length <= maxWords) {
          return text;
        }

        return words.slice(0, maxWords).join(" ") + "...";
      };

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <p className="cursor-pointer">{truncateParagraph(data.title)}</p>
            </TooltipTrigger>
            <TooltipContent className="bg-[#283618]">
              <p>{data.title}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },

  {
    accessorKey: "user",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          School
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.original;
      const schoolImage = data?.user?.school?.image || ""; // Access the school image
      const schoolName = data?.user?.school?.schoolName || "Unknown School"; // Fallback if no school name

      return (
        <div className="flex items-center gap-2">
          {schoolImage ? (
            <Image
              src={schoolImage}
              alt={`${schoolName} logo`}
              className="rounded-full"
              height={25}
              width={25}
            />
          ) : (
            <span className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              {schoolName[0]}{" "}
            </span>
          )}
          <p>{schoolName}</p>
        </div>
      );
    },
  },

  {
    accessorKey: "researchType",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.original;

      return (
        <div className="flex items-center gap-1">
          {data.researchType === "proposal" ? (
            <LuBookOpen className="text-[#BC6C25]" />
          ) : (
            <LuBookOpenCheck className="text-[#283618]" />
          )}
          <p
            className={`capitalize ${
              data.researchType === "proposal"
                ? "text-[#BC6C25]"
                : "text-[#283618]"
            }`}
          >
            {data.researchType}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "researchCategory",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    cell: ({ row }) => {
      const data = row.original;

      return <p className="capitalize">{data.researchCategory}</p>;
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.original;
      const formattedDate = data.date.toLocaleDateString("en-US", options);

      return <p className="text-sm">{formattedDate}</p>;
    },
  },

  {
    accessorKey: "isPublic",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Visibility
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    cell: ({ row }) => {
      const data = row.original;

      return (
        <div
          className={`capitalize text-sm flex items-center gap-1  ${
            data.isPublic ? "" : "text-red-600"
          }`}
        >
          {!data.isPublic && <CiLock className="font-bold text-red-600" />}
          {data.isPublic ? "public" : "private"}
        </div>
      );
    },
  },

  {
    accessorKey: "uniqueViews",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Views
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.original;
      return <p>{data.uniqueViews}</p>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <ResearchPaperActions data={row.original} />,
  },
];
