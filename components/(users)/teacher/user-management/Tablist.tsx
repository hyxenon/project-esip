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

type TablistProps = {
  filter: string;
};

const Tablist = ({ filter }: TablistProps) => {
  return (
    <div>
      {filter === "TEACHER" ? (
        <Tabs defaultValue="allTeachers" className="w-full">
          <TabsList className="grid md:w-[400px] grid-cols-2 shadow-2xl">
            <TabsTrigger value="allTeachers">Teachers</TabsTrigger>
            <TabsTrigger value="pendingTeachers">Pending Teachers</TabsTrigger>
          </TabsList>
          <TabsContent value="allTeachers">
            <TeacherUserManagementTable role="TEACHER" />
          </TabsContent>
          <TabsContent value="pendingTeachers">
            <p>Pending of teacher table</p>
          </TabsContent>
        </Tabs>
      ) : (
        <Tabs defaultValue="allStudents" className="w-full">
          <TabsList className="grid md:w-[400px] grid-cols-2 shadow-2xl">
            <TabsTrigger value="allStudents">Students</TabsTrigger>
            <TabsTrigger value="pendingStudents">Pending Students</TabsTrigger>
          </TabsList>
          <TabsContent value="allStudents">
            <TeacherUserManagementTable role="STUDENT" />
          </TabsContent>
          <TabsContent value="pendingStudents">
            <p>Pending of teacher table</p>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default Tablist;
