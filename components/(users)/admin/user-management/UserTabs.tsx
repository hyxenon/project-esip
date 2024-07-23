import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const UserTabs = () => {
  return (
    <Tabs defaultValue="teachers" className="w-full">
      <TabsList className="grid md:w-[400px] grid-cols-2 shadow-2xl">
        <TabsTrigger value="teachers">Teachers</TabsTrigger>
        <TabsTrigger value="students">Students</TabsTrigger>
      </TabsList>
      <TabsContent value="teachers">
        <div>test</div>
      </TabsContent>
      <TabsContent value="students">
        <div>test</div>
      </TabsContent>
    </Tabs>
  );
};

export default UserTabs;
