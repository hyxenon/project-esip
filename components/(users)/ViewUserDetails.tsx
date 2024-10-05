import { useMediaQuery } from "@/lib/hooks/useMediaQuery";

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
import { User } from "./admin/user-management/tables/teacherTable/column";

interface ViewUserDetailslProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: User;
}
const ViewUserDetails = ({
  isOpen,
  setIsOpen,
  user,
}: ViewUserDetailslProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px] overflow-y-scroll max-h-screen">
          <DialogHeader>
            <DialogTitle>View User Details</DialogTitle>
          </DialogHeader>
          <ProfileForm user={user} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>View User Details</DrawerTitle>
        </DrawerHeader>
        <ProfileForm user={user} />

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
  user: User;
}

function ProfileForm({ user }: ProfileFormProps) {
  return (
    <div className="px-2 h-[500px]">
      <div className="flex items-center justify-center">
        <Image
          src={
            user.image
              ? user.image
              : `https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`
          }
          alt="User Profile Picture"
          width={70}
          height={70}
          className="rounded-full"
        />
      </div>
    </div>
  );
}

export default ViewUserDetails;
