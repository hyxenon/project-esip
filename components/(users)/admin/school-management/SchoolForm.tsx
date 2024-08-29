import { columns } from "./tables/schoolTable/columns";
import { DataTable } from "./tables/schoolTable/data-table";
import { AddSchoolButton } from "./tables/schoolTable/addSchoolButton";

import { Skeleton } from "@/components/ui/skeleton";
import { getSchools } from "@/actions/schoolManagement";

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

const SchoolForm = async () => {
  const res = await getSchools();
  const schools: SchoolModel[] = res.message;
  return (
    <section className="w-full">
      <div className="flex justify-end">
        <AddSchoolButton />
      </div>
      <div className="">
        <div>
          <DataTable columns={columns} data={schools} />
        </div>
      </div>
    </section>
  );
};

export default SchoolForm;
