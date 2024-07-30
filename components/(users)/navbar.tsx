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

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <div className="lg:px-16 flex items-center gap-x-8 lg:shadow lg:py-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button className="flex lg:hidden mb-4" variant="ghost" size={"icon"}>
            <FaAlignLeft />
          </Button>
        </SheetTrigger>
        <MobileMenu role="TEACHER" />
      </Sheet>
      <div className="lg:flex items-center hidden">
        <Image src={logo} alt="logo" className="w-[50px]" />
        <p className="text-xl font-bold">
          <span className="text-[#293618]">PROJECT</span>{" "}
          <span className="text-[#BC6C25]">E-SIP</span>
        </p>
      </div>
      <div className="hidden lg:flex flex-1">
        <TeacherNavbarMenu />
        <ProfileIcon />
      </div>
    </div>
  );
};

export default Navbar;
