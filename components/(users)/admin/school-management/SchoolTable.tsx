import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import SchoolForm from "./SchoolForm";

interface SchoolTableProps {
  children: any;
  cardTitle: string;
}

const SchoolTable = ({ children, cardTitle }: SchoolTableProps) => {
  return (
    <Card className="w-full">
      <CardHeader className="font-bold text-xl">{cardTitle}</CardHeader>
      <CardContent className="flex flex-col gap-8">{children}</CardContent>
    </Card>
  );
};

export default SchoolTable;
