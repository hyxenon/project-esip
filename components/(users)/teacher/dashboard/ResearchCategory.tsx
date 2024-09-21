"use client";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ResearchCategoryProps {
  lifeScience: number;
  physicalScience: number;
  scienceExpo: number;
  robotics: number;
  math: number;
}

const ResearchCategory = ({
  lifeScience,
  physicalScience,
  scienceExpo,
  robotics,
  math,
}: ResearchCategoryProps) => {
  const dashboardData = {
    papersByCategory: [
      { name: "Life Science", count: lifeScience },
      { name: "Physical Science", count: physicalScience },
      { name: "Science Expo", count: scienceExpo },
      { name: "Robotics", count: robotics },
      { name: "Math", count: math },
    ],
  };

  // Check if all categories have zero data
  const allZeroData = dashboardData.papersByCategory.every(
    (category) => category.count === 0
  );

  if (allZeroData) {
    return (
      <div className="text-center text-gray-500">
        <p>No research papers available for any category.</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={dashboardData.papersByCategory} barCategoryGap="20%">
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="#e0e0e0"
        />
        <XAxis
          dataKey="name"
          tick={{ fill: "#333", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: "#333", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "8px",
            fontSize: 12,
          }}
        />

        {/* Custom colored bars with rounded corners and minimal bar height for zero values */}
        <Bar dataKey="count" radius={[10, 10, 0, 0]} minPointSize={5}>
          {dashboardData.papersByCategory.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={
                ["#606C38", "#283618", "#FEFAE0", "#DDA15E", "#BC6C25"][
                  index % 5
                ]
              }
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ResearchCategory;
