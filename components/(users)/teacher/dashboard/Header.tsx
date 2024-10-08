"use client";
import { convertJsonToExcel } from "@/actions/teacherDashboard.action";
import { Button } from "@/components/ui/button";
import React from "react";

const Header = ({ jsonData }: { jsonData: any }) => {
  const onClick = async () => {
    await convertJsonToExcel(jsonData, "data");
  };
  return (
    <div className="flex justify-between my-8 items-center">
      <h1 className="text-3xl font-bold text-[#283618]">Teacher Dashboard</h1>
      <div className="flex flex-col md:flex-row gap-2 items-center">
        <Button className="hover:bg-[#283618] bg-[#606C38] transition-all">
          AI Analytics
        </Button>
        <Button
          className="hover:bg-[#283618] bg-[#606C38] transition-all"
          onClick={onClick}
        >
          Export Data
        </Button>
      </div>
    </div>
  );
};

export default Header;
