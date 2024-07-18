import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SchoolTable from "./SchoolTable";
import { AddSchoolButton } from "./tables/schoolTable/addSchoolButton";
import SchoolForm from "./SchoolForm";
import PendingForm from "./PendingForm";

const TableTabs = () => {
  return (
    <Tabs defaultValue="schools" className="w-full">
      <TabsList className="grid w-[400px] grid-cols-2 shadow-2xl">
        <TabsTrigger value="schools">All Schools</TabsTrigger>
        <TabsTrigger value="pending">Pending Schools</TabsTrigger>
      </TabsList>
      <TabsContent value="schools">
        <SchoolTable cardTitle="">
          <div className="flex justify-end">
            <AddSchoolButton />
          </div>

          <SchoolForm />
        </SchoolTable>
      </TabsContent>
      <TabsContent value="pending">
        <SchoolTable cardTitle="">
          <PendingForm />
        </SchoolTable>
      </TabsContent>
    </Tabs>
  );
};

export default TableTabs;
