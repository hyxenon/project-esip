"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ResearchProposalForm from "./ResearchProposalForm";
import { ResearchPaperModel } from "@/models/models";
import { Badge } from "@/components/ui/badge";

interface AddPaperFormProps {
  isEdit?: boolean;
  paperId?: string;
  paper?: ResearchPaperModel;
}

const AddPaperForm = ({ isEdit, paperId, paper }: AddPaperFormProps) => {
  return (
    <div>
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
        {isEdit && paperId && paper ? (
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
        ) : (
          <>
            <Tabs defaultValue="proposal" className="">
              <CardHeader>
                <CardTitle>
                  <TabsList className="shadow-2xl bg-[#D9D9D9] bg-opacity-70">
                    <TabsTrigger value="proposal">
                      Research Proposal
                    </TabsTrigger>
                    <TabsTrigger value="paper">Research Paper</TabsTrigger>
                  </TabsList>
                </CardTitle>
              </CardHeader>
              <CardContent className="">
                <TabsContent value="proposal">
                  <ResearchProposalForm />
                </TabsContent>
                <TabsContent value="paper">Reserach Paper</TabsContent>
              </CardContent>
            </Tabs>
          </>
        )}
      </div>
    </div>
  );
};

export default AddPaperForm;
