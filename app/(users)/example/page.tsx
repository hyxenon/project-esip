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
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Teacher Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
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
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Research Papers
            </CardTitle>
            <FileText className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">
              {dashboardData.totalResearchPapers}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Proposals: {dashboardData.totalResearchProposals}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Top Category
            </CardTitle>
            <BarChart2 className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">
              {dashboardData.papersByCategory[0].name}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {dashboardData.papersByCategory[0].count} papers
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Recent Activity
            </CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">
              {dashboardData.recentSubmissions.length}
            </div>
            <p className="text-xs text-gray-500 mt-1">New submissions today</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-700">
              Papers by Category
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dashboardData.papersByCategory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-700">
              Student Progress Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dashboardData.studentProgress}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {dashboardData.studentProgress.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-semibold text-gray-700">
              Recent Submissions
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

        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-semibold text-gray-700">
              Upcoming Events
            </CardTitle>
            <Calendar className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <ul className="divide-y divide-gray-200">
              {dashboardData.upcomingEvents.map((event) => (
                <li key={event.id} className="py-3">
                  <p className="font-semibold text-gray-800">{event.title}</p>
                  <p className="text-sm text-gray-600">Date: {event.date}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherDashboard;
