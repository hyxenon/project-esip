import {
  getPopularKeywords,
  getPopularPapers,
} from "@/actions/teacherDashboard.action";
import { getTotalCounts } from "@/actions/totalCount.action";
import MobileMenu from "@/components/(users)/admin/mobileMenu";
import { SkeletonCard } from "@/components/(users)/SkeletonCard";
import { PopularCharts } from "@/components/(users)/teacher/dashboard/PopularCharts";
import TotalCards from "@/components/(users)/TotalCards";

import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import dynamic from "next/dynamic";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaAlignLeft } from "react-icons/fa6";
import { PiStudentFill } from "react-icons/pi";
import { RiSchoolLine } from "react-icons/ri";

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

const AdminHome = async ({
  searchParams,
}: {
  searchParams?: { page?: string };
}) => {
  const { totalSchools, totalTeachers, totalStudents } = await getTotalCounts();
  const [popularPapers, popularKeywords] = await Promise.all([
    getPopularPapers(),
    getPopularKeywords(),
  ]);

  return (
    <div className="w-full h-screen px-4 md:px-8 py-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button className="flex lg:hidden mb-4" variant="ghost" size={"icon"}>
            <FaAlignLeft />
          </Button>
        </SheetTrigger>
        <MobileMenu role="ADMIN" />
      </Sheet>
      {/* Card */}
      <div className="flex gap-4 flex-wrap">
        <TotalCards cardTitle="Total Schools" cardTotalNumber={totalSchools}>
          <RiSchoolLine className="h-5 w-5 text-[#283618]" />
        </TotalCards>
        <TotalCards cardTitle="Total Teachers" cardTotalNumber={totalTeachers}>
          <FaChalkboardTeacher className="h-5 w-5 text-[#283618]" />
        </TotalCards>
        <TotalCards cardTitle="Total Students" cardTotalNumber={totalStudents}>
          <PiStudentFill className="h-5 w-5 text-[#283618]" />
        </TotalCards>
      </div>
      {/* Recent Activity Summary */}
      <div className="mt-4">
        <h1 className="font-semibold">Recent Activity Summary</h1>
        <div className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-8 mt-4">
          <RecentAddedPapers page={searchParams?.page} role={"admin"} />
          <RecentUsersCard />
        </div>
      </div>

      {/* Charts */}
      <div className="mt-4">
        <h1 className="font-semibold">Usage Statistics</h1>
        {/* <div className="grid grid-cols-1 2xl:grid-cols-2 gap-8 mt-4">
          <TotalVisitors /> 
          <PopularPapers />
          <MostUsersSchool />
        </div> */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
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

      <div className="mt-4">
        <h1 className="font-semibold">Engagement metrics </h1>
      </div>
    </div>
  );
};

export default AdminHome;
