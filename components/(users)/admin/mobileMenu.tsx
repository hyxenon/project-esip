"use client";
import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { IoDocumentSharp } from "react-icons/io5";
import {
  FaFacebookMessenger,
  FaSchool,
  FaSearch,
  FaStar,
} from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { signOut, useSession } from "next-auth/react";
import NavLink from "@/components/navbar/NavLink";

import logo from "../../../assets/authForm/authLogo.svg";

import Image from "next/image";
import { MdDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { GiArchiveResearch } from "react-icons/gi";
import { CiLogout } from "react-icons/ci";
import { ImProfile } from "react-icons/im";

interface MobileMenuProps {
  role?: string;
}

const MobileMenu = ({ role }: MobileMenuProps) => {
  const { data: session } = useSession();
  return (
    <SheetContent side={"left"} className="px-1">
      <SheetHeader className="h-full">
        <SheetTitle>
          <div className="flex items-center">
            <Image src={logo} alt="logo" className="w-[80px]" />
            <p className="text-3xl font-bold">
              <span className="text-[#293618]">PROJECT</span>{" "}
              <span className="text-[#BC6C25]">E-SIP</span>
            </p>
          </div>
        </SheetTitle>
        <SheetDescription className="h-full ">
          <div className="flex flex-col w-full mt-4 h-full">
            {/* Links */}
            {/* TEACHER Links */}
            {role === "TEACHER" && (
              <div className="space-y-2 flex-1">
                <NavLink
                  href="/teacher"
                  className="flex items-center gap-2 py-1 px-4 rounded-md transition-all cursor-pointer hover:bg-gray-200"
                  activeClassName="bg-gray-200"
                >
                  <MdDashboard className="text-[#606C38]" />
                  <p className="font-semibold text-[#283618]">Dashboard</p>
                </NavLink>
                <NavLink
                  href="/teacher/user-management"
                  className="flex items-center gap-2 py-1 px-4 rounded-md transition-all cursor-pointer hover:bg-gray-200"
                  activeClassName="bg-gray-200"
                >
                  <FaUser className="text-[#606C38]" />
                  <p className="font-semibold text-[#283618]">
                    User Management
                  </p>
                </NavLink>
                <NavLink
                  href="/teacher/paper-management"
                  className="flex items-center gap-2 py-1 px-4 rounded-md transition-all cursor-pointer hover:bg-gray-200"
                  activeClassName="bg-gray-200"
                >
                  <GiArchiveResearch className="text-[#606C38]" />
                  <p className="font-semibold text-[#283618]">
                    Paper Management
                  </p>
                </NavLink>
                <NavLink
                  href="/messenger"
                  className="flex items-center gap-2 py-1 px-4 rounded-md transition-all cursor-pointer hover:bg-gray-200"
                  activeClassName="bg-gray-200"
                >
                  <FaFacebookMessenger className="text-[#606C38]" />
                  <p className="font-semibold text-[#283618]">Messenger</p>
                </NavLink>
                <NavLink
                  href="/search"
                  className="flex items-center gap-2 py-1 px-4 rounded-md transition-all cursor-pointer hover:bg-gray-200"
                  activeClassName="bg-gray-200"
                >
                  <FaSearch className="text-[#606C38]" />
                  <p className="font-semibold text-[#283618]">Search Paper</p>
                </NavLink>
              </div>
            )}

            {role === "STUDENT" && (
              <div className="space-y-2 flex-1">
                <NavLink
                  href="/search"
                  className="flex items-center gap-2 py-1 px-4 rounded-md transition-all cursor-pointer hover:bg-gray-200"
                  activeClassName="bg-gray-200"
                >
                  <FaSearch className="text-[#606C38]" />
                  <p className="font-semibold text-[#283618]">Search Paper</p>
                </NavLink>
                <NavLink
                  href="/messenger"
                  className="flex items-center gap-2 py-1 px-4 rounded-md transition-all cursor-pointer hover:bg-gray-200"
                  activeClassName="bg-gray-200"
                >
                  <FaFacebookMessenger className="text-[#606C38]" />
                  <p className="font-semibold text-[#283618]">Messenger</p>
                </NavLink>
                <NavLink
                  href="/messenger"
                  className="flex items-center gap-2 py-1 px-4 rounded-md transition-all cursor-pointer hover:bg-gray-200"
                  activeClassName="bg-gray-200"
                >
                  <IoDocumentSharp className="text-[#606C38]" />
                  <p className="font-semibold text-[#283618]">Live Docs</p>
                </NavLink>
              </div>
            )}

            {role === "ADMIN" && (
              <div className="space-y-2 flex-1">
                <NavLink
                  href="/admin"
                  className="flex items-center gap-2 py-1 px-4 rounded-md transition-all cursor-pointer hover:bg-gray-200"
                  activeClassName="bg-gray-200"
                >
                  <MdDashboard className="text-[#606C38]" />
                  <p className="font-semibold text-[#283618]">Dashboard</p>
                </NavLink>
                <NavLink
                  href="/admin/school-management"
                  className="flex items-center gap-2 py-1 px-4 rounded-md transition-all cursor-pointer hover:bg-gray-200"
                  activeClassName="bg-gray-200"
                >
                  <FaSchool className="text-[#606C38]" />
                  <p className="font-semibold text-[#283618]">
                    School Management
                  </p>
                </NavLink>
                <NavLink
                  href="/admin/user-management"
                  className="flex items-center gap-2 py-1 px-4 rounded-md transition-all cursor-pointer hover:bg-gray-200"
                  activeClassName="bg-gray-200"
                >
                  <FaUser className="text-[#606C38]" />
                  <p className="font-semibold text-[#283618]">
                    User Management
                  </p>
                </NavLink>
                <NavLink
                  href="/admin/research-management"
                  className="flex items-center gap-2 py-1 px-4 rounded-md transition-all cursor-pointer hover:bg-gray-200"
                  activeClassName="bg-gray-200"
                >
                  <GiArchiveResearch className="text-[#606C38]" />
                  <p className="font-semibold text-[#283618]">
                    Research Management
                  </p>
                </NavLink>
              </div>
            )}

            {/* Footer */}
            <div className="mt-auto space-y-2">
              <NavLink
                href="/library"
                className="flex items-center gap-2 py-1 px-4 rounded-md transition-all cursor-pointer hover:bg-gray-200"
                activeClassName="bg-gray-200"
              >
                <FaStar className="text-[#606C38]" />
                <p className="font-semibold text-[#283618]">My Library</p>
              </NavLink>
              <NavLink
                href="/profile"
                className="flex items-center gap-2 py-1 px-4 rounded-md transition-all cursor-pointer hover:bg-gray-200"
                activeClassName="bg-gray-200"
              >
                <ImProfile className="text-[#606C38]" />
                <p className="font-semibold text-[#283618]">Profile</p>
              </NavLink>

              <div className="flex items-center gap-2 hover:bg-gray-200 cursor-pointer py-1 px-4 rounded-md transition-all">
                <CiLogout className="text-red-500" />
                <p
                  onClick={() => signOut()}
                  className="font-semibold text-[#283618]"
                >
                  Log out
                </p>
              </div>
              <div className="flex items-center gap-2 px-4 py-1 rounded-md transition-all">
                <Avatar className="px-0 w-8 h-8">
                  <AvatarImage
                    className=""
                    src={
                      session?.user?.image
                        ? session.user.image
                        : `https://api.dicebear.com/6.x/initials/svg?seed=${session?.user?.name}`
                    }
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start">
                  <p>{session?.user?.name}</p>
                  <p>{session?.user?.email}</p>
                  <p>{session?.user?.role}</p>
                </div>
              </div>
            </div>
          </div>
        </SheetDescription>
      </SheetHeader>
      <div className="grid gap-4 py-4"></div>
      <SheetFooter></SheetFooter>
    </SheetContent>
  );
};

export default MobileMenu;
