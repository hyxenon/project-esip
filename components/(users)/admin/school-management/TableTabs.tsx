import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SchoolTable from "./SchoolTable";

import SchoolForm from "./SchoolForm";
import PendingForm from "./PendingForm";

const TableTabs = () => {
  return (
    <Tabs defaultValue="schools" className="w-full mb-16">
      <TabsList className="grid md:w-[400px] grid-cols-2 shadow-md bg-[#D9D9D9] bg-opacity-50">
        <TabsTrigger value="schools">All Schools</TabsTrigger>
        <TabsTrigger value="pending">Pending Schools</TabsTrigger>
      </TabsList>
      <TabsContent value="schools">
        <SchoolTable cardTitle="">
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
