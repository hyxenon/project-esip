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

interface SchoolDetailsProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  school: SchoolModel;
}
const SchoolDetails = ({ isOpen, setIsOpen, school }: SchoolDetailsProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px] overflow-y-scroll max-h-screen">
          <DialogHeader>
            <DialogTitle>View School Details</DialogTitle>
          </DialogHeader>
          <ProfileForm school={school} />
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
        <ProfileForm school={school} />

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
}

function ProfileForm({ school }: ProfileFormProps) {
  return (
    <div className="px-2 h-[500px]">
      <div className="flex items-center justify-center">
        <Image
          className="rounded-full"
          src={school.image!}
          alt="School Logo"
          width={70}
          height={70}
        />
      </div>
    </div>
  );
}

export default SchoolDetails;
