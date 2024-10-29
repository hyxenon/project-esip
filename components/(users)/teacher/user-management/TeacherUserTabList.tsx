import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
          <TabsTrigger
            className={`${pendingData.length > 0 ? "relative" : ""}`}
            value="pendingUsers"
          >
            Pending Users
            {pendingData.length > 0 && (
              <div className="absolute opacity-100 -right-2 -top-3 bg-[#BC6C25] rounded-full w-5 h-5 flex items-center justify-center">
                <span className="text-xs text-white">{pendingData.length}</span>
              </div>
            )}
          </TabsTrigger>
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
