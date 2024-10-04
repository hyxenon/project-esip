"use client";
import { Card, CardContent } from "@/components/ui/card";

import { DataTable } from "../../admin/user-management/tables/teacherTable/data-table";
import {
  columns,
  User,
} from "../../admin/user-management/tables/teacherTable/column";

import { pendingColumn } from "./pending-column";
import AddUserTeacher from "../../admin/user-management/tables/AddUserTeacher";

type TeacherTableProps = {
  specificSchool?: any;
  role: string;
  teachersData?: User[];
  studentsData?: User[];
  pendingData?: User[];
};

const TeacherUserManagementTable = ({
  role,
  teachersData,
  studentsData,
  pendingData,
  specificSchool,
}: TeacherTableProps) => {
  return (
    <Card className="w-full bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 mt-8">
      <CardContent className="flex flex-col px-2 md:px-6">
        <div className="flex justify-end mt-8">
          {role === "TEACHER" && (
            <AddUserTeacher selectedSchool={specificSchool} />
          )}
        </div>
        <section className="w-full">
          <div className="">
            <div>
              {role === "TEACHER" && (
                <DataTable columns={columns} data={teachersData!} />
              )}
              {role === "STUDENT" && (
                <DataTable columns={columns} data={studentsData!} />
              )}
              {role === "PENDING" && (
                <DataTable columns={pendingColumn} data={pendingData!} />
              )}
            </div>
          </div>
        </section>
      </CardContent>
    </Card>
  );
};

export default TeacherUserManagementTable;
