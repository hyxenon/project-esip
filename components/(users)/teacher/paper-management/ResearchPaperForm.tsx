"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { useEdgeStore } from "@/lib/edgestore";
import { AuthorPaper, ResearchPaperModel } from "@/models/models";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IoMdClose } from "react-icons/io";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { CalendarDatePicker } from "@/components/ui/calendar-picker";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  addResearchProposalPaper,
  updatePaper,
} from "@/actions/paperManagement.action";
import Link from "next/link";

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
  abstract: z.string().min(1, {
    message: "Abstract is required.",
  }),
  references: z.string().min(1, {
    message: "References is required.",
  }),
  isPublic: z.string(),
  file: z.string().optional(),
  grade: z.string().optional(),
  keywords: z.string().optional(),
});

interface ResearchPaperFormProps {
  isEdit?: boolean;
  paperId?: string;
  paper?: ResearchPaperModel;
  proposalToPaper?: boolean;
}

const ResearchPaperForm = ({
  isEdit,
  paperId,
  paper,
  proposalToPaper,
}: ResearchPaperFormProps) => {
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
  const [authors, setAuthors] = useState<AuthorPaper[]>([]);
  const [authorInput, setAuthorInput] = useState<string>("");
  const { toast } = useToast();

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
      isPublic: "false",
      keywords: "",
    },
  });

  useEffect(() => {
    if (isEdit && paperId && paper) {
      form.setValue("title", paper.title);
      form.setValue("researchAdviser", paper.researchAdviser.toUpperCase());
      form.setValue(
        "researchConsultant",
        paper.researchConsultant.toUpperCase()
      );
      form.setValue("researchCategory", paper.researchCategory.toUpperCase());
      form.setValue("abstract", paper.abstract!);
      form.setValue("introduction", paper.introduction);
      form.setValue("references", paper.references);
      form.setValue("grade", paper.grade ?? "");
      form.setValue("isPublic", paper.isPublic ? "true" : "false");

      setSelectedDateRange({
        from: new Date(paper.date),
        to: new Date(paper.date),
      });

      if (paper.authors) {
        setAuthors(paper.authors);
      }

      if (paper.keywords) {
        form.setValue("keywords", paper.keywords.join(", "));
      }
    }
  }, [isEdit, paperId, paper, form]);

  const authorFormSubmit = () => {
    if (authorInput !== "") {
      setAuthors((prev) => [
        ...prev,
        {
          name: authorInput.toLowerCase(),
          id: uuidv4(),
        },
      ]);
      setAuthorInput("");
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    const keywordsArray =
      values.keywords !== undefined
        ? values.keywords.split(",").map((kw) => kw.trim())
        : [];

    if (isEdit && paperId && paper && !proposalToPaper) {
      handleFileUpload().then((uploadedUrl) => {
        const data: ResearchPaperModel = {
          ...values,
          researchAdviser: values.researchAdviser.toLowerCase(),
          researchConsultant: values.researchConsultant.toLowerCase(),
          researchCategory: values.researchCategory.toLowerCase(),
          isPublic: values.isPublic === "true" ? true : false,
          researchType: paper.researchType,
          date: selectedDateRange.from,
          authors: authors,
          userId: paper.userId,
          file: file ? uploadedUrl : paper.file,
          keywords: keywordsArray,
        };

        if (uploadedUrl && paper.file) {
          edgestore.myProtectedFiles.delete({
            url: paper.file,
          });
        }

        updatePaper(paperId, data).then((paper) => {
          setProgress(0);
        });

        toast({
          title: "Edit Paper Successfully.",
          variant: "success",
        });

        setIsLoading(false);
      });
    } else {
      handleFileUpload().then((uploadedUrl) => {
        if (sessionData?.user?.id) {
          const data: ResearchPaperModel = {
            ...values,
            isPublic: values.isPublic === "true" ? true : false,
            researchType: "paper",
            date: selectedDateRange.from,
            authors: authors,
            userId: sessionData?.user?.id,
            file: uploadedUrl || undefined,
            keywords: keywordsArray,
          };

          addResearchProposalPaper(data).then((paper) => {
            form.reset();
            setAuthors([]);
            setProgress(0);
            if (fileInputRef.current) {
              fileInputRef.current.value = ""; // Reset the input
            }
            setFile(undefined); // Reset the file state if needed
          });

          toast({
            title: "Add Paper Successfully.",
            variant: "success",
          });

          setIsLoading(false);
        }
      });
    }
  };

  const handleFileUpload = async (): Promise<string | null> => {
    if (file) {
      console.log("Starting file upload...");
      return edgestore.publicFiles
        .upload({
          file,
          onProgressChange: (progress) => {
            setProgress(progress);
          },
        })
        .then((res) => {
          return res.url; // Return the URL as a string
        });
    } else {
      console.log("No file selected for upload.");
      return null; // Return null if no file was uploaded
    }
  };

  return (
    <div>
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
                    className={`border-gray-300 ${
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
            <Card className="border-gray-300">
              <CardHeader>
                <CardDescription>Add Authors</CardDescription>
                <CardTitle className="flex gap-4 justify-between">
                  <Input
                    value={authorInput}
                    onChange={(e) => setAuthorInput(e.target.value)}
                    type="text"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        authorFormSubmit();
                        e.preventDefault();
                      }
                    }}
                  />
                  <Button
                    type="button"
                    size={"sm"}
                    className="w-[160px] text-sm bg-[#BC6C25] hover:bg-[#A85A1D]"
                    onClick={authorFormSubmit}
                  >
                    Add Author
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                {authors.map((author) => (
                  <div
                    key={author.id}
                    className="flex justify-between items-center"
                  >
                    <p className="capitalize text-sm">{author.name}</p>
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

            <Card className="flex flex-col border-gray-300 p-4 space-y-4">
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
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger
                          className={`${
                            form.formState.errors.researchCategory
                              ? "border-red-500"
                              : ""
                          }`}
                        >
                          <SelectValue
                            placeholder={field.value ? field.value : "Category"}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="life science">
                            Life Science
                          </SelectItem>
                          <SelectItem value="physical science">
                            Physical Science
                          </SelectItem>
                          <SelectItem value="science innovation expo">
                            Science Innovation Expo
                          </SelectItem>
                          <SelectItem value="robotics">Robotics</SelectItem>
                          <SelectItem value="mathematical and computational">
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
              <div>
                <FormField
                  control={form.control}
                  name="keywords"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Keywords</Label>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter keywords..."
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </Card>
          </div>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="abstract"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Abstract</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Type abstract here."
                      className={`border-gray-300 min-h-[200px] ${
                        form.formState.errors.introduction
                          ? "border-red-500"
                          : ""
                      }`}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="introduction"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Introduction</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Type introduction  here."
                      className={`border-gray-300 min-h-[200px] ${
                        form.formState.errors.introduction
                          ? "border-red-500"
                          : ""
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
                      className={`border-gray-300 min-h-[200px] ${
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
                  className="border-gray-300"
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
                        className="border-gray-300"
                        type="number"
                        max={100}
                        min={0}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isPublic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Visibility</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value === "true" ? "true" : "false"}
                        value={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={"true"} />
                          </FormControl>
                          <FormLabel className="font-normal">Public</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={"false"} />
                          </FormControl>
                          <FormLabel className="font-normal">Private</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          {isEdit && paper?.file && (
            <div className="flex items-center gap-2">
              <p className="font-medium">Current File:</p>
              {isEdit && paper?.file && (
                <Link
                  className="underline text-sm font-medium text-[#BC6C25] hover:text-[#DDA15E]"
                  target="_blank"
                  href={paper.file}
                >
                  View File
                </Link>
              )}
            </div>
          )}
          <Button
            disabled={isLoading}
            type="submit"
            className="bg-[#606C38] hover:bg-[#283618]"
          >
            {isLoading ? (
              <p>{progress}% loading...</p>
            ) : isEdit ? (
              "Edit Paper"
            ) : (
              "Add Paper"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ResearchPaperForm;
