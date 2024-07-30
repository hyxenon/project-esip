import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

interface SchoolModel {
  label: string;
  value: string;
  image: string | null;
  id: string;
}

type TablistProps = {
  selectedSchool: SchoolModel | null;
};

const Tablist = ({ selectedSchool }: TablistProps) => {
  return (
    <Tabs defaultValue="allTeachers" className="w-full">
      <TabsList className="grid md:w-[400px] grid-cols-2 shadow-2xl">
        <TabsTrigger value="allTeachers">Teachers</TabsTrigger>
        <TabsTrigger value="pendingTeachers">Pending Teachers</TabsTrigger>
      </TabsList>
      <TabsContent value="allTeachers">
        <p>Teacher Table</p>
      </TabsContent>
      <TabsContent value="pendingTeachers">
        <p>Pending of teacher table</p>
      </TabsContent>
    </Tabs>
  );
};

export default Tablist;
