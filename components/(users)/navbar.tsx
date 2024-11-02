"use client";
import ProfileIcon from "@/components/navbar/profileIcon";
import { TeacherNavbarMenu } from "./navbarMenu";
import { Sheet, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { FaAlignLeft } from "react-icons/fa6";
import MobileMenu from "./admin/mobileMenu";
import { StudentNavbarMenu } from "./studentNavbarMenu";
import { AdminNavbarMenu } from "./admin/AdminNavbarMenu";

type NavbarProps = {
  role: string;
  isMessenger?: boolean;
};

const Navbar = ({ role, isMessenger }: NavbarProps) => {
  return (
    <div
      className={`lg:px-16 py-2 px-1 flex items-center bg-white gap-x-8 lg:shadow lg:py-4 lg:bg-[#283618]`}
    >
      {!isMessenger && (
        <Sheet>
          <SheetTrigger asChild>
            <Button className="flex lg:hidden" variant="ghost" size={"icon"}>
              <FaAlignLeft />
            </Button>
          </SheetTrigger>
          <MobileMenu role={role} />
        </Sheet>
      )}
      <div className="lg:flex items-center hidden">
        {/* <Image src={logo} alt="logo" className="w-[0px]" /> */}
        <p className="text-xl font-bold">
          <span className="text-[#FEFAE0]">PROJECT</span>{" "}
          <span className="text-[#DDA15E]">E-SIP</span>
        </p>
      </div>
      <div className="hidden lg:flex flex-1">
        {role == "TEACHER" && <TeacherNavbarMenu />}
        {role == "STUDENT" && <StudentNavbarMenu />}
        {role == "ADMIN" && <AdminNavbarMenu />}
        <div className="ml-auto flex gap-1">
          <ProfileIcon />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
