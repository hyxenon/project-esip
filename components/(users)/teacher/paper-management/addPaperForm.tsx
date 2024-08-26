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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { IoMdClose } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";
import { useEdgeStore } from "@/lib/edgestore";
import Link from "next/link";

type AuthorModel = {
  firstName: string;
  lastName: string;
  id: string;
};

const formSchema = z.object({
  firstName: z.string().min(1, {
    message: "First name must be at least 1 characters.",
  }),
  lastName: z.string().min(1, {
    message: "Last name must be at least 1 characters.",
  }),
});

const AddPaperForm = () => {
  const [selectedDateRange, setSelectedDateRange] = useState({
    from: new Date(new Date().getFullYear(), 0, 1),
    to: new Date(),
  });

  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });
  const [authors, setAuthors] = useState<AuthorModel[]>([]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setAuthors((prev) => [
      ...prev,
      {
        firstName: values.firstName.toLowerCase(),
        lastName: values.lastName.toLowerCase(),
        id: uuidv4(),
      },
    ]);
    form.reset();
  };

  const handleFileUpload = async () => {
    if (file) {
      const res = await edgestore.publicFiles.upload({
        file,
        options: {
          temporary: true,
        },
        onProgressChange: (progress) => {
          // you can use this to show a progress bar
          console.log(progress);
        },
      });
      // you can run some server action or api here
      // to add the necessary data to your database
      console.log(res);
    }
  };

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
                        <Form {...form}>
                          <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="flex gap-2"
                          >
                            <FormField
                              control={form.control}
                              name="firstName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      type="text"
                                      placeholder="First name"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="lastName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      type="text"
                                      placeholder="Last Name"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <Button
                              size={"sm"}
                              type="submit"
                              className="w-[160px] text-sm bg-[#BC6C25] hover:bg-[#A85A1D]"
                            >
                              Add Author
                            </Button>
                          </form>
                        </Form>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-4">
                      {authors.map((author) => (
                        <div className="flex justify-between items-center">
                          <p className="capitalize text-sm">
                            {author.firstName} {author.lastName}
                          </p>
                          <IoMdClose
                            className="cursor-pointer text-red-500"
                            onClick={() =>
                              setAuthors((prev) =>
                                prev.filter((item) => item.id !== author.id)
                              )
                            }
                          />
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="flex flex-col border-[#B0B0B0] p-4 space-y-4">
                    <div className="">
                      <Label>Research Adviser</Label>
                      <Input type="text" placeholder="Adviser" />
                    </div>
                    <div>
                      <Label>Research Consultant</Label>
                      <Input type="text" placeholder="Consultant" />
                    </div>
                    <div>
                      <Label htmlFor="category">Research Category</Label>
                      <Select>
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="apple">Life Science</SelectItem>
                          <SelectItem value="banana">
                            Physical Science
                          </SelectItem>
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
                        className="w-full"
                        id="date"
                      />
                    </div>
                  </Card>
                </div>

                <div className="grid w-full gap-1.5">
                  <Label htmlFor="message">Introduction</Label>
                  <Textarea
                    placeholder="Type introduction paper here."
                    id="message"
                    className="border-[#B0B0B0] min-h-[200px]"
                  />
                </div>

                <Card className="border-[#B0B0B0]">
                  <CardHeader></CardHeader>
                  <CardContent>
                    <div className="justify-end flex">
                      <Button
                        size={"sm"}
                        className="w-[160px] text-sm bg-[#BC6C25] hover:bg-[#A85A1D]"
                      >
                        Add Reference
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="file">File</Label>
                  <Input
                    onChange={(e) => {
                      setFile(e.target.files?.[0]);
                    }}
                    id="file"
                    type="file"
                    accept="application/pdf"
                  />
                  <Button onClick={handleFileUpload}>Upload</Button>
                </div>
                <Link
                  href={
                    "https://files.edgestore.dev/i3fk8xebtpfydpdd/publicFiles/_public/b79b6f8e-4777-44e0-b89e-91fa88ffdcbb.pdf"
                  }
                  target="_blank"
                >
                  Check file
                </Link>
                <Button className="bg-[#606C38] hover:bg-[#283618]">
                  Add Paper
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="paper">Reserach Paper</TabsContent>
          </CardContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AddPaperForm;
