import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface SchoolTableProps {
  children: any;
  cardTitle: string;
}

const SchoolTable = ({ children, cardTitle }: SchoolTableProps) => {
  return (
    <Card className="w-full bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 mt-8">
      <CardHeader className="font-bold text-xl">{cardTitle}</CardHeader>
      <CardContent className="flex flex-col px-2 md:px-6">
        {children}
      </CardContent>
    </Card>
  );
};

export default SchoolTable;
