import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import TeacherTable from "../../admin/user-management/TeacherTable";
import { Skeleton } from "@/components/ui/skeleton";
import TeacherUserManagementTable from "./TeacherUserManagementTable";

interface SchoolModel {
  label: string;
  value: string;
  image: string | null;
  id: string;
}

type TablistProps = {};

const TeacherUserTabList = ({}: TablistProps) => {
  return (
    <div>
      <Tabs defaultValue="allTeachers" className="w-full mt-8">
        <TabsList className="grid md:w-[400px] grid-cols-3 shadow-2xl bg-[#D9D9D9] bg-opacity-70">
          <TabsTrigger value="allTeachers">Teachers</TabsTrigger>
          <TabsTrigger value="allStudents">Students</TabsTrigger>
          <TabsTrigger value="pendingUsers">Pending Users</TabsTrigger>
        </TabsList>
        <TabsContent value="allTeachers">
          <TeacherUserManagementTable role="TEACHER" />
        </TabsContent>
        <TabsContent value="allStudents">
          <TeacherUserManagementTable role="STUDENT" />
        </TabsContent>
        <TabsContent value="pendingUsers">
          <TeacherUserManagementTable role="PENDING" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeacherUserTabList;
