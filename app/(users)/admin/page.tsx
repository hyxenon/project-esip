"use client";
import TotalStudentsCard from "@/components/(users)/admin/dashboard/cards/TotalStudentsCard";
import TotalTeacherCard from "@/components/(users)/admin/dashboard/cards/TotalTeacherCard";
import MostUsersSchool from "@/components/(users)/admin/dashboard/charts/MostUsersSchool";
import PopularPapers from "@/components/(users)/admin/dashboard/charts/PopularPapers";
import TotalVisitors from "@/components/(users)/admin/dashboard/charts/TotalVisitors";
import NewPapers from "@/components/(users)/admin/dashboard/recent-activity/NewPapers";
import NewSchools from "@/components/(users)/admin/dashboard/recent-activity/NewSchools";
import NewUsers from "@/components/(users)/admin/dashboard/recent-activity/NewUsers";
import MobileMenu from "@/components/(users)/admin/mobileMenu";
import TotalSchoolCard from "@/components/(users)/admin/school-management/cards/TotalSchoolCard";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import React from "react";
import { FaAlignLeft } from "react-icons/fa6";

const AdminHome = () => {
  return (
    <div className="w-full h-screen overflow-y-scroll px-8 py-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button className="flex lg:hidden" variant="ghost" size={"icon"}>
            <FaAlignLeft />
          </Button>
        </SheetTrigger>
        <MobileMenu />
      </Sheet>
      {/* Card */}
      <div className="flex gap-4 flex-wrap">
        <TotalSchoolCard />
        <TotalTeacherCard />
        <TotalStudentsCard />
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
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
