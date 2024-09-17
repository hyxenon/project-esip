"use client";
import React from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  CalendarIcon,
  BookOpenIcon,
  UsersIcon,
  ArrowUpDown,
  BookmarkIcon,
  DownloadIcon,
  Share2Icon,
  EyeIcon,
  ExternalLinkIcon,
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

import CommentSection from "./CommentSection";
import { Session } from "next-auth";

interface PaperDetailsProps {
  paper1: any;
  session: Session;
}

export default function PaperDetails({ paper1, session }: PaperDetailsProps) {
  const handleCite = () => {
    // Implement citation functionality
  };

  const handleDownload = () => {
    // Implement download functionality
  };

  const handleShare = () => {
    // Implement share functionality
  };

  const handleSave = () => {
    // Implement save functionality
  };

  const handleComment = (comment: string) => {
    // Implement comment functionality
  };

  const formatAuthorName = (name: string) => {
    const nameParts = name.split(" ");
    const lastName = nameParts.pop();
    const initials = nameParts.map((part) => part[0]).join(". ") + ".";

    return `${initials} ${lastName}`;
  };

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <div className="container mx-auto p-4 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <Card className="mb-8 shadow-lg border-t-4 border-t-primary">
        <CardHeader className="space-y-6">
          <div className="space-y-2">
            <CardTitle className="text-4xl font-bold text-gray-800 leading-tight">
              {paper1.title}
            </CardTitle>
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
                {paper1.date.toLocaleDateString("en-US", options)}
              </div>
              <div className="flex items-center capitalize">
                <BookOpenIcon className="w-4 h-4 mr-2 text-primary" />
                Research {paper1.researchType}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {paper1.keywords.map((keyword: any, index: any) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors capitalize"
              >
                {keyword}
              </Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50 p-4 rounded-lg">
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSave}
                className="bg-white hover:bg-primary/10 transition-colors"
              >
                <BookmarkIcon className="w-4 h-4 mr-2 text-primary" />
                Save
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
                    {/* <div className="grid gap-2">
                      <Label htmlFor="apa">APA</Label>
                      <Input
                        id="apa"
                        value={`${paper.authors.join(", ")}. (${new Date(
                          paper.date
                        ).getFullYear()}). ${paper.title}. ${
                          paper.journal
                        }. https://doi.org/${paper.doi}`}
                        readOnly
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="mla">MLA</Label>
                      <Input
                        id="mla"
                        value={`${paper.authors[0].split(",")[0]}, et al. "${
                          paper.title
                        }." ${paper.journal}, ${new Date(
                          paper.date
                        ).getFullYear()}, https://doi.org/${
                          paper.doi
                        }. Accessed ${new Date().toLocaleDateString()}.`}
                        readOnly
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="chicago">Chicago</Label>
                      <Input
                        id="chicago"
                        value={`${paper.authors.join(", ")}. "${
                          paper.title
                        }." ${paper.journal} (${new Date(
                          paper.date
                        ).getFullYear()}). https://doi.org/${paper.doi}.`}
                        readOnly
                      />
                    </div> */}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm">
              <div className="flex items-center text-gray-600">
                <EyeIcon className="w-4 h-4 mr-2 text-primary" />
                {paper1.views} views
              </div>

              <Button
                variant="default"
                onClick={handleDownload}
                className="bg-primary text-white hover:bg-primary/90 transition-colors"
              >
                Download PDF
              </Button>
            </div>
          </div>

          <div className="space-y-8">
            {paper1.abstract && (
              <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                  Abstract
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {paper1.abstract}
                </p>
              </section>
            )}

            <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                Introduction
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {paper1.introduction}
              </p>
            </section>
            <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                References
              </h3>
              <p>{paper1.references}</p>
            </section>
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
