import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users } from "lucide-react";

const TotalResearchProposal = () => {
  return (
    <Card className="flex-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Research Proposals
        </CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">12</div>
        <div className="flex justify-between items-center">
          <p className="text-xs text-muted-foreground">
            +35.1% from last month
          </p>
          <Button variant={"outline"} size={"sm"}>
            View more
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TotalResearchProposal;
