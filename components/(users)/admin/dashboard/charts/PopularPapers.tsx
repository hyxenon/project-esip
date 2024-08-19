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
  { paper: "Predictive Healthcare Analytics Platform", likes: 400 },
  { paper: "Autonomous Drone Navigation System", likes: 305 },
  { paper: "Blockchain-Based Supply Chain Management", likes: 237 },
  { paper: "Natural Language Processing for Customer Service", likes: 173 },
  { paper: "Augmented Reality Museum Guide", likes: 231 },
  { paper: "Smart Home Energy Management System", likes: 245 },
  { paper: "Financial Portfolio Optimization Tool", likes: 252 },
  { paper: "Virtual Reality Training Simulator", likes: 232 },
  { paper: "E-commerce Personalization Engine", likes: 220 },
  { paper: "Smart Traffic Management System", likes: 209 },
];

const chartConfig = {
  likes: {
    label: "Likes",
    color: "#283618",
  },
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig;

const PopularPapers = () => {
  return (
    <Card className="border-[#A0A0A0]">
      <CardHeader>
        <CardTitle>Top 10 Popular Public Papers</CardTitle>
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
            <XAxis dataKey="likes" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="likes"
              layout="vertical"
              fill="var(--color-likes)"
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
                dataKey="likes"
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

export default PopularPapers;
