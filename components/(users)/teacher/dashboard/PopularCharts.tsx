"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Define types for props to make the component reusable
interface ReusableChartProps {
  data: { [key: string]: any }[]; // Accepts dynamic data
  dataKeyX: string; // X-axis key (e.g., "views" or "count")
  dataKeyY: string; // Y-axis key (e.g., "paper" or "keyword")
  barColor?: string; // Customizable bar color (optional)
}

const chartConfig = {
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig;

export function PopularCharts({
  data,
  dataKeyX,
  dataKeyY,
  barColor = "var(--color-views)", // Default color for bars
}: ReusableChartProps) {
  return (
    <ChartContainer config={chartConfig}>
      {data.length === 0 ? ( // Check if data is empty
        <div className="flex justify-center items-center h-48">
          <p className="text-gray-500">No data available</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{
              left: 0,
              right: 16,
            }}
            className="-ml-14"
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey={dataKeyY}
              type="category"
              tick={false}
              axisLine={false}
              tickLine={false}
            />
            <XAxis
              dataKey={dataKeyX}
              type="number"
              tick={false}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar dataKey={dataKeyX} fill={barColor} radius={4}>
              <LabelList
                dataKey={dataKeyY}
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
              />
              <LabelList
                dataKey={dataKeyX}
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </ChartContainer>
  );
}
