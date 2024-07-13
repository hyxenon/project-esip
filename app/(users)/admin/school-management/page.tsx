import SchoolTable from "@/components/(users)/admin/school-management/SchoolTable";
import { ScrollArea } from "@/components/ui/scroll-area";
import SubscriptionCard from "@/components/(users)/admin/school-management/cards/SubscriptionCard";
import TotalSchoolCard from "@/components/(users)/admin/school-management/cards/TotalSchoolCard";
import ActiveSchoolCard from "@/components/(users)/admin/school-management/cards/ActiveSchoolCard";
import SchoolForm from "@/components/(users)/admin/school-management/SchoolForm";

const SchoolManagement = () => {
  return (
    <ScrollArea className="w-full px-16 py-8">
      <div>
        <p>School Management</p>
        {/* Card Count */}
        <div className="flex gap-4 mt-4">
          <TotalSchoolCard />
          <ActiveSchoolCard />
          <SubscriptionCard />
        </div>

        <div className="flex gap-8 mt-8">
          <SchoolTable cardTitle="Schools">
            <SchoolForm />
          </SchoolTable>
          {/* <SchoolTable cardTitle="Pending Schools">
            <SchoolForm />
          </SchoolTable> */}
        </div>
      </div>
    </ScrollArea>
  );
};

export default SchoolManagement;
