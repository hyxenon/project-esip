"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Users,
  FileText,
  BarChart2,
  Clock,
  Calendar,
  Bell,
} from "lucide-react";
import { PieChartCard } from "@/components/(users)/teacher/dashboard/PieChartCard";
import { ResearchCategoryChart } from "@/components/(users)/teacher/dashboard/ResearchCategory";
import NewUsers from "@/components/(users)/admin/dashboard/recent-activity/NewUsers";
import RecentUsersCard from "@/components/(users)/teacher/dashboard/RecentUsersCard";

// Define chartData and labelConfig for PieChartCard
const teachersStudentsData = [
  { role: "Teachers", count: 20, fill: "#283618" },
  { role: "Students", count: 130, fill: "#606C38" },
];

const teachersStudentsLabels = [
  { name: "Teachers", color: "#283618" },
  { name: "Students", color: "#606C38" },
];

const teachersStudentsConfig = {
  teachers: {
    label: "Teachers",
    color: "#283618",
  },
  students: {
    label: "Students",
    color: "#606C38",
  },
};

// Define chartData and labelConfig for PieChartCard
const researchTypeData = [
  { role: "Proposals", count: 40, fill: "#283618" },
  { role: "Papers", count: 50, fill: "#606C38" },
];

const researchTypeLabels = [
  { name: "Proposals", color: "#283618" },
  { name: "Papers", color: "#606C38" },
];

const researchTypeConfig = {
  teachers: {
    label: "Proposals",
    color: "#283618",
  },
  students: {
    label: "Papers",
    color: "#606C38",
  },
};

const dashboardData = {
  totalUsers: 150,
  totalTeachers: 20,
  totalStudents: 130,
  totalResearchPapers: 75,
  totalResearchProposals: 50,
  papersByCategory: [
    { name: "Life Science", count: 30 },
    { name: "Physical Science", count: 25 },
    { name: "Science Expo", count: 15 },
    { name: "Robotics", count: 5 },
    { name: "Math", count: 5 },
  ],
  recentSubmissions: [
    {
      id: 1,
      title: "Effect of Climate Change on Local Flora",
      category: "Life Science",
      author: "Jane Doe",
      date: "2024-09-15",
    },
    {
      id: 2,
      title: "Advancements in Quantum Computing",
      category: "Physical Science",
      author: "John Smith",
      date: "2024-09-14",
    },
    {
      id: 3,
      title: "Innovative Recycling Methods",
      category: "Science Expo",
      author: "Emily Brown",
      date: "2024-09-13",
    },
  ],
  upcomingEvents: [
    { id: 1, title: "Science Fair", date: "2024-10-15" },
    { id: 2, title: "Parent-Teacher Conference", date: "2024-09-25" },
    { id: 3, title: "STEM Workshop", date: "2024-10-05" },
  ],
  studentProgress: [
    { name: "Completed", value: 65 },
    { name: "In Progress", value: 25 },
    { name: "Not Started", value: 10 },
  ],
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const TeacherDashboard = () => {
  return (
    <div className="py-4 px-3 md:px-8 lg:py-4 lg:px-16 xl:px-24  min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Teacher Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-6 mb-6">
        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Users
            </CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">
              {dashboardData.totalUsers}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Teachers: {dashboardData.totalTeachers} | Students:{" "}
              {dashboardData.totalStudents}
            </p>
            {/* Passing data and labels to PieChartCard */}
            <PieChartCard
              chartData={teachersStudentsData}
              labelConfig={teachersStudentsLabels}
              chartConfig={teachersStudentsConfig}
            />
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Papers
            </CardTitle>
            <FileText className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">
              {dashboardData.totalResearchPapers}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Proposals: {dashboardData.totalResearchProposals} | Papers:{" "}
              {dashboardData.totalResearchPapers}
            </p>
            <PieChartCard
              chartData={researchTypeData}
              labelConfig={researchTypeLabels}
              chartConfig={researchTypeConfig}
            />
          </CardContent>
        </Card>

        <Card className="bg-white md:col-span-2 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-700">
              Papers by Category
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dashboardData.papersByCategory}
                barCategoryGap="20%"
              >
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

                {/* Custom colored bars with rounded corners */}
                <Bar dataKey="count" radius={[10, 10, 0, 0]}>
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
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-semibold text-gray-700">
              Recent Added Papers
            </CardTitle>
            <Bell className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <ul className="divide-y divide-gray-200">
              {dashboardData.recentSubmissions.map((submission) => (
                <li key={submission.id} className="py-3">
                  <p className="font-semibold text-gray-800">
                    {submission.title}
                  </p>
                  <p className="text-sm text-gray-600">
                    {submission.category} - {submission.author}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Submitted on: {submission.date}
                  </p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <RecentUsersCard />
      </div>
    </div>
  );
};

export default TeacherDashboard;
