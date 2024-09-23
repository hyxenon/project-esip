"use client";

import { Pie, PieChart, Cell } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Define the types for the props
interface ChartData {
  role: string;
  count: number;
  fill: string;
}

interface LabelConfig {
  name: string;
  color: string;
}

interface ChartConfig {
  [key: string]: {
    label: string;
    color: string;
  };
}

interface PieChartCardProps {
  chartData: ChartData[];
  labelConfig: LabelConfig[];
  chartConfig: ChartConfig; // Adding the chartConfig as a prop
}

// Reusable PieChartCard Component
export function PieChartCard({
  chartData,
  labelConfig,
  chartConfig,
}: PieChartCardProps) {
  // Check if all chartData counts are 0
  const allZeroData = chartData.every((data) => data.count === 0);

  if (allZeroData) {
    return (
      <div className="text-center text-gray-500 mt-8">
        <p>No data available for the chart.</p>
      </div>
    );
  }

  return (
    <>
      <ChartContainer
        config={chartConfig} // Pass the config prop here
        className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
      >
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          <Pie data={chartData} dataKey="count" label nameKey="role">
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>

      {/* Dynamic labels section */}
      <div className="flex mt-4 space-x-4 justify-center">
        {labelConfig.map((label, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: label.color }}
            ></div>
            <span className="text-sm font-medium">{label.name}</span>
          </div>
        ))}
      </div>
    </>
  );
}
