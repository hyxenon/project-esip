import SubscriptionCard from "@/components/(users)/admin/school-management/cards/SubscriptionCard";
import TotalSchoolCard from "@/components/(users)/admin/school-management/cards/TotalSchoolCard";
import ActiveSchoolCard from "@/components/(users)/admin/school-management/cards/ActiveSchoolCard";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { FaAlignLeft } from "react-icons/fa6";
import MobileMenu from "@/components/(users)/admin/mobileMenu";
import TableTabs from "@/components/(users)/admin/school-management/TableTabs";
import TotalCards from "@/components/(users)/TotalCards";
import { RiSchoolLine } from "react-icons/ri";
import { Activity } from "lucide-react";
import { MdSubscriptions } from "react-icons/md";

const SchoolManagement = () => {
  return (
    <div className="w-full h-screen px-4 md:px-8 py-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button className="flex lg:hidden mb-4" variant="ghost" size={"icon"}>
            <FaAlignLeft />
          </Button>
        </SheetTrigger>
        <MobileMenu />
      </Sheet>

      {/* Card Count */}
      <div className="flex gap-4 flex-wrap">
        <TotalCards cardTitle="Total Schools" cardTotalNumber={0}>
          <RiSchoolLine className="h-5 w-5 text-[#283618]" />
        </TotalCards>

        <TotalCards cardTitle="Active Schools" cardTotalNumber={0}>
          <Activity className="h-5 w-5 text-[#283618]" />
        </TotalCards>

        <TotalCards cardTitle="New Schools" cardTotalNumber={0}>
          <MdSubscriptions className="h-5 w-5 text-[#283618]" />
        </TotalCards>
      </div>

      <div className="flex gap-8 mt-8">
        <TableTabs />
      </div>
    </div>
  );
};

export default SchoolManagement;
