import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MdSubscriptions } from "react-icons/md";
import React from "react";

const SubscriptionCard = () => {
  return (
    <Card className="flex-1 border-[#B0B0B0]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium ">Subscriptions</CardTitle>
        <MdSubscriptions className="h-5 w-5 text-[#283618]" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">+2350</div>
        <p className="text-xs text-muted-foreground">+180.1% from last month</p>
      </CardContent>
    </Card>
  );
};

export default SubscriptionCard;
