"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./column";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const data = [
  {
    id: "728ed52f",
    title:
      "Effect of exposure to different colors light emitting diode on the yield and physical properties of grey and white oyster mushrooms",
    category: "Life Science",
    date: new Date("2024-07-30T14:05:00.156Z"),
    authors: "John Doe, Jane Smith",
  },
  {
    id: "82bf3a1d",
    title:
      "Investigating the impact of urban noise pollution on the behavior of songbirds",
    category: "Environmental Science",
    date: new Date("2023-05-21T10:30:00.000Z"),
    authors: "Alice Johnson, Bob Brown",
  },
  {
    id: "94cf6b2e",
    title:
      "Development of biodegradable plastic alternatives using corn starch and plant fibers",
    category: "Materials Science",
    date: new Date("2022-11-15T09:00:00.000Z"),
    authors: "Carol White, David Green",
  },
  {
    id: "13ed7c8a",
    title:
      "A study on the effects of mindfulness meditation on high school students' stress levels",
    category: "Psychology",
    date: new Date("2021-02-28T08:45:00.000Z"),
    authors: "Eve Black, Frank Blue",
  },
  {
    id: "46af2b5d",
    title: "Exploring the potential of solar energy in rural electrification",
    category: "Energy",
    date: new Date("2023-09-10T14:20:00.000Z"),
    authors: "Grace Yellow, Henry Red",
  },
  {
    id: "57bc3d7f",
    title:
      "Analyzing the genetic diversity of wild honeybee populations in Southeast Asia",
    category: "Genetics",
    date: new Date("2020-12-01T11:15:00.000Z"),
    authors: "Ivy Green, Jack White",
  },
  {
    id: "68cd4e9a",
    title: "The role of gut microbiota in human health and disease",
    category: "Medical Science",
    date: new Date("2024-04-25T13:00:00.000Z"),
    authors: "Kathy Black, Leo Brown",
  },
  {
    id: "79de5fbc",
    title:
      "Advancements in quantum computing and their applications in cryptography",
    category: "Computer Science",
    date: new Date("2022-08-17T16:30:00.000Z"),
    authors: "Molly Orange, Nick Purple",
  },
  {
    id: "80ef6acd",
    title:
      "Evaluating the effectiveness of different teaching methods in elementary schools",
    category: "Education",
    date: new Date("2023-01-05T09:45:00.000Z"),
    authors: "Olivia Pink, Peter Blue",
  },
  {
    id: "91fg7bde",
    title:
      "The influence of social media on teenage mental health and self-esteem",
    category: "Sociology",
    date: new Date("2021-06-19T12:00:00.000Z"),
    authors: "Quincy Red, Rachel Green",
  },
];

type CurrentPaperTableProps = {
  cardTitle: string;
};

const CurrentPaperTable = ({ cardTitle }: CurrentPaperTableProps) => {
  return (
    <Card className="w-full max-h-[500px] overflow-y-scroll">
      <CardHeader>
        <CardTitle>{cardTitle}</CardTitle>
        <CardDescription>10 papers total</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={data} />
      </CardContent>
    </Card>
  );
};

export default CurrentPaperTable;
