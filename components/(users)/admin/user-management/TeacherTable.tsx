"use client";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "./tables/teacherTable/data-table";
import { columns, User } from "./tables/teacherTable/column";
import AddUserTeacher from "./tables/AddUserTeacher";

type TeacherTableProps = {
  data: User[];
  specificSchool: any;
  role: string;
};

const TeacherTable = ({ data, specificSchool, role }: TeacherTableProps) => {
  return (
    <Card className="w-full bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 mt-8">
      <CardContent className="flex flex-col px-2 md:px-6">
        <div className="flex justify-end mt-8">
          {/* {selectedSchool?.value !== undefined &&
            selectedSchool?.value !== "All School" &&
            state.role === "TEACHER" && (
              
            )} */}
          {specificSchool && role === "TEACHER" && (
            <AddUserTeacher selectedSchool={specificSchool} />
          )}
        </div>
        <section className="w-full">
          <div className="">
            <DataTable columns={columns} data={data} />
          </div>
        </section>
      </CardContent>
    </Card>
  );
};

export default TeacherTable;
