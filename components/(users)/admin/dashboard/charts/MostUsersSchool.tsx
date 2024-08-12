"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { paper: "Philippine Science High School (Main Campus)", users: 211 },
  { paper: "Quezon City Science High School", users: 150 },
  { paper: "Manila Science High School", users: 237 },
  { paper: "Pateros National High School", users: 231 },
  { paper: "Makati Science High School", users: 173 },
  { paper: "Caloocan High School", users: 132 },
  { paper: "Pasay City Science High School", users: 156 },
  { paper: "Pasig City Science High School", users: 164 },
  { paper: "Taguig Science High School", users: 220 },
  { paper: "Marikina Science High School", users: 202 },
];

const chartConfig = {
  users: {
    label: "Users",
    color: "#283618",
  },
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig;

const MostUsersSchool = () => {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Most User Count by School</CardTitle>
        <div className="flex justify-between">
          <CardDescription>January - June 2024</CardDescription>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Last 6 Months" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="days">Last 30 Days</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last 1 Year</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="paper"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="users" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="users"
              layout="vertical"
              fill="var(--color-users)"
              radius={4}
            >
              <LabelList
                dataKey="paper"
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
              />
              <LabelList
                dataKey="users"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing 10 popular public papers for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
};

export default MostUsersSchool;
