"use client";

import { DataTable } from "@/components/(users)/teacher/paper-management/data-table";
import { columns } from "@/components/(users)/teacher/paper-management/paper-column";
import TotalPaperCard from "@/components/(users)/teacher/paper-management/TotalPaperCard";

import TotalPapersCard from "@/components/(users)/teacher/paper-management/TotalPapersCard";
import TotalResearchProposal from "@/components/(users)/teacher/paper-management/TotalResearchProposal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PaperItemModel, ResearchPaperModel1 } from "@/models/models";
import Link from "next/link";
import React from "react";

const data: PaperItemModel[] = [
  {
    id: "728ed52f",
    title:
      "Effect of exposure to different colors light emitting diode on the yield and physical properties of grey and white oyster mushrooms",
    category: "Life Science",
    date: new Date("2024-07-30T14:05:00.156Z"),
  },
  {
    id: "82bf3a1d",
    title:
      "Investigating the impact of urban noise pollution on the behavior of songbirds",
    category: "Environmental Science",
    date: new Date("2023-05-21T10:30:00.000Z"),
  },
  {
    id: "94cf6b2e",
    title:
      "Development of biodegradable plastic alternatives using corn starch and plant fibers",
    category: "Materials Science",
    date: new Date("2022-11-15T09:00:00.000Z"),
  },
  {
    id: "13ed7c8a",
    title:
      "A study on the effects of mindfulness meditation on high school students' stress levels",
    category: "Psychology",
    date: new Date("2021-02-28T08:45:00.000Z"),
  },
  {
    id: "46af2b5d",
    title: "Exploring the potential of solar energy in rural electrification",
    category: "Energy",
    date: new Date("2023-09-10T14:20:00.000Z"),
  },
  {
    id: "57bc3d7f",
    title:
      "Analyzing the genetic diversity of wild honeybee populations in Southeast Asia",
    category: "Genetics",
    date: new Date("2020-12-01T11:15:00.000Z"),
  },
  {
    id: "68cd4e9a",
    title: "The role of gut microbiota in human health and disease",
    category: "Medical Science",
    date: new Date("2024-04-25T13:00:00.000Z"),
  },
  {
    id: "79de5fbc",
    title:
      "Advancements in quantum computing and their applications in cryptography",
    category: "Computer Science",
    date: new Date("2022-08-17T16:30:00.000Z"),
  },
  {
    id: "80ef6acd",
    title:
      "Evaluating the effectiveness of different teaching methods in elementary schools",
    category: "Education",
    date: new Date("2023-01-05T09:45:00.000Z"),
  },
  {
    id: "91fg7bde",
    title:
      "The influence of social media on teenage mental health and self-esteem",
    category: "Sociology",
    date: new Date("2021-06-19T12:00:00.000Z"),
  },
];

const dataPapers: PaperItemModel[] = [
  {
    id: "728ed52f",
    title:
      "Effect of exposure to different colors light emitting diode on the yield and physical properties of grey and white oyster mushrooms",
    category: "Life Science",
    date: new Date("2024-07-30T14:05:00.156Z"),
  },
  {
    id: "82bf3a1d",
    title:
      "Investigating the impact of urban noise pollution on the behavior of songbirds",
    category: "Environmental Science",
    date: new Date("2023-05-21T10:30:00.000Z"),
  },
  {
    id: "94cf6b2e",
    title:
      "Development of biodegradable plastic alternatives using corn starch and plant fibers",
    category: "Materials Science",
    date: new Date("2022-11-15T09:00:00.000Z"),
  },
  {
    id: "13ed7c8a",
    title:
      "A study on the effects of mindfulness meditation on high school students' stress levels",
    category: "Psychology",
    date: new Date("2021-02-28T08:45:00.000Z"),
  },
  {
    id: "46af2b5d",
    title: "Exploring the potential of solar energy in rural electrification",
    category: "Energy",
    date: new Date("2023-09-10T14:20:00.000Z"),
  },
  {
    id: "57bc3d7f",
    title:
      "Analyzing the genetic diversity of wild honeybee populations in Southeast Asia",
    category: "Genetics",
    date: new Date("2020-12-01T11:15:00.000Z"),
  },
  {
    id: "68cd4e9a",
    title: "The role of gut microbiota in human health and disease",
    category: "Medical Science",
    date: new Date("2024-04-25T13:00:00.000Z"),
  },
];

const papersData: ResearchPaperModel1[] = [
  {
    adviser: "Maricor Santos",
    type: "Proposal",
    category: "Life Science",
    date: new Date("2024-07-30T14:05:00.156Z"),
    id: "1",
    title:
      "Effect of exposure to different colors light emitting diode on the yield and physical properties of grey and white oyster mushrooms",
  },
];

const PaperManagement = () => {
  return (
    <div className="flex flex-col px-3 md:px-8 lg:py-4 lg:px-16 xl:px-28">
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight lg:mt-4">
        Paper Management
      </h4>

      <div className="grid grid-cols-2 gap-2 lg:grid-cols-3 mt-4">
        {/* <CurrentPaperCard cardTitle="Research Proposals" data={data} />
        <CurrentPaperCard cardTitle="Research Papers" data={dataPapers} /> */}
        <TotalPaperCard />
        <TotalResearchProposal />
        <TotalPapersCard />
      </div>
      <div className="mt-4">
        <Card>
          <CardHeader>
            <div className="flex justify-end">
              <Link href={"paper-management/add-paper"}>
                <Button className="bg-[#606C38] hover:bg-[#606C38]">
                  Add Paper
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={papersData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaperManagement;
