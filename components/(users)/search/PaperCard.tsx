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
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ResearchPaperModel } from "@/models/models";
import {
  ArrowUpDown,
  BookmarkIcon,
  BookOpenIcon,
  BrainIcon,
  CalendarIcon,
  DownloadIcon,
  LightbulbIcon,
  MapIcon,
  UsersIcon,
} from "lucide-react";
import React from "react";

interface PaperCardProps {
  paper: ResearchPaperModel;
}

const PaperCard = ({ paper }: PaperCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-blue-600 hover:underline cursor-pointer">
          title
        </CardTitle>
        <div className="flex items-center text-sm text-gray-600 mt-2">
          <UsersIcon className="w-4 h-4 mr-2" />
          authors
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <CalendarIcon className="w-4 h-4 mr-2" />
          date
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <BookOpenIcon className="w-4 h-4 mr-2" />
          journal
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <MapIcon className="w-4 h-4 mr-2" />
          school
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-20 mb-4">
          <div className="flex flex-wrap gap-2">category</div>
        </ScrollArea>

        <div className="text-xs text-gray-500 mb-2">
          <span className="font-semibold">References:</span> paper references
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-green-600">
            <LightbulbIcon className="w-4 h-4 mr-2" />
            Views: 0
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
                <Input id="apa" className="col-span-3" readOnly />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="mla" className="text-right">
                  MLA
                </Label>
                <Input id="mla" className="col-span-3" readOnly />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="chicago" className="text-right">
                  Chicago
                </Label>
                <Input id="chicago" className="col-span-3" readOnly />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default PaperCard;
