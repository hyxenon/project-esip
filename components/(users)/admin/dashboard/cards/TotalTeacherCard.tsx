import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaChalkboardTeacher } from "react-icons/fa";

const TotalTeacherCard = () => {
  return (
    <Card className="flex-1 border-[#B0B0B0]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
        <FaChalkboardTeacher className="h-5 w-5 text-[#283618]" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">23</div>
        <p className="text-xs text-muted-foreground">+5% from last month</p>
      </CardContent>
    </Card>
  );
};

export default TotalTeacherCard;
