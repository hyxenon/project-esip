"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import AddUserTeacher from "../../admin/user-management/tables/AddUserTeacher";
import { DataTable } from "../../admin/user-management/tables/teacherTable/data-table";
import { columns } from "../../admin/user-management/tables/teacherTable/column";
import { useTeacherUserManagementContext } from "@/context/TeacherUserManagementContext";
import { Skeleton } from "@/components/ui/skeleton";
import { pendingColumn } from "./pending-column";

interface SchoolModel {
  label: string;
  value: string;
  image: string | null;
  id: string;
}

type TeacherTableProps = {
  selectedSchool?: SchoolModel | null;
  role: string;
};

const TeacherUserManagementTable = ({
  selectedSchool,
  role,
}: TeacherTableProps) => {
  const { state, dispatch } = useTeacherUserManagementContext();
  const [isLoading, setIsLoading] = useState(true);

  const studentUsers = state.studentUsers;
  const teacherUsers = state.teacherUsers;
  const pendingUsers = state.pendingUsers;
  useEffect(() => {
    dispatch({ type: "SET_ROLE", payload: role });

    if (!state.isLoading) {
      setIsLoading(false);
    }
  }, [studentUsers, teacherUsers, dispatch]);

  return (
    <Card className="w-full border-[#A0A0A0]">
      <CardContent className="flex flex-col">
        <div className="flex justify-end mt-8">
          {selectedSchool?.value !== undefined &&
            selectedSchool?.value !== "All School" &&
            state.role === "TEACHER" && (
              <AddUserTeacher selectedSchool={selectedSchool} />
            )}
        </div>
        <section className="w-full">
          <div className="">
            {isLoading ? (
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ) : (
              <div>
                {role === "TEACHER" && (
                  <DataTable columns={columns} data={teacherUsers} />
                )}
                {role === "STUDENT" && (
                  <DataTable columns={columns} data={studentUsers} />
                )}
                {role === "PENDING" && (
                  <DataTable columns={pendingColumn} data={pendingUsers} />
                )}
              </div>
            )}
          </div>
        </section>
      </CardContent>
    </Card>
  );
};

export default TeacherUserManagementTable;
