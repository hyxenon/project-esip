import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import SchoolForm from "./SchoolForm";

interface SchoolTableProps {
  children: any;
  cardTitle: string;
}

const SchoolTable = ({ children, cardTitle }: SchoolTableProps) => {
  return (
    <Card className="flex-1">
      <CardHeader className="font-bold text-xl">{cardTitle}</CardHeader>
      <CardContent className="flex gap-8">{children}</CardContent>
    </Card>
  );
};

export default SchoolTable;
