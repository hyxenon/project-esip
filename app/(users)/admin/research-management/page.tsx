import { getAllResearchPapers } from "@/actions/adminPaperManagement";
import { getSchools } from "@/actions/schoolManagement";
import MobileMenu from "@/components/(users)/admin/mobileMenu";
import { columns } from "@/components/(users)/admin/research-management/column";
import SchoolSelect from "@/components/(users)/admin/user-management/SchoolSelect";
import { DataTable } from "@/components/(users)/teacher/paper-management/data-table";
import TotalPaperCard from "@/components/(users)/teacher/paper-management/TotalPaperCard";
import TotalPapersCard from "@/components/(users)/teacher/paper-management/TotalPapersCard";
import TotalResearchProposal from "@/components/(users)/teacher/paper-management/TotalResearchProposal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { ResearchPaperModel } from "@/models/models";
import { FaAlignLeft } from "react-icons/fa";

const ResearchManagement = async ({
  searchParams,
}: {
  searchParams?: {
    id?: string;
    category?: string;
  };
}) => {
  const schoolsResponse = await getSchools();
  let papers: ResearchPaperModel[] = [];

  const categoryMapping: { [key: string]: string } = {
    life: "life science",
    physical: "physical science",
    expo: "science innovation expo",
    robotics: "robotics",
    mathematical: "mathematical and computational",
  };

  const category = categoryMapping[searchParams?.category || ""] || undefined;

  if (searchParams?.id === undefined) {
    const papersData = await getAllResearchPapers(undefined, category);
    papers = papersData;
  } else {
    const papersData = await getAllResearchPapers(searchParams.id, category);
    papers = papersData;
  }

  return (
    <div className="w-full h-screen px-4 md:px-8 py-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button className="flex lg:hidden mb-4" variant="ghost" size={"icon"}>
            <FaAlignLeft />
          </Button>
        </SheetTrigger>
        <MobileMenu role="ADMIN" />
      </Sheet>

      <div className="grid grid-cols-2 gap-2 xl:grid-cols-3 mt-4">
        <TotalPaperCard count={0} />
        <TotalResearchProposal count={0} />
        <TotalPapersCard count={0} />
      </div>
      <SchoolSelect
        schoolsData={schoolsResponse.message}
        managementType="paper"
      />
      <div className="mt-8">
        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader></CardHeader>
          <CardContent className="px-2 md:px-6">
            <DataTable columns={columns} data={papers} type="admin" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResearchManagement;
