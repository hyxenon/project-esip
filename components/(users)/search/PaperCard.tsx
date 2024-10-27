import { savePaper, unsavePaper } from "@/actions/paperManagement.action";
import { BiCategory } from "react-icons/bi";
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
import { useToast } from "@/components/ui/use-toast";
import { ResearchPaperModel } from "@/models/models";
import {
  BookmarkIcon,
  CalendarIcon,
  DownloadIcon,
  EyeIcon,
  UsersIcon,
} from "lucide-react";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LuBookOpen, LuBookOpenCheck } from "react-icons/lu";

interface PaperCardProps {
  paper: ResearchPaperModel;
  session: Session;
  userSavedPapers: string[];
}

const PaperCard = ({ paper, session, userSavedPapers }: PaperCardProps) => {
  const formatAuthorName = (name: string) => {
    const nameParts = name.split(" ");
    const lastName = nameParts.pop();
    const initials = nameParts.map((part) => part[0]).join(". ") + ".";

    return `${initials} ${lastName}`;
  };

  const [isSaved, setIsSaved] = useState<boolean>(false);
  useEffect(() => {
    if (userSavedPapers.includes(paper.id!)) {
      setIsSaved(true);
    }
  }, [userSavedPapers, paper.id]);

  const { toast } = useToast();

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

  const handleSaveClick = async () => {
    try {
      if (isSaved) {
        await unsavePaper(session?.user?.id!, paper.id!);
        setIsSaved(false);
        toast({
          variant: "success",
          title: "Paper unsaved successfully.",
        });
      } else {
        await savePaper(session?.user?.id!, paper.id!);
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

  return (
    <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-t-[#606C38]">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-[#283618] hover:underline cursor-pointer">
          <Link href={`/search/${paper.id}`}>{paper.title}</Link>
        </CardTitle>
        <div className="flex items-center text-sm text-gray-600 pt-3 -ml-1">
          <Image
            src={paper.user.school.image}
            alt="school logo"
            height={24}
            width={24}
            className="rounded-full mr-2"
          />
          {paper.user.school.schoolName}
        </div>
        <div className="flex items-center text-sm text-gray-600 capitalize">
          {paper.researchType === "proposal" ? (
            <LuBookOpen className="text-[#BC6C25] mr-2" />
          ) : (
            <LuBookOpenCheck className="text-[#283618] mr-2" />
          )}
          <p
            className={`capitalize ${
              paper.researchType === "proposal"
                ? "text-[#BC6C25]"
                : "text-[#283618]"
            }`}
          >
            Research {paper.researchType}
          </p>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          {paper.authors && paper.authors.length > 0 ? (
            <div className="flex flex-wrap items-center text-sm text-gray-600">
              <UsersIcon className="w-4 h-4 mr-2" />
              {paper.authors.map((author, index) => (
                <span
                  key={index}
                  className="capitalize whitespace-nowrap mx-0.5"
                >
                  {formatAuthorName(author.name)}
                  {index < paper.authors!.length - 1 ? ", " : ""}
                </span>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap items-center">
              <UsersIcon className="w-4 h-4 mr-2" />
              <p>No authors.</p>
            </div>
          )}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <CalendarIcon className="w-4 h-4 mr-2" />
          {paper.date.toLocaleDateString("en-US", options)}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <BiCategory className="w-4 h-4 mr-2" />
          <span className="capitalize">{paper.researchCategory}</span>
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
              <Button onClick={handleSaveClick} variant="outline" size="sm">
                <BookmarkIcon className="w-4 h-4 mr-2" />
                {isSaved ? "Unsave" : "Save"}
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-[#606C38]">
              <p>
                {isSaved
                  ? "Remove from your library"
                  : "Save this paper to your library"}
              </p>
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
