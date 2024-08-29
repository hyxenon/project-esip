"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";
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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AuthorPaper, ResearchPaperModel } from "@/models/models";
import { useSession } from "next-auth/react";
import { addResearchProposalPaper } from "@/actions/paperManagement.action";

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
  references: z.string().min(1, {
    message: "References is required.",
  }),
  file: z.string().optional(),
  grade: z.string().optional(),
});

const ResearchProposalForm = () => {
  const { data: sessionData } = useSession();
  const [selectedDateRange, setSelectedDateRange] = useState({
    from: new Date(new Date().getFullYear(), 0, 1),
    to: new Date(),
  });

  const [file, setFile] = useState<File>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { edgestore } = useEdgeStore();

  const [progress, setProgress] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { toast } = useToast();

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
      file: "",
      references: "",
    },
  });
  const [authors, setAuthors] = useState<AuthorPaper[]>([]);

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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    handleFileUpload().then((uploadedUrl) => {
      if (sessionData?.user?.id) {
        const data: ResearchPaperModel = {
          ...values,
          researchType: "proposal",
          date: selectedDateRange.from,
          authors: authors,
          userId: sessionData?.user?.id,
          file: uploadedUrl || undefined, // Assign URL or undefined if null
        };

        addResearchProposalPaper(data).then((paper) => {
          form.reset();
          setAuthors([]);
          setProgress(0);
          if (fileInputRef.current) {
            fileInputRef.current.value = ""; // Reset the input
          }
          setFile(undefined); // Reset the file state if needed
          console.log(paper);
        });

        toast({
          title: "Add Paper Successfully.",
          variant: "success",
        });

        setIsLoading(false);
      }
    });
  };

  const handleFileUpload = async (): Promise<string | null> => {
    if (file) {
      console.log("Starting file upload...");
      return edgestore.myProtectedFiles
        .upload({
          file,
          onProgressChange: (progress) => {
            setProgress(progress);
          },
        })
        .then((res) => {
          console.log("File uploaded, URL:", res.url);
          return res.url; // Return the URL as a string
        });
    } else {
      console.log("No file selected for upload.");
      return null; // Return null if no file was uploaded
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
                  className={`border-[#B0B0B0] ${
                    form.formState.errors.title ? "border-red-500" : ""
                  }`}
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
                    <Input
                      className={`${
                        form.formState.errors.researchAdviser
                          ? "border-red-500"
                          : ""
                      }`}
                      type="text"
                      placeholder="Adviser"
                      {...field}
                    />
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
                    <Input
                      className={`${
                        form.formState.errors.researchConsultant
                          ? "border-red-500"
                          : ""
                      }`}
                      type="text"
                      placeholder="Consultant"
                      {...field}
                    />
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
                      <SelectTrigger
                        className={`${
                          form.formState.errors.researchCategory
                            ? "border-red-500"
                            : ""
                        }`}
                        id="category"
                      >
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="life">Life Science</SelectItem>
                        <SelectItem value="physical">
                          Physical Science
                        </SelectItem>
                        <SelectItem value="expo">
                          Science Innovation Expo
                        </SelectItem>
                        <SelectItem value="robotics">Robotics</SelectItem>
                        <SelectItem value="mathematical">
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

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="introduction"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Introduction</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Type introduction paper here."
                    className={`border-[#B0B0B0] min-h-[200px] ${
                      form.formState.errors.introduction ? "border-red-500" : ""
                    }`}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="references"
            render={({ field }) => (
              <FormItem>
                <FormLabel>References</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Paste references here."
                    className={`border-[#B0B0B0] min-h-[200px] ${
                      form.formState.errors.references ? "border-red-500" : ""
                    }`}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="">
          <div className="flex items-end gap-2">
            <div>
              <Label htmlFor="file">File</Label>
              <Input
                ref={fileInputRef}
                onChange={(e) => {
                  setFile(e.target.files?.[0]);
                }}
                id="file"
                type="file"
                accept="application/pdf"
                className="border-[#B0B0B0]"
              />
            </div>
            <FormField
              control={form.control}
              name="grade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Grade</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="90"
                      className="border-[#B0B0B0]"
                      type="number"
                      max={100}
                      min={0}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button
          disabled={isLoading}
          type="submit"
          className="bg-[#606C38] hover:bg-[#283618]"
        >
          {isLoading ? progress : "Add Paper"}
        </Button>
      </form>
    </Form>
  );
};

export default ResearchProposalForm;
