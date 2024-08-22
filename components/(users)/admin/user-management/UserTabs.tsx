import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TeacherTable from "./TeacherTable";

interface SchoolModel {
  label: string;
  value: string;
  image: string | null;
  id: string;
}

type UserTabsProps = {
  selectedSchool: SchoolModel | null;
};

const UserTabs = ({ selectedSchool }: UserTabsProps) => {
  return (
    <Tabs defaultValue="teachers" className="w-full">
      <TabsList className="grid md:w-[400px] grid-cols-2 shadow-2xl bg-[#D9D9D9] bg-opacity-70">
        <TabsTrigger value="teachers">Teachers</TabsTrigger>
        <TabsTrigger value="students">Students</TabsTrigger>
      </TabsList>
      <TabsContent value="teachers">
        <TeacherTable selectedSchool={selectedSchool} role="TEACHER" />
      </TabsContent>
      <TabsContent value="students">
        <TeacherTable selectedSchool={selectedSchool} role="STUDENT" />
      </TabsContent>
    </Tabs>
  );
};

export default UserTabs;
