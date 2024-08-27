"use client";
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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { IoMdClose } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";
import { useEdgeStore } from "@/lib/edgestore";
import Link from "next/link";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type AuthorModel = {
  firstName: string;
  lastName: string;
  id: string;
};

const authorFormSchema = z.object({
  firstName: z.string().min(1, {
    message: "First name must be at least 1 characters.",
  }),
  lastName: z.string().min(1, {
    message: "Last name must be at least 1 characters.",
  }),
});

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required.",
  }),
  researchAdviser: z.string().min(1, {
    message: "Research Adviser is required.",
  }),
  researchConsultant: z.string().min(1, {
    message: "Research Consultant is required.",
  }),
  researchCategory: z.string().min(1, {
    message: "Research Category is required.",
  }),
  introduction: z.string().min(1, {
    message: "Introduction is required.",
  }),
});

const ResearchProposalForm = () => {
  const [selectedDateRange, setSelectedDateRange] = useState({
    from: new Date(new Date().getFullYear(), 0, 1),
    to: new Date(),
  });

  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();

  const authorForm = useForm<z.infer<typeof authorFormSchema>>({
    resolver: zodResolver(authorFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      researchAdviser: "",
      introduction: "",
      researchCategory: "",
      researchConsultant: "",
    },
  });
  const [authors, setAuthors] = useState<AuthorModel[]>([]);

  const authorFormSubmit = (values: z.infer<typeof authorFormSchema>) => {
    setAuthors((prev) => [
      ...prev,
      {
        firstName: values.firstName.toLowerCase(),
        lastName: values.lastName.toLowerCase(),
        id: uuidv4(),
      },
    ]);
    authorForm.reset();
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="border-[#B0B0B0]"
                  placeholder="Effect of exposure to different colors light emitting diode on the yield and physical properties of grey and white oyster mushrooms"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="w-full grid md:grid-cols-2 gap-4">
          <Card className="border-[#B0B0B0]">
            <CardHeader>
              <CardDescription>Add Authors</CardDescription>
              <CardTitle className="flex gap-4 justify-between">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size={"sm"}
                      className="w-[160px] text-sm bg-[#BC6C25] hover:bg-[#A85A1D]"
                    >
                      Add Author
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add a New Author</DialogTitle>
                      <DialogDescription>
                        You can add multiple authors to this research proposal.
                      </DialogDescription>
                    </DialogHeader>
                    <Form {...authorForm}>
                      <form
                        onSubmit={authorForm.handleSubmit(authorFormSubmit)}
                        className="flex gap-2"
                      >
                        <FormField
                          control={authorForm.control}
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
                          control={authorForm.control}
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
                  </DialogContent>
                </Dialog>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              {authors.map((author) => (
                <div
                  key={author.id}
                  className="flex justify-between items-center"
                >
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
            <FormField
              control={form.control}
              name="researchAdviser"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Research Adviser</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Adviser" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="researchConsultant"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Research Consultant</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Consultant" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="researchCategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Research Category</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger id="category">
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
                  </FormControl>
                </FormItem>
              )}
            />
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

        <div className="">
          <FormField
            control={form.control}
            name="introduction"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Introduction</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Type introduction paper here."
                    id="message"
                    className="border-[#B0B0B0] min-h-[200px]"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <Card className="border-[#B0B0B0]">
          <CardHeader></CardHeader>
          <CardContent>
            <div className="justify-end flex">
              <Button
                type="button"
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
          <Button type="button" onClick={handleFileUpload}>
            Upload
          </Button>
        </div>
        <Link
          href={
            "https://files.edgestore.dev/i3fk8xebtpfydpdd/publicFiles/_public/b79b6f8e-4777-44e0-b89e-91fa88ffdcbb.pdf"
          }
          target="_blank"
        >
          Check file
        </Link>
        <Button type="submit" className="bg-[#606C38] hover:bg-[#283618]">
          Add Paper
        </Button>
      </form>
    </Form>
  );
};

export default ResearchProposalForm;
