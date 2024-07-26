import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TeacherTable from "./TeacherTable";
import { Button } from "@/components/ui/button";

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
      <TabsList className="grid md:w-[400px] grid-cols-2 shadow-2xl">
        <TabsTrigger value="teachers">Teachers</TabsTrigger>
        <TabsTrigger value="students">Students</TabsTrigger>
      </TabsList>
      <TabsContent value="teachers">
        <TeacherTable selectedSchool={selectedSchool} />
      </TabsContent>
      <TabsContent value="students">
        <div>test</div>
      </TabsContent>
    </Tabs>
  );
};

export default UserTabs;
