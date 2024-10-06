import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { SchoolModel } from "./SchoolForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { getTotalCountsSchoolDetails } from "@/actions/totalCount.action";
import { useEffect, useState } from "react";
import { SkeletonCard } from "../../SkeletonCard";

interface SchoolDetailsProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  school: SchoolModel;
}
const SchoolDetails = ({ isOpen, setIsOpen, school }: SchoolDetailsProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [totalPapers, setTotalPapers] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (school.id) {
      const fetchData = async () => {
        try {
          const { totalUsers, totalPapers } = await getTotalCountsSchoolDetails(
            school.id
          );

          setTotalUsers(totalUsers);
          setTotalPapers(totalPapers);
        } catch (error) {
          console.error("Error fetching school details:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [school.id, isOpen]);

  if (loading) {
    return <SkeletonCard />;
  }

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px] overflow-y-scroll max-h-screen">
          <DialogHeader>
            <DialogTitle>View School Details</DialogTitle>
          </DialogHeader>
          <ProfileForm
            totalUsers={totalUsers}
            totalPapers={totalPapers}
            school={school}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>View School Details</DrawerTitle>
        </DrawerHeader>
        <ProfileForm
          totalUsers={totalUsers}
          totalPapers={totalPapers}
          school={school}
        />

        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

interface ProfileFormProps {
  school: SchoolModel;
  totalUsers: number;
  totalPapers: number;
}

function ProfileForm({ school, totalUsers, totalPapers }: ProfileFormProps) {
  return (
    <div className="px-8 py-8 flex items-center mt-4 gap-12">
      <div className="flex flex-col">
        <Image
          className="rounded-full"
          src={school.image!}
          alt="School Logo"
          width={150}
          height={150}
        />
        <div className="mt-6 ml-2 text-sm flex gap-2">
          <p>Users:</p>
          <Badge className="px-6 bg-[#606C38] hover:bg-[#283618]">
            {totalUsers}
          </Badge>
        </div>
        <div className="text-sm mt-2 flex gap-2">
          <p>Papers: </p>
          <Badge className="px-6 bg-[#BC6C25] hover:bg-[#DDA15E]">
            {totalPapers}
          </Badge>
        </div>
      </div>
      <div className="flex flex-col space-y-1.5 flex-1">
        <h1 className="font-semibold text-xl mb-4">{school.schoolName}</h1>
        <p className="text-sm">Email: {school.email}</p>
        <p className="text-sm">Province: {school.province}</p>
        <p className="text-sm">City: {school.city}</p>
        <p className="text-sm">Street Address: {school.streetAddress}</p>
        <p className="text-sm">Zip Postal Code: {school.postalCode}</p>
        <p className="text-sm">Contact No.: {school.contactNumber}</p>
      </div>
    </div>
  );
}

export default SchoolDetails;
