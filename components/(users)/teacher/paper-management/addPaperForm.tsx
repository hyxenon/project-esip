"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ResearchProposalForm from "./ResearchProposalForm";
import { ResearchPaperModel } from "@/models/models";
import { Badge } from "@/components/ui/badge";
import ResearchPaperForm from "./ResearchPaperForm";
import { RocketIcon } from "@radix-ui/react-icons";

interface AddPaperFormProps {
  isEdit?: boolean;
  paperId?: string;
  paper?: ResearchPaperModel;
  researchType?: string;
}

const AddPaperForm = ({
  isEdit,
  paperId,
  paper,
  researchType,
}: AddPaperFormProps) => {
  return (
    <Card className="py-8 px-8 lg:mt-8 lg:p-16 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300container">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/teacher/paper-management">
              Go Back
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage>
              {isEdit ? "Edit Research Paper" : "Add Research Paper"}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="md:container">
        {isEdit &&
          researchType !== "paper" &&
          paperId &&
          paper &&
          paper.researchType === "proposal" && (
            <>
              <div className="flex justify-center mt-4">
                <Badge className="bg-[#606C38] hover:bg-[#606C38]">
                  Edit Mode
                </Badge>
              </div>
              <h2 className="scroll-m-20 my-4 border-b pb-2 text-xl font-semibold tracking-tight first:mt-0 capitalize ">
                research {paper.researchType}
              </h2>
              <ResearchProposalForm
                isEdit={isEdit}
                paperId={paperId}
                paper={paper}
              />
            </>
          )}

        {isEdit &&
          paperId &&
          paper &&
          (paper.researchType === "paper" || researchType === "paper") && (
            <>
              <div className="flex justify-center mt-4">
                <Badge className="bg-[#606C38] hover:bg-[#606C38]">
                  {researchType === "paper"
                    ? "Proposal to Paper"
                    : "Edit Paper"}
                </Badge>
              </div>

              {!researchType && (
                <h2 className="scroll-m-20 my-4 border-b pb-2 text-xl font-semibold tracking-tight first:mt-0 capitalize ">
                  research {paper.researchType}
                </h2>
              )}

              <ResearchPaperForm
                isEdit={isEdit}
                paperId={paperId}
                paper={paper}
                proposalToPaper={researchType === "paper" ? true : false}
              />
            </>
          )}

        {!isEdit && (
          <Tabs defaultValue="proposal" className="">
            <TabsList className="shadow-2xl bg-[#D9D9D9] bg-opacity-70 my-6">
              <TabsTrigger value="proposal">Research Proposal</TabsTrigger>
              <TabsTrigger value="paper">Research Paper</TabsTrigger>
            </TabsList>

            <TabsContent value="proposal">
              <ResearchProposalForm />
            </TabsContent>
            <TabsContent value="paper">
              <Alert className="mt-4 mb-10  bg-[#FEFAE0] text-[#606C38] shadow-md ">
                <div className="flex items-start">
                  <RocketIcon className="h-4 w-4 mr-2 text-[#283618]" />
                  <div>
                    <AlertTitle className="text-[#283618] font-semibold">
                      Heads up!
                    </AlertTitle>
                    <AlertDescription className="text-[#606C38]">
                      You're currently adding a Research Paper. You can import
                      data from an existing Research Proposal by going to the
                      Paper Management table. In the actions dropdown for your
                      desired paper, select "Add Research Paper" to
                      automatically populate the relevant data into your new
                      Research Paper.
                    </AlertDescription>
                  </div>
                </div>
              </Alert>

              <ResearchPaperForm />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </Card>
  );
};

export default AddPaperForm;
