import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

import TeacherUserManagementTable from "./TeacherUserManagementTable";
import { User } from "../../admin/user-management/tables/teacherTable/column";

type TeacherUserTabListProps = {
  teachersData: User[];
  studentsData: User[];
  pendingData: User[];
  specificSchool: any;
};

const TeacherUserTabList = ({
  teachersData,
  studentsData,
  pendingData,
  specificSchool,
}: TeacherUserTabListProps) => {
  return (
    <div>
      <Tabs defaultValue="allTeachers" className="w-full mt-8">
        <TabsList className="grid md:w-[400px] grid-cols-3 shadow-md bg-[#D9D9D9] bg-opacity-30">
          <TabsTrigger value="allTeachers">Teachers</TabsTrigger>
          <TabsTrigger value="allStudents">Students</TabsTrigger>
          <TabsTrigger value="pendingUsers">Pending Users</TabsTrigger>
        </TabsList>
        <TabsContent value="allTeachers">
          <TeacherUserManagementTable
            teachersData={teachersData}
            role="TEACHER"
            specificSchool={specificSchool}
          />
        </TabsContent>
        <TabsContent value="allStudents">
          <TeacherUserManagementTable
            studentsData={studentsData}
            role="STUDENT"
          />
        </TabsContent>
        <TabsContent value="pendingUsers">
          <TeacherUserManagementTable
            pendingData={pendingData}
            role="PENDING"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeacherUserTabList;
