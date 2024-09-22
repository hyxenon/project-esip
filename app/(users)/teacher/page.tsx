import React from "react";
import RecentUsersCard from "@/components/(users)/teacher/dashboard/RecentUsersCard";
import ChartsContainer from "@/components/(users)/teacher/dashboard/ChartsContainer";
import RecentAddedPapers from "@/components/(users)/teacher/dashboard/RecentAddedPapers";

const TeacherDashboard = async ({
  searchParams,
}: {
  searchParams?: { page?: string };
}) => {
  return (
    <div className="py-4 px-3 md:px-8 lg:py-4 lg:px-16 xl:px-24  min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Teacher Dashboard
      </h1>

      {/* Charts component */}
      <ChartsContainer />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RecentAddedPapers page={searchParams?.page} />
        <RecentUsersCard />
      </div>
    </div>
  );
};

export default TeacherDashboard;
