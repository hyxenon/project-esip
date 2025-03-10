import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

const TotalResearchProposal = ({ count }: { count: number }) => {
  return (
    <Card className="flex-1 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Research Proposals
        </CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{count}</div>
        <div className="flex justify-between items-center">
          <p className="text-xs text-muted-foreground">
            +35.1% from last month
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TotalResearchProposal;
