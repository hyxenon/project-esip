import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

interface SchoolTableProps {
  children: any;
  cardTitle: string;
}

const SchoolTable = ({ children, cardTitle }: SchoolTableProps) => {
  return (
    <Card className="w-full border-gray-300">
      <CardHeader className="font-bold text-xl">{cardTitle}</CardHeader>
      <CardContent className="flex flex-col">{children}</CardContent>
    </Card>
  );
};

export default SchoolTable;
