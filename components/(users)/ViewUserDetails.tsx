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
import { Badge } from "../ui/badge";

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
    <div className="px-8 py-8 flex items-center mt-4 gap-12">
      <div className="flex flex-col items-center">
        <Image
          className="rounded-full"
          src={
            user.image
              ? user.image
              : `https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`
          }
          alt="Profile Picture"
          width={150}
          height={150}
        />
        <div className="mt-6 ml-2 text-sm flex gap-2">
          <p>Role:</p>
          <Badge className="px-6 bg-[#606C38] hover:bg-[#283618]">
            {user.role}
          </Badge>
        </div>
      </div>
      <div className="flex flex-col space-y-1.5 flex-1">
        <h1 className="font-semibold text-xl mb-4">{user.name}</h1>
        <p className="text-sm">Email: {user.email}</p>
        <p className="text-sm">School: {user.school?.schoolName}</p>
      </div>
    </div>
  );
}

export default ViewUserDetails;
