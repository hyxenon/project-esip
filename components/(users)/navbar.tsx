"use client";
import logo from "../../assets/authForm/authLogo.svg";
import Image from "next/image";
import { useSession } from "next-auth/react";
import ProfileIcon from "@/components/navbar/profileIcon";
import React from "react";
import { TeacherNavbarMenu } from "./navbarMenu";
import { Sheet, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { FaAlignLeft } from "react-icons/fa6";
import MobileMenu from "./admin/mobileMenu";
import { StudentNavbarMenu } from "./studentNavbarMenu";
import Notifications from "./student/Notifications";

type NavbarProps = {
  role: string;
};

const Navbar = ({ role }: NavbarProps) => {
  const { data: session } = useSession();

  return (
    <div
      className={`lg:px-16 flex items-center bg-gray-50 gap-x-8 lg:shadow lg:py-4 lg:bg-[#283618]`}
    >
      <Sheet>
        <SheetTrigger asChild>
          <Button className="flex lg:hidden" variant="ghost" size={"icon"}>
            <FaAlignLeft />
          </Button>
        </SheetTrigger>
        <MobileMenu role="TEACHER" />
      </Sheet>
      <div className="lg:flex items-center hidden">
        {/* <Image src={logo} alt="logo" className="w-[0px]" /> */}
        <p className="text-xl font-bold">
          <span className="text-[#FEFAE0]">PROJECT</span>{" "}
          <span className="text-[#DDA15E]">E-SIP</span>
        </p>
      </div>
      <div className="hidden lg:flex flex-1">
        {role == "TEACHER" ? <TeacherNavbarMenu /> : <StudentNavbarMenu />}
        <div className="ml-auto flex gap-1">
          <ProfileIcon />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
