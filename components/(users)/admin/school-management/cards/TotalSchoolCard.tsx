import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RiSchoolLine } from "react-icons/ri";

const TotalSchoolCard = () => {
  return (
    <Card className="flex-1 border-[#B0B0B0]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Schools</CardTitle>
        <RiSchoolLine className="h-6 w-6 text-[#283618]" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">12</div>
        <p className="text-xs text-muted-foreground">+35.1% from last month</p>
      </CardContent>
    </Card>
  );
};

export default TotalSchoolCard;
