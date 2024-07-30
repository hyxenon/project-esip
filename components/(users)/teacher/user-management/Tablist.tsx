import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import TeacherTable from "../../admin/user-management/TeacherTable";
import { Skeleton } from "@/components/ui/skeleton";

interface SchoolModel {
  label: string;
  value: string;
  image: string | null;
  id: string;
}

type TablistProps = {
  isLoading: boolean;
  filter: string;
};

const Tablist = ({ isLoading, filter }: TablistProps) => {
  return (
    <div>
      {filter === "TEACHER" ? (
        <Tabs defaultValue="allTeachers" className="w-full">
          <TabsList className="grid md:w-[400px] grid-cols-2 shadow-2xl">
            <TabsTrigger value="allTeachers">Teachers</TabsTrigger>
            <TabsTrigger value="pendingTeachers">Pending Teachers</TabsTrigger>
          </TabsList>
          <TabsContent value="allTeachers">
            {isLoading ? (
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ) : (
              <TeacherTable role="TEACHER" />
            )}
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
            {isLoading ? (
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ) : (
              <TeacherTable role="STUDENT" />
            )}
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
