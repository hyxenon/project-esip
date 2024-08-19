import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { PiStudentFill } from "react-icons/pi";
const TotalStudentsCard = () => {
  return (
    <Card className="flex-1 border-[#B0B0B0]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Students</CardTitle>
        <PiStudentFill className="h-6 w-6 text-[#283618]" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">100</div>
        <p className="text-xs text-muted-foreground">+180.1% from last month</p>
      </CardContent>
    </Card>
  );
};

export default TotalStudentsCard;
