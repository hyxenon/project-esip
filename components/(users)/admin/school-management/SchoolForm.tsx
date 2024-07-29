// SchoolForm.tsx
"use client";
import { columns } from "./tables/schoolTable/columns";
import { DataTable } from "./tables/schoolTable/data-table";
import { AddSchoolButton } from "./tables/schoolTable/addSchoolButton";
import { useSchoolContext } from "@/context/SchoolContext";

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
        {state.schools.length > 0 ? (
          <DataTable columns={columns} data={state.schools} />
        ) : (
          <p>No Data</p>
        )}
      </div>
    </section>
  );
};

export default SchoolForm;
