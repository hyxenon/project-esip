import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users } from "lucide-react";
import React, { Suspense } from "react";
import { PieChartCard } from "./PieChartCard";
import ResearchCategory from "./ResearchCategory";
import { getTotalCountTeacherDashboard } from "@/actions/totalCount.action";
import { auth } from "@/auth";

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

const ChartsContainer = async () => {
  const session = await auth();
  const dashboardData = await getTotalCountTeacherDashboard(
    session?.user?.schoolId!
  );

  // Define chartData and labelConfig for PieChartCard
  const researchTypeData = [
    {
      role: "Proposals",
      count: dashboardData.totalResearchProposalCount,
      fill: "#283618",
    },
    {
      role: "Papers",
      count: dashboardData.totalResearchPaperCount,
      fill: "#606C38",
    },
  ];

  // Define chartData and labelConfig for PieChartCard
  const teachersStudentsData = [
    { role: "Teachers", count: dashboardData.totalTeachers, fill: "#283618" },
    { role: "Students", count: dashboardData.totalStudents, fill: "#606C38" },
  ];

  return (
    <Suspense fallback={<p>loading...</p>}>
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
              {dashboardData.totalResearchProposalCount +
                dashboardData.totalResearchPaperCount}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Proposals: {dashboardData.totalResearchProposalCount} | Papers:{" "}
              {dashboardData.totalResearchPaperCount}
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
            <ResearchCategory
              lifeScience={dashboardData.researchCategories.lifeScienceCount}
              physicalScience={
                dashboardData.researchCategories.physicalScienceCount
              }
              scienceExpo={
                dashboardData.researchCategories.scienceInnovationExpoCount
              }
              robotics={dashboardData.researchCategories.roboticsCount}
              math={
                dashboardData.researchCategories.mathematicalComputationalCount
              }
            />
          </CardContent>
        </Card>
      </div>
    </Suspense>
  );
};

export default ChartsContainer;
