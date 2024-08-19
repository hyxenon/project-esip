import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaChalkboardTeacher } from "react-icons/fa";

const TotalTeacherCard = () => {
  return (
    <Card className="flex-1 border-[#A0A0A0]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
        <FaChalkboardTeacher className="h-6 w-6 text-[#283618]" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">23</div>
        <p className="text-xs text-muted-foreground">+5% from last month</p>
      </CardContent>
    </Card>
  );
};

export default TotalTeacherCard;
