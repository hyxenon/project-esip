"use client";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "./tables/teacherTable/data-table";
import { columns } from "./tables/teacherTable/column";
import { useUserManagementContext } from "@/context/UserManagementContext";
import { Button } from "@/components/ui/button";
import AddUserTeacher from "./tables/AddUserTeacher";

interface SchoolModel {
  label: string;
  value: string;
  image: string | null;
  id: string;
}

type TeacherTableProps = {
  selectedSchool: SchoolModel | null;
};

const TeacherTable = ({ selectedSchool }: TeacherTableProps) => {
  const { state } = useUserManagementContext();
  const users = state.users;

  return (
    <Card className="w-full">
      <CardContent className="flex flex-col">
        <div className="flex justify-end mt-8">
          {selectedSchool?.value !== undefined &&
            selectedSchool?.value !== "All" && (
              <AddUserTeacher selectedSchool={selectedSchool} />
            )}
        </div>
        <section className="w-full">
          <div className="">
            <DataTable columns={columns} data={users} />
          </div>
        </section>
      </CardContent>
    </Card>
  );
};

export default TeacherTable;
