import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PaperItemModel } from "@/models/models";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import Image from "next/image";
import React from "react";

type PaperItemProps = {
  paperTitle: string;
};

const PaperItem = ({ paperTitle }: PaperItemProps) => {
  return (
    <Popover>
      <PopoverTrigger className="cursor-pointer text-start">
        <li className="text-sm">{paperTitle}</li>
      </PopoverTrigger>
      <PopoverContent className="">
        <Card className="flex flex-col gap-y-2 p-4 text-sm">
          <p>Authors</p>
          <div>
            <p>Justine Edward Santos</p>
          </div>
          <div>
            <p>Justine Edward Santos</p>
          </div>
        </Card>
      </PopoverContent>
    </Popover>
  );
};

type CurrentPaperCardProps = {
  cardTitle: string;
  data: PaperItemModel[];
};

const CurrentPaperCard = ({ cardTitle, data }: CurrentPaperCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{cardTitle}</CardTitle>
        <CardDescription>School Year 2024 - 2025</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {data.map((paper) => (
          <PaperItem paperTitle={paper.title} key={paper.id} />
        ))}
      </CardContent>
    </Card>
  );
};

export default CurrentPaperCard;
