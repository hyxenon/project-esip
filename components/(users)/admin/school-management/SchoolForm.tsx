// SchoolForm.tsx
"use client";
import { columns } from "./tables/schoolTable/columns";
import { DataTable } from "./tables/schoolTable/data-table";
import { AddSchoolButton } from "./tables/schoolTable/addSchoolButton";
import { useSchoolContext } from "@/context/SchoolContext";
import { Skeleton } from "@/components/ui/skeleton";

export interface SchoolModel {
  email: string;
  schoolName: string;
  streetAddress: string;
  city: string;
  province: string;
  postalCode: string;
  image: string | null;
  contactNumber: string;
  id: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const SchoolForm = () => {
  const { state, dispatch } = useSchoolContext();

  const handleSchoolAdded = (newSchool: SchoolModel) => {
    dispatch({ type: "ADD_SCHOOL", payload: newSchool });
  };

  return (
    <section className="w-full">
      <div className="flex justify-end">
        <AddSchoolButton onSchoolAdded={handleSchoolAdded} />
      </div>
      <div className="">
        {state.isLoading ? (
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ) : (
          <div>
            <DataTable columns={columns} data={state.schools} />
          </div>
        )}
      </div>
    </section>
  );
};

export default SchoolForm;
