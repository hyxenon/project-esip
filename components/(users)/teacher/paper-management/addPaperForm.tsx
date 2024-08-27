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

const AddPaperForm = () => {
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
            <BreadcrumbPage>Add Research Paper</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="md:container">
        <Tabs defaultValue="proposal" className="">
          <CardHeader>
            <CardTitle>
              <TabsList className="shadow-2xl bg-[#D9D9D9] bg-opacity-70">
                <TabsTrigger value="proposal">Research Proposal</TabsTrigger>
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
      </div>
    </div>
  );
};

export default AddPaperForm;
