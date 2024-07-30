"use client";
import { getSchool } from "@/actions/schoolManagement";
import TotalStudents from "@/components/(users)/teacher/user-management/cards/totalStudents";
import TotalTeachers from "@/components/(users)/teacher/user-management/cards/totalTeachers";
import TotalUsers from "@/components/(users)/teacher/user-management/cards/totalUsers";
import Tablist from "@/components/(users)/teacher/user-management/Tablist";
import { useUserManagementContext } from "@/context/UserManagementContext";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

interface SchoolModel {
  label: string;
  value: string;
  image: string | null;
  id: string;
}

const UserManagement = () => {
  const { state, dispatch } = useUserManagementContext();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.schoolId) {
      dispatch({
        type: "SET_SELECTED_SCHOOL",
        payload: session.user?.schoolId,
      });
      setIsLoading(false);
    }
  }, [session]);

  return (
    <div className="flex flex-col px-3 lg:py-4 lg:px-16">
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight lg:mt-4">
        User Management
      </h4>
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-3 lg:gap-x-12 mt-2">
        <TotalUsers />
        <TotalTeachers />
        <div className="col-span-2 lg:col-span-1">
          <TotalStudents />
        </div>
      </div>
      {/* Tables */}
      <div className="mt-4">
        <Tablist isLoading={isLoading} filter="TEACHER" />
      </div>

      <div className="mt-4">
        <Tablist isLoading={isLoading} filter="STUDENT" />
      </div>
    </div>
  );
};

export default UserManagement;
