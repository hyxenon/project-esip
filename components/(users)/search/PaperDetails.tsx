"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  UsersIcon,
  BookmarkIcon,
  DownloadIcon,
  EyeIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FaLock } from "react-icons/fa";
import CommentSection from "./CommentSection";
import { Session } from "next-auth";
import { getDownloadUrl } from "@edgestore/react/utils";
import { ClipLoader } from "react-spinners";
import { handlePurchase } from "@/actions/paymongo.action";
import { LuBookOpen, LuBookOpenCheck } from "react-icons/lu";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import { savePaper, unsavePaper } from "@/actions/paperManagement.action";

interface PaperDetailsProps {
  paper1: any;
  session: Session;
  isPublic: boolean;
  isPaid: boolean;
  userSavedPapers: string[];
}

export default function PaperDetails({
  paper1,
  session,
  isPublic,
  isPaid,
  userSavedPapers,
}: PaperDetailsProps) {
  const [isPaymentLoading, setIsPaymentLoading] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    if (userSavedPapers.includes(paper1.id)) {
      setIsSaved(true);
    }
  }, [userSavedPapers, paper1.id]);

  const handleSaveClick = async () => {
    try {
      if (isSaved) {
        await unsavePaper(session?.user?.id!, paper1.id);
        setIsSaved(false);
        toast({
          variant: "success",
          title: "Paper unsaved successfully.",
        });
      } else {
        await savePaper(session?.user?.id!, paper1.id);
        setIsSaved(true);
        toast({
          variant: "success",
          title: "Paper saved successfully.",
        });
      }
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: `Error saving paper: ${err.message}`,
      });
    }
  };

  const paymentOnClick = async () => {
    const priceAmount = paper1.price * 100;
    const url = "https://api.paymongo.com/v1/links";
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: "Basic c2tfdGVzdF9iQXZrQnRYemNBOEVjSHlxYTl1YVNTOFE6",
      },

      body: JSON.stringify({
        data: {
          attributes: { amount: priceAmount, description: paper1.title },
        },
      }),
    };

    fetch(url, options)
      .then((res) => res.json())
      .then(async (json) => {
        window.open(json.data.attributes.checkout_url, "_blank");
        setIsPaymentLoading(true);
        await handlePurchase(session.user?.id!, paper1.id, json.data.id);
      })
      .catch((err) => console.error("error:" + err));
  };

  const handleDownloadPDF = async () => {
    if (paper1.file) {
      const fileUrl = getDownloadUrl(paper1.file, `${paper1.title}.pdf`);

      const a = document.createElement("a");
      a.href = fileUrl;

      document.body.appendChild(a);

      a.click();

      document.body.removeChild(a);
    }
  };

  const formatAuthorName = (name: string) => {
    const nameParts = name.split(" ");
    const lastName = nameParts.pop();
    const initials = nameParts.map((part) => part[0]).join(". ") + ".";

    return `${initials} ${lastName}`;
  };

  // Helper function to format author names with initials
  const formatAuthorNameWithInitials = (name: string) => {
    const nameParts = name.split(" ");
    const lastName = nameParts.pop(); // Get the last name
    const capitalizedLastName = lastName
      ? lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase()
      : "";
    const initials = nameParts
      .map((part) => part[0].toUpperCase() + ".")
      .join(" ");
    return `${capitalizedLastName}, ${initials}`;
  };

  const formatAuthorsForCitation = (authors: any[]) => {
    const authorNames = authors.map((author) =>
      formatAuthorNameWithInitials(author.name)
    );
    if (authorNames.length === 1) {
      return authorNames[0];
    } else if (authorNames.length === 2) {
      return `${authorNames[0]} & ${authorNames[1]}`;
    } else {
      return `${authorNames[0]}, et al.`;
    }
  };

  const getApaCitation = () => {
    if (paper1.authors && paper1.authors.length > 0) {
      return `${formatAuthorsForCitation(paper1.authors)} (${new Date(
        paper1.date
      ).getFullYear()}). ${paper1.title}.`;
    }
    return `No authors available (${new Date(paper1.date).getFullYear()}). ${
      paper1.title
    }.`;
  };

  const getChicagoCitation = () => {
    if (paper1.authors && paper1.authors.length > 0) {
      return `${paper1.authors
        .map((author: any) => formatAuthorNameWithInitials(author.name))
        .join(", ")} "${paper1.title}." (${new Date(
        paper1.date
      ).getFullYear()}).`;
    }
    return `No authors available "${paper1.title}." (${new Date(
      paper1.date
    ).getFullYear()}).`;
  };

  const getMlaCitation = () => {
    if (paper1.authors && paper1.authors.length > 0) {
      const firstAuthorLastName = paper1.authors[0].name.split(" ").pop();
      return `${firstAuthorLastName}, et al. "${paper1.title}," ${new Date(
        paper1.date
      ).getFullYear()}.`;
    }
    return `No authors available. "${paper1.title}," ${new Date(
      paper1.date
    ).getFullYear()}.`;
  };

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <div className="px-1 md:container py-2 lg:mt-12  min-h-screen">
      <Card className="mb-8 shadow-lg border-t-4 border-t-[#606C38]">
        <CardHeader className="space-y-6">
          <div className="space-y-2">
            <CardTitle className="text-4xl font-bold text-gray-800 leading-tight">
              {paper1.title}
            </CardTitle>
            <div className="flex flex-wrap gap-2 items-center">
              <Image
                src={paper1.user.school.image}
                alt="school logo"
                height={30}
                width={30}
                className="rounded-full -ml-1.5"
              />
              <p className="text-sm text-gray-600">
                {paper1.user.school.schoolName}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              {paper1.authors && paper1.authors.length > 0 && (
                <div className="flex items-center">
                  <UsersIcon className="w-4 h-4 mr-2" />
                  {paper1.authors.map((author: any, index: any) => (
                    <span key={index} className="capitalize mx-0.5">
                      {formatAuthorName(author.name)}
                      {index < paper1.authors!.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center">
                <CalendarIcon className="w-4 h-4 mr-2 text-primary" />
                {new Date(paper1.date).toLocaleDateString("en-US", options)}
              </div>
              <div className="flex items-center capitalize">
                {paper1.researchType === "proposal" ? (
                  <LuBookOpen className="text-[#BC6C25] mr-2" />
                ) : (
                  <LuBookOpenCheck className="text-[#283618] mr-2" />
                )}
                <p
                  className={`capitalize ${
                    paper1.researchType === "proposal"
                      ? "text-[#BC6C25]"
                      : "text-[#283618]"
                  }`}
                >
                  Research {paper1.researchType}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {paper1.keywords.map((keyword: any, index: any) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-[#606C38] text-white hover:bg-[#BC6C25] transition-colors capitalize"
              >
                {keyword}
              </Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent className="space-y-8 px-0 md:px-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50 p-4 rounded-lg">
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSaveClick}
                className="bg-white hover:bg-primary/10 transition-colors"
              >
                <BookmarkIcon className="w-4 h-4 mr-2 text-primary" />
                {isSaved ? "Unsave" : "Save"}
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white hover:bg-primary/10 transition-colors"
                  >
                    <DownloadIcon className="w-4 h-4 mr-2 text-primary" />
                    Cite
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Citation Formats</DialogTitle>
                    <DialogDescription>
                      Choose a citation format to copy or download.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="apa" className="text-right">
                        APA
                      </Label>
                      <Input
                        id="apa"
                        className="col-span-3"
                        readOnly
                        value={getApaCitation()}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="mla" className="text-right">
                        MLA
                      </Label>
                      <Input
                        id="mla"
                        className="col-span-3"
                        readOnly
                        value={getMlaCitation()}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="chicago" className="text-right">
                        Chicago
                      </Label>
                      <Input
                        id="chicago"
                        className="col-span-3"
                        readOnly
                        value={getChicagoCitation()}
                      />
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm">
              <div className="flex items-center text-[#606C38]">
                <EyeIcon className="w-4 h-4 mr-2 " />
                {paper1.uniqueViews} views
              </div>

              {paper1.file &&
              (isPublic || isPaid || session.user?.role === "ADMIN") ? (
                <Button
                  variant="default"
                  className="bg-[#BC6C25] hover:bg-[#DDA15E] transition-all"
                  onClick={handleDownloadPDF}
                >
                  Download PDF
                </Button>
              ) : isPaymentLoading ? (
                <Badge className="flex gap-2 items-center bg-[#BC6C25] hover:bg-[#BC6C25]">
                  <p>Processing</p>
                  <ClipLoader size={20} color="#FEFAE0" />
                </Badge>
              ) : paper1.price < 100 ? (
                <Badge className="bg-[#BC6C25] hover:bg-[#DDA15E] transition-all py-2 px-4">
                  {!paper1.file && !isPublic && <FaLock className="mr-2" />}

                  {!paper1.file && isPublic
                    ? "No PDF available"
                    : "Private Paper"}
                </Badge>
              ) : (
                <>
                  {paper1.file ? (
                    <Button
                      onClick={paymentOnClick}
                      className="bg-[#BC6C25] hover:bg-[#DDA15E] transition-all"
                    >
                      <span>
                        <FaLock className="mr-2" />
                      </span>
                      Purchase File
                    </Button>
                  ) : (
                    <Badge className="bg-[#BC6C25] hover:bg-[#DDA15E] transition-all py-2 px-4">
                      No PDF file
                    </Badge>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="space-y-8">
            {paper1.abstract && (
              <section className="bg-white px-2 md:p-6 md:rounded-lg md:shadow-sm md:border md:border-gray-100 text-justify">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                  Abstract
                </h3>
                <div className="text-gray-700 leading-relaxed">
                  {paper1.abstract
                    .split("\n")
                    .map((paragraph: string, index: number) => (
                      <p key={index} className="mb-8">
                        {paragraph}
                      </p>
                    ))}
                </div>
              </section>
            )}

            {paper1.introduction && (
              <section className="bg-white px-2 md:p-6 md:rounded-lg md:shadow-sm md:border md:border-gray-100 text-justify">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                  Introduction
                </h3>
                <div className="text-gray-700 leading-relaxed">
                  {paper1.introduction
                    .split("\n")
                    .map((paragraph: string, index: number) => (
                      <p key={index} className="mb-8">
                        {paragraph}
                      </p>
                    ))}
                </div>
              </section>
            )}

            {paper1.references && (
              <section className="bg-white px-2 md:p-6 md:rounded-lg md:shadow-sm md:border md:border-gray-100 text-justify">
                <h3 className="text-2xl font-semibold mb-4 text-gray-700">
                  References
                </h3>
                <div className="leading-relaxed">
                  {paper1.references
                    .split("\n")
                    .map((paragraph: string, index: number) => (
                      <p key={index} className="mb-4">
                        {paragraph}
                      </p>
                    ))}
                </div>
              </section>
            )}
          </div>

          <Separator className="my-8" />

          <div className="space-y-6">
            <CommentSection
              comments={paper1.comments}
              session={session}
              paperId={paper1.id}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
