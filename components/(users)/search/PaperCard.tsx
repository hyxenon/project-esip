import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ResearchPaperModel } from "@/models/models";
import {
  BookmarkIcon,
  BookOpenIcon,
  CalendarIcon,
  DownloadIcon,
  EyeIcon,
  LightbulbIcon,
  MapIcon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";

interface PaperCardProps {
  paper: ResearchPaperModel;
}

const PaperCard = ({ paper }: PaperCardProps) => {
  const formatAuthorName = (name: string) => {
    const nameParts = name.split(" ");
    const lastName = nameParts.pop();
    const initials = nameParts.map((part) => part[0]).join(". ") + ".";

    return `${initials} ${lastName}`;
  };

  const formatAuthorNameWithInitials = (name: string) => {
    const nameParts = name.split(" ");
    const lastName = nameParts.pop(); // Get the last name
    const capitalizedLastName = lastName
      ? lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase()
      : ""; // Capitalize only the first letter
    const initials = nameParts
      .map((part) => part[0].toUpperCase() + ".")
      .join(" ");
    return `${capitalizedLastName}, ${initials}`;
  };

  const formatAuthorsForCitation = (authors: string[]) => {
    const formattedAuthors = authors.map((author) =>
      formatAuthorNameWithInitials(author)
    );
    if (formattedAuthors.length === 1) {
      return formattedAuthors[0];
    } else if (formattedAuthors.length === 2) {
      return `${formattedAuthors[0]} & ${formattedAuthors[1]}`;
    } else {
      return `${formattedAuthors[0]}, et al.`;
    }
  };

  const getApaCitation = () => {
    if (paper.authors && paper.authors.length > 0) {
      const authorNames = paper.authors.map((author) => author.name); // Extract author names
      return `${formatAuthorsForCitation(
        authorNames
      )} (${paper.date.getFullYear()}). ${paper.title}.`;
    }
    return `No authors available (${paper.date.getFullYear()}). ${
      paper.title
    }.`;
  };

  const getChicagoCitation = () => {
    if (paper.authors && paper.authors.length > 0) {
      const authorNames = paper.authors.map((author) => author.name); // Extract author names
      return `${authorNames.map(formatAuthorNameWithInitials).join(", ")} "${
        paper.title
      }." (${paper.date.getFullYear()}).`;
    }
    return `No authors available "${
      paper.title
    }." (${paper.date.getFullYear()}).`;
  };

  const getMlaCitation = () => {
    if (paper.authors && paper.authors.length > 0) {
      const firstAuthorLastName = paper.authors[0].name.split(" ").pop(); // Get the last name of the first author
      return `${firstAuthorLastName}, et al. "${
        paper.title
      }," ${paper.date.getFullYear()}.`;
    }
    return `No authors available "${
      paper.title
    }," ${paper.date.getFullYear()}.`;
  };

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-[#283618] hover:underline cursor-pointer">
          <Link href={`/search/${paper.id}`}>{paper.title}</Link>
        </CardTitle>
        <div className="flex items-center text-sm text-gray-600 mt-2">
          {paper.authors && paper.authors.length > 0 && (
            <div className="flex items-center text-sm text-gray-600 mt-2">
              <UsersIcon className="w-4 h-4 mr-2" />
              {paper.authors.map((author, index) => (
                <span key={index} className="capitalize mx-0.5">
                  {formatAuthorName(author.name)}
                  {index < paper.authors!.length - 1 ? ", " : ""}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <CalendarIcon className="w-4 h-4 mr-2" />
          {paper.date.toLocaleDateString("en-US", options)}
        </div>
        <div className="flex items-center text-sm text-gray-600 capitalize">
          <BookOpenIcon className="w-4 h-4 mr-2" />
          Research {paper.researchType}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <MapIcon className="w-4 h-4 mr-2" />
          {paper.user.school.schoolName}
        </div>
      </CardHeader>
      <CardContent>
        <div className="line-clamp-2">
          {paper.abstract ? paper.abstract : paper.introduction}
        </div>

        <div className="text-xs text-gray-500 mb-2">
          <span className="font-semibold">Keywords:</span>{" "}
          {paper.keywords !== undefined
            ? paper.keywords.join(", ")
            : "No keywords"}
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-green-600">
            <EyeIcon className="w-4 h-4 mr-1 " />
            Views: {paper.uniqueViews}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm">
                <BookmarkIcon className="w-4 h-4 mr-2" />
                Save
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Save this paper to your library</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <DownloadIcon className="w-4 h-4 mr-2" />
              Cite
            </Button>
          </DialogTrigger>
          <DialogContent>
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
      </CardFooter>
    </Card>
  );
};

export default PaperCard;
