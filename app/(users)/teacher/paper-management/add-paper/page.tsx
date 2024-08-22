"use client";
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { CalendarDatePicker } from "@/components/ui/calendar-picker";
import { Textarea } from "@/components/ui/textarea";

const AddPaper = () => {
  const [selectedDateRange, setSelectedDateRange] = useState({
    from: new Date(new Date().getFullYear(), 0, 1),
    to: new Date(),
  });
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
              <div className="flex flex-col gap-6">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    className="border-[#B0B0B0]"
                    id="title"
                    placeholder="Research Title"
                  />
                </div>

                <div className="w-full grid md:grid-cols-2 gap-4">
                  <Card className="border-[#B0B0B0]">
                    <CardHeader>
                      <CardDescription>Add Authors</CardDescription>
                      <CardTitle className="flex gap-4 justify-between">
                        <Input type="text" placeholder="Justine Santos" />
                        <Button size={"sm"} className="w-[160px] text-sm">
                          Add Author
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <h1>These are the content</h1>
                      <h1>These are the content</h1>
                      <h1>These are the content</h1>
                      <h1>These are the content</h1>
                      <h1>These are the content</h1>
                      <h1>These are the content</h1>
                      <h1>These are the content</h1>
                      <h1>These are the content</h1>
                      <h1>These are the content</h1>
                      <h1>These are the content</h1>
                      <h1>These are the content</h1>
                      <h1>These are the content</h1>
                    </CardContent>
                  </Card>

                  <Card className="flex flex-col border-[#B0B0B0]">
                    <div className="">
                      <CardHeader>
                        <CardDescription>Research Teacher</CardDescription>
                        <CardTitle className="flex gap-4 justify-between">
                          <Input type="text" placeholder="Justine Santos" />
                        </CardTitle>
                      </CardHeader>
                    </div>
                    <div>
                      <CardHeader>
                        <CardDescription>Research Consultant</CardDescription>
                        <CardTitle className="flex gap-4 justify-between">
                          <Input type="text" placeholder="Justine Santos" />
                        </CardTitle>
                      </CardHeader>
                    </div>
                  </Card>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="category">Research Category</Label>
                    <Select>
                      <SelectTrigger className="border-[#B0B0B0]" id="category">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apple">Life Science</SelectItem>
                        <SelectItem value="banana">Physical Science</SelectItem>
                        <SelectItem value="blueberry">
                          Science Innovation Expo
                        </SelectItem>
                        <SelectItem value="grapes">Robotics</SelectItem>
                        <SelectItem value="pineapple">
                          Mathematical and Computational
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <CalendarDatePicker
                      date={selectedDateRange}
                      onDateSelect={setSelectedDateRange}
                      variant="outline"
                      numberOfMonths={1}
                      className="w-full border-[#B0B0B0]"
                      id="date"
                    />
                    {/* {selectedDateRange.from.toDateString()} */}
                  </div>
                </div>

                <div className="grid w-full gap-1.5">
                  <Label htmlFor="message">Introduction</Label>
                  <Textarea
                    placeholder="Type introduction paper here."
                    id="message"
                    className="border-[#B0B0B0]"
                  />
                </div>

                <Card className="border-[#B0B0B0]">
                  <CardHeader></CardHeader>
                  <CardContent>
                    <div className="justify-end flex">
                      <Button>Add Reference</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="paper">Reserach Paper </TabsContent>
          </CardContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AddPaper;
