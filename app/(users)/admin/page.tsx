import { getTotalCounts } from "@/actions/totalCount.action";
import MostUsersSchool from "@/components/(users)/admin/dashboard/charts/MostUsersSchool";
import PopularPapers from "@/components/(users)/admin/dashboard/charts/PopularPapers";
import TotalVisitors from "@/components/(users)/admin/dashboard/charts/TotalVisitors";
import NewPapers from "@/components/(users)/admin/dashboard/recent-activity/NewPapers";
import NewSchools from "@/components/(users)/admin/dashboard/recent-activity/NewSchools";
import NewUsers from "@/components/(users)/admin/dashboard/recent-activity/NewUsers";
import MobileMenu from "@/components/(users)/admin/mobileMenu";
import TotalCards from "@/components/(users)/TotalCards";

import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import React from "react";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaAlignLeft } from "react-icons/fa6";
import { PiStudentFill } from "react-icons/pi";
import { RiSchoolLine } from "react-icons/ri";

const AdminHome = async () => {
  const { totalSchools, totalTeachers, totalStudents } = await getTotalCounts();

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
        <div className="grid md:grid-cols-2 2xl:grid-cols-4 gap-8 mt-4">
          <NewPapers />
          <NewSchools />
          <NewUsers />
        </div>
      </div>

      {/* Charts */}
      <div className="mt-4">
        <h1 className="font-semibold">Usage Statistics</h1>
        <div className="grid grid-cols-1 2xl:grid-cols-2 gap-8 mt-4">
          <TotalVisitors />
          <PopularPapers />
          <MostUsersSchool />
        </div>
      </div>

      <div className="mt-4">
        <h1 className="font-semibold">Engagement metrics </h1>
      </div>
    </div>
  );
};

export default AdminHome;
