import React from "react";
import RecentUsersCard from "@/components/(users)/teacher/dashboard/RecentUsersCard";
import ChartsContainer from "@/components/(users)/teacher/dashboard/ChartsContainer";
import RecentAddedPapers from "@/components/(users)/teacher/dashboard/RecentAddedPapers";
import TopPopularBarChart from "@/components/(users)/teacher/dashboard/PopularPapers";
import { PopularCharts } from "@/components/(users)/teacher/dashboard/PopularCharts";
import {
  getPopularKeywords,
  getPopularPapers,
} from "@/actions/teacherDashboard.action";
import { auth } from "@/auth";

const paperData = [
  { paper: "Paper 1", views: 150 },
  { paper: "Paper 2", views: 120 },
  { paper: "Paper 3", views: 180 },
  // ...
];

const keywordData = [
  { keyword: "Artificial Intelligence", count: 300 },
  { keyword: "Machine Learning", count: 200 },
  { keyword: "Blockchain", count: 150 },
  { keyword: "Effect", count: 150 },
  // ...
];

const TeacherDashboard = async ({
  searchParams,
}: {
  searchParams?: { page?: string };
}) => {
  const session = await auth();
  const popularPapers = await getPopularPapers(session?.user?.schoolId!);

  const popularKeywords = await getPopularKeywords(session?.user?.schoolId!);

  return (
    <div className="py-4 px-3 md:px-8 lg:py-4 lg:px-16 xl:px-24  min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Teacher Dashboard
      </h1>

      {/* Charts component */}
      <ChartsContainer />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <RecentAddedPapers page={searchParams?.page} />
        <RecentUsersCard />
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
          />
        </TopPopularBarChart>
      </div>
    </div>
  );
};

export default TeacherDashboard;
