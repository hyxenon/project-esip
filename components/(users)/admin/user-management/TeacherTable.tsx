"use client";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "./tables/teacherTable/data-table";
import { columns } from "./tables/teacherTable/column";
import { useUserManagementContext } from "@/context/UserManagementContext";
import AddUserTeacher from "./tables/AddUserTeacher";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

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

const TeacherTable = ({ selectedSchool, role }: TeacherTableProps) => {
  const { state, dispatch } = useUserManagementContext();

  useEffect(() => {
    dispatch({ type: "SET_ROLE", payload: role });
  }, [role, dispatch]);

  const users = state.users;

  return (
    <Card className="w-full border-[#B0B0B0]">
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
            {state.isLoading ? (
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ) : (
              <div>
                <DataTable columns={columns} data={users} />
              </div>
            )}
          </div>
        </section>
      </CardContent>
    </Card>
  );
};

export default TeacherTable;
