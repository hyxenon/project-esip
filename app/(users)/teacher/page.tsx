import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RecentUsersCard from "@/components/(users)/teacher/dashboard/RecentUsersCard";
import ChartsContainer from "@/components/(users)/teacher/dashboard/ChartsContainer";
import { Bell } from "lucide-react";

const dashboardData = {
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
};

const TeacherDashboard = async () => {
  return (
    <div className="py-4 px-3 md:px-8 lg:py-4 lg:px-16 xl:px-24  min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Teacher Dashboard
      </h1>

      {/* Charts component */}
      <ChartsContainer />

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
