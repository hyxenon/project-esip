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
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  title: string;
  category: string;
  date: Date;
  authors: string;
};

const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "title",
    header: "Research Title",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const data = row.original;
      const formattedDate = data.date.toLocaleDateString("en-US", options);

      return formattedDate;
    },
  },
  {
    accessorKey: "authors",
    header: "Authors",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <HoverCard>
          <HoverCardTrigger>
            <p className="text-center cursor-pointer">etc</p>
          </HoverCardTrigger>
          <HoverCardContent className="flex flex-col gap-y-2">
            <div className="flex gap-4 items-center">
              <Image
                alt="profile pic"
                src={"https://github.com/shadcn.png"}
                width={30}
                height={30}
                className="rounded-full"
              />
              <p>Justine Edward Santos</p>
            </div>
            <div className="flex gap-4 items-center">
              <Image
                alt="profile pic"
                src={"https://github.com/shadcn.png"}
                width={30}
                height={30}
                className="rounded-full"
              />
              <p>Justine Edward Santos Jose</p>
            </div>
          </HoverCardContent>
        </HoverCard>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>View Paper</DropdownMenuItem>
              <DropdownMenuItem>Remove Active</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];
