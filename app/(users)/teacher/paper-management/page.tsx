import { getAllPapers } from "@/actions/paperManagement.action";
import { auth } from "@/auth";
import { DataTable } from "@/components/(users)/teacher/paper-management/data-table";
import { columns } from "@/components/(users)/teacher/paper-management/paper-column";
import TotalPaperCard from "@/components/(users)/teacher/paper-management/TotalPaperCard";

import TotalPapersCard from "@/components/(users)/teacher/paper-management/TotalPapersCard";
import TotalResearchProposal from "@/components/(users)/teacher/paper-management/TotalResearchProposal";
import PaperHistory from "@/components/PaperHistory";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Unauthorized from "@/components/UnAuthorized";
import { ResearchPaperModel } from "@/models/models";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Project E-SIP - Paper Management",
};

const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

const PaperManagement = async ({
  searchParams,
}: {
  searchParams?: {
    category?: string;
    authorSearch?: string;
    authorSearchTerm?: string;
    year?: string;
  };
}) => {
  const session = await auth();
  const schoolId = session?.user?.schoolId;

  if (!schoolId) {
    return <div>No school ID found for the user.</div>;
  }

  if (session?.user?.role !== "TEACHER") {
    return <Unauthorized />;
  }

  const categoryMapping: { [key: string]: string } = {
    life: "life science",
    physical: "physical science",
    expo: "science innovation expo",
    robotics: "robotics",
    mathematical: "mathematical and computational",
  };

  const category = categoryMapping[searchParams?.category || ""] || undefined;
  const authorSearch = searchParams?.authorSearch === "true";
  const authorSearchValue = searchParams?.authorSearchTerm || "";
  const selectedYear =
    searchParams?.year && searchParams.year !== "all"
      ? parseInt(searchParams.year)
      : null;

  const res = await getAllPapers(
    schoolId,
    category,
    authorSearch,
    authorSearchValue
  );
  let papers: ResearchPaperModel[] = res.message.map((paper: any) => ({
    ...paper,
    file: paper.file ?? undefined,
  }));

  if (selectedYear) {
    papers = papers.filter((paper) => {
      const paperYear = new Date(paper.date).getFullYear();
      return paperYear === selectedYear;
    });
  }

  const totalResearchProposals = papers.filter(
    (paper) => paper.researchType === "proposal"
  ).length;

  const totalResearchPapers = papers.filter(
    (paper) => paper.researchType === "paper"
  ).length;

  return (
    <div className="flex flex-col py-4 px-3 md:px-8 lg:py-4 lg:px-16 xl:px-28">
      <div className="flex justify-between">
        <h4 className="scroll-m-20 text-2xl font-semibold tracking-tight lg:mt-4 text-[#283618]">
          Paper Management
        </h4>
        <PaperHistory />
      </div>

      <div className="grid grid-cols-2 gap-2 lg:grid-cols-3 mt-4">
        <TotalPaperCard count={papers.length} />
        <TotalResearchProposal count={totalResearchProposals} />
        <TotalPapersCard count={totalResearchPapers} />
      </div>
      <div className="mt-8">
        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <div className="flex justify-end">
              <Link href={"paper-management/add-paper"}>
                <Button className="bg-[#BC6C25] hover:bg-[#A85A1D] text-[#FEFAE0]">
                  Add Paper
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="px-2 md:px-6">
            <DataTable
              columns={columns}
              data={papers}
              authorSearchParams={searchParams?.authorSearch}
              authorSearchValue={searchParams?.authorSearchTerm}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaperManagement;
