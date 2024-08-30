import { getAllPapers } from "@/actions/paperManagement.action";
import { DataTable } from "@/components/(users)/teacher/paper-management/data-table";
import { columns } from "@/components/(users)/teacher/paper-management/paper-column";
import TotalPaperCard from "@/components/(users)/teacher/paper-management/TotalPaperCard";

import TotalPapersCard from "@/components/(users)/teacher/paper-management/TotalPapersCard";
import TotalResearchProposal from "@/components/(users)/teacher/paper-management/TotalResearchProposal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ResearchPaperModel } from "@/models/models";
import Link from "next/link";
import React from "react";

const PaperManagement = async () => {
  const res = await getAllPapers();
  const papers = res.message.map((paper: any) => ({
    ...paper,
    file: paper.file ?? undefined,
  }));
  const typedPapers: ResearchPaperModel[] = papers;

  return (
    <div className="flex flex-col py-4 px-3 md:px-8 lg:py-4 lg:px-16 xl:px-28">
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
            <DataTable columns={columns} data={typedPapers} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaperManagement;
