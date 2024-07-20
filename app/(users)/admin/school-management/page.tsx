"use client";
import SubscriptionCard from "@/components/(users)/admin/school-management/cards/SubscriptionCard";
import TotalSchoolCard from "@/components/(users)/admin/school-management/cards/TotalSchoolCard";
import ActiveSchoolCard from "@/components/(users)/admin/school-management/cards/ActiveSchoolCard";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { FaAlignLeft } from "react-icons/fa6";
import MobileMenu from "@/components/(users)/admin/mobileMenu";
import TableTabs from "@/components/(users)/admin/school-management/TableTabs";

const SchoolManagement = () => {
  return (
    <div className="w-full h-screen overflow-y-scroll px-8 py-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button className="flex lg:hidden" variant="ghost" size={"icon"}>
            <FaAlignLeft />
          </Button>
        </SheetTrigger>
        <MobileMenu />
      </Sheet>

      {/* Card Count */}
      <div className="flex gap-4 flex-wrap">
        <TotalSchoolCard />
        <ActiveSchoolCard />
        <SubscriptionCard />
      </div>

      <div className="flex gap-8 mt-8">
        <TableTabs />
      </div>
    </div>
  );
};

export default SchoolManagement;
