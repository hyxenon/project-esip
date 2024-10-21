"use client";
import { getSchool } from "@/actions/schoolManagement";
import { convertJsonToExcel } from "@/actions/teacherDashboard.action";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { SchoolModel } from "../../admin/school-management/SchoolForm";
import Image from "next/image";

const Header = ({
  jsonData,
  schoolId,
}: {
  jsonData: any;
  schoolId: string;
}) => {
  const [schoolData, setSchoolData] = useState<SchoolModel>();

  const onClick = async () => {
    await convertJsonToExcel(jsonData, "data");
  };

  useEffect(() => {
    const fetchSchoolData = async () => {
      const res = await getSchool(schoolId);
      setSchoolData(res?.message);
    };

    fetchSchoolData();
  }, []);
  return (
    <div className="flex justify-between my-8 items-center">
      <div className="flex items-center gap-4">
        <Image
          src={
            schoolData?.image
              ? schoolData.image
              : `https://api.dicebear.com/6.x/initials/svg?seed=${schoolData?.schoolName}`
          }
          alt="school logo"
          height={50}
          width={50}
          loading="lazy"
          className="rounded-full"
        />
        <h1 className="text-2xl lg:text-3xl font-bold text-[#283618]">
          {schoolData?.schoolName}
        </h1>
      </div>

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
