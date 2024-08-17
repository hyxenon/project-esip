import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AddPaper = () => {
  return (
    <div className="flex flex-col gap-8 px-3 md:px-8 lg:py-4 lg:px-16 xl:px-28">
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

      <Card>
        <Tabs defaultValue="proposal" className="">
          <CardHeader>
            <CardTitle>
              <TabsList>
                <TabsTrigger value="proposal">Research Proposal</TabsTrigger>
                <TabsTrigger value="paper">Research Paper</TabsTrigger>
              </TabsList>
            </CardTitle>
          </CardHeader>
          <CardContent className="">
            <TabsContent value="proposal">
              <div className="grid grid-cols-3 gap-8">
                <Card className="w-full">
                  <CardHeader>
                    <CardDescription>
                      Add Authors to this paper.
                    </CardDescription>
                    <CardTitle className="flex gap-4 justify-between">
                      <Input type="text" placeholder="Justine Santos" />
                      <Button>Add Author</Button>
                    </CardTitle>
                  </CardHeader>
                </Card>

                <Card className="col-span-2">
                  <CardHeader>
                    <CardTitle>Introduction</CardTitle>
                    <CardDescription>
                      Introduction of the paper.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="paper">Change your password here.</TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default AddPaper;
