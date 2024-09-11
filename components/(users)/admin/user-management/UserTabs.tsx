import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TeacherTable from "./TeacherTable";
import { User } from "./tables/teacherTable/column";

type UserTabsProps = {
  teachers: User[];
  students: User[];
  specificSchool: any;
};

const UserTabs = ({ teachers, students, specificSchool }: UserTabsProps) => {
  return (
    <Tabs defaultValue="teachers" className="w-full pb-4">
      <TabsList className="grid md:w-[400px] grid-cols-2 shadow-2xl bg-[#D9D9D9] bg-opacity-70">
        <TabsTrigger value="teachers">Teachers</TabsTrigger>
        <TabsTrigger value="students">Students</TabsTrigger>
      </TabsList>
      <TabsContent value="teachers">
        <TeacherTable
          data={teachers}
          role="TEACHER"
          specificSchool={specificSchool}
        />
      </TabsContent>
      <TabsContent value="students">
        <TeacherTable
          data={students}
          role="STUDENT"
          specificSchool={specificSchool}
        />
      </TabsContent>
    </Tabs>
  );
};

export default UserTabs;
