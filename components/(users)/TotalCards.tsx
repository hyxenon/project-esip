import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TotalCardsProps {
  children: any;
  cardTitle: string;
  cardTotalNumber: number;
}

const TotalCards = ({
  children,
  cardTitle,
  cardTotalNumber,
}: TotalCardsProps) => {
  return (
    <Card className="flex-1 border-gray-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{cardTitle}</CardTitle>
        {children}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{cardTotalNumber}</div>
        <p className="text-xs text-muted-foreground">+35.1% from last month</p>
      </CardContent>
    </Card>
  );
};

export default TotalCards;
