import { Activity } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ActiveSchoolCard = () => {
  return (
    <Card className="flex-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Active Now</CardTitle>
        <Activity className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">+573</div>
        <p className="text-xs text-muted-foreground">+201 since last month</p>
      </CardContent>
    </Card>
  );
};

export default ActiveSchoolCard;
