"use client";
import TotalStudents from "@/components/(users)/teacher/user-management/cards/totalStudents";
import TotalTeachers from "@/components/(users)/teacher/user-management/cards/totalTeachers";
import TotalUsers from "@/components/(users)/teacher/user-management/cards/totalUsers";
import Tablist from "@/components/(users)/teacher/user-management/Tablist";
import { useTeacherUserManagementContext } from "@/context/TeacherUserManagementContext";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

interface SchoolModel {
  label: string;
  value: string;
  image: string | null;
  id: string;
}

const UserManagement = () => {
  const { state, dispatch } = useTeacherUserManagementContext();

  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.schoolId) {
      dispatch({
        type: "SET_SELECTED_SCHOOL",
        payload: session.user?.schoolId,
      });
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
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight lg:mt-8">
        Teacher Management
      </h4>
      <div className="mt-4">
        <Tablist filter="TEACHER" />
      </div>
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight lg:mt-8">
        Student Management
      </h4>
      <div className="mt-4">
        <Tablist filter="STUDENT" />
      </div>
    </div>
  );
};

export default UserManagement;
