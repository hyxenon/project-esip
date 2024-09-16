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

interface PaperDetailsProps {
  paper1: any;
}

export default function PaperDetails({ paper1 }: PaperDetailsProps) {
  // In a real application, you would fetch the paper details based on the ID
  const paper = {
    id: "test",
    title:
      "The Effects of Climate Change on Biodiversity: A Global Perspective",
    authors: ["J. Smith", "A. Johnson", "M. Williams"],
    date: "2023-06-15",
    journal: "Nature Climate Change",
    doi: "10.1038/s41558-023-01754-y",
    abstract:
      "Climate change poses an unprecedented threat to global biodiversity. This paper presents a meta-analysis of over 1000 studies, synthesizing data from diverse ecosystems worldwide. We identify key vulnerability factors and propose a framework for prioritizing conservation efforts. Our findings underscore the interconnectedness of climate systems and biodiversity, calling for integrated approaches to environmental policy and management.",
    introduction:
      "The rapid acceleration of climate change in recent decades has raised significant concerns about its impact on global biodiversity. As temperatures rise, precipitation patterns shift, and extreme weather events become more frequent, ecosystems worldwide are experiencing unprecedented stress. This paper aims to provide a comprehensive analysis of the effects of climate change on biodiversity, drawing from a vast array of studies conducted across different biomes and taxonomic groups.",
    references: [
      "Brown, A. et al. (2020). Climate velocity reveals increasing exposure of deep-ocean biodiversity to future warming. Nature Climate Change, 10(6), 576-581.",
      "Lee, C. & Park, Y. (2021). Global patterns of extinction risk in marine and non-marine systems. Current Biology, 31(9), 1867-1873.",
      "Garcia, R. A. et al. (2022). Multiple dimensions of climate change and their implications for biodiversity. Science, 344(6183), 1247579.",
    ],
    tags: [
      "Climate Change",
      "Biodiversity",
      "Conservation",
      "Global Ecology",
      "Meta-analysis",
    ],
    citedBy: 45,
    views: 1203,
    downloads: 87,
    institution: "University of California, Berkeley",
    country: "United States",
    impactFactor: 4.8,
    openAccess: true,
    pdfUrl: "/path/to/paper.pdf",
    comments: [
      {
        id: 1,
        user: "Dr. Emily Chen",
        text: "Excellent meta-analysis! The comprehensive approach really strengthens the conclusions.",
        timestamp: "2023-06-15T10:30:00Z",
      },
      {
        id: 2,
        user: "Prof. David Mueller",
        text: "I wonder how these findings might be applied to specific conservation strategies in highly vulnerable areas?",
        timestamp: "2023-06-16T14:45:00Z",
      },
    ],
  };

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
                      {index < paper.authors!.length - 1 ? ", " : ""}
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
                    <div className="grid gap-2">
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
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm">
              <div className="flex items-center text-gray-600">
                <EyeIcon className="w-4 h-4 mr-2 text-primary" />
                {paper.views} views
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
            <h3 className="text-2xl font-semibold text-gray-800">Comments</h3>
            <div className="space-y-4">
              {paper.comments.map((comment) => (
                <Card
                  key={comment.id}
                  className="bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage
                          src={`https://api.dicebear.com/6.x/initials/svg?seed=${comment.user}`}
                        />
                        <AvatarFallback>
                          {comment.user
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-sm font-semibold text-gray-800">
                          {comment.user}
                        </CardTitle>
                        <p className="text-xs text-gray-500">
                          {new Date(comment.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700">{comment.text}</p>
                  </CardContent>
                </Card>
              ))}
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-800">
                    Add a Comment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const comment = (e.target as HTMLFormElement).comment
                        .value;
                      handleComment(comment);
                      (e.target as HTMLFormElement).reset();
                    }}
                    className="space-y-4"
                  >
                    <Textarea
                      name="comment"
                      placeholder="Share your thoughts on this paper..."
                      className="min-h-[100px] border-gray-200 focus:border-primary focus:ring-primary"
                    />
                    <Button
                      type="submit"
                      className="bg-primary text-white hover:bg-primary/90 transition-colors"
                    >
                      Post Comment
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
