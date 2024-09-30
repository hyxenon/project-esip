import React from "react";
import {
  getPopularKeywords,
  getPopularPapers,
} from "@/actions/teacherDashboard.action";
import { auth } from "@/auth";
import Header from "@/components/(users)/teacher/dashboard/Header";
import { getTotalCountTeacherDashboard } from "@/actions/totalCount.action";
import Unauthorized from "@/components/UnAuthorized";
import dynamic from "next/dynamic";
import { SkeletonCard } from "@/components/(users)/SkeletonCard";
import { PopularCharts } from "@/components/(users)/teacher/dashboard/PopularCharts";

const ChartsContainer = dynamic(
  () => import("@/components/(users)/teacher/dashboard/ChartsContainer"),
  {
    loading: () => <SkeletonCard />,
    ssr: false,
  }
);

const TopPopularBarChart = dynamic(
  () => import("@/components/(users)/teacher/dashboard/PopularPapers"),
  {
    loading: () => <SkeletonCard />,
    ssr: false,
  }
);

const RecentAddedPapers = dynamic(
  () => import("@/components/(users)/teacher/dashboard/RecentAddedPapers"),
  {
    loading: () => <SkeletonCard />,
    ssr: false,
  }
);

const RecentUsersCard = dynamic(
  () => import("@/components/(users)/teacher/dashboard/RecentUsersCard"),
  {
    loading: () => <SkeletonCard />,
    ssr: false,
  }
);

const TeacherDashboard = async ({
  searchParams,
}: {
  searchParams?: { page?: string };
}) => {
  const session = await auth();

  if (session?.user?.role !== "TEACHER") {
    return <Unauthorized />;
  }

  const [popularPapers, popularKeywords, dashboardData] = await Promise.all([
    getPopularPapers(session?.user?.schoolId!),
    getPopularKeywords(session?.user?.schoolId!),
    getTotalCountTeacherDashboard(session?.user?.schoolId!),
  ]);

  const jsonData = [
    { Category: "Total Counts", Value: "" },
    { Category: "Total Users", Value: dashboardData.totalUsers },
    { Category: "Teachers", Value: dashboardData.totalTeachers },
    { Category: "Students", Value: dashboardData.totalStudents },
    {
      Category: "Research Proposals",
      Value: dashboardData.totalResearchProposalCount,
    },
    {
      Category: "Research Papers",
      Value: dashboardData.totalResearchPaperCount,
    },

    { Category: "", Value: "" }, // Blank row for spacing

    { Category: "Research Category", Value: "" },
    {
      Category: "Life Science",
      Value: dashboardData.researchCategories.lifeScienceCount,
    },
    {
      Category: "Physical Science",
      Value: dashboardData.researchCategories.physicalScienceCount,
    },
    {
      Category: "Science Innovation Expo",
      Value: dashboardData.researchCategories.scienceInnovationExpoCount,
    },
    {
      Category: "Robotics",
      Value: dashboardData.researchCategories.roboticsCount,
    },
    {
      Category: "Mathematical and Computational",
      Value: dashboardData.researchCategories.mathematicalComputationalCount,
    },

    { Category: "", Value: "" }, // Blank row for spacing

    { Category: "Popular Papers", Value: "" },
    ...popularPapers.map((paper) => ({
      Category: paper.paper,
      Value: paper.views,
    })),

    { Category: "", Value: "" }, // Blank row for spacing

    { Category: "Popular Keywords", Value: "" },
    ...popularKeywords.map((keyword) => ({
      Category: keyword.keyword,
      Value: keyword.count,
    })),
  ];

  return (
    <div className="py-4 px-3 md:px-8 lg:py-4 lg:px-16 xl:px-24  min-h-screen mb-8">
      <Header jsonData={jsonData} />
      {/* Charts component */}
      <ChartsContainer dashboardData={dashboardData} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <RecentAddedPapers page={searchParams?.page} session={session} />
        <RecentUsersCard session={session} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopPopularBarChart
          description="Top 10 popular papers based on views."
          title="Popular Papers"
        >
          <PopularCharts
            data={popularPapers}
            dataKeyX="views"
            dataKeyY="paper"
            barColor="#606C38"
          />
        </TopPopularBarChart>
        <TopPopularBarChart
          description="Top 10 most popular keywords."
          title="Popular Keywords"
        >
          <PopularCharts
            data={popularKeywords}
            dataKeyX="count"
            dataKeyY="keyword"
            barColor="#283618"
          />
        </TopPopularBarChart>
      </div>
    </div>
  );
};

export default TeacherDashboard;
