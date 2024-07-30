import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { DashboardIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { signOut, useSession } from "next-auth/react";
import NavLink from "@/components/navbar/NavLink";

import logo from "../../../assets/authForm/authLogo.svg";

import React from "react";
import Image from "next/image";

interface MobileMenuProps {
  role?: string;
}

const MobileMenu = ({ role }: MobileMenuProps) => {
  const { data: session } = useSession();
  return (
    <SheetContent side={"left"}>
      <SheetHeader className="h-full">
        <SheetTitle>
          <div className="flex items-center">
            <Image src={logo} alt="logo" className="w-[80px]" />
            <p className="text-xl font-bold">
              <span className="text-[#293618]">PROJECT</span>{" "}
              <span className="text-[#BC6C25]">E-SIP</span>
            </p>
          </div>
        </SheetTitle>
        <SheetDescription className="h-full ">
          <div className="flex flex-col w-full mt-4 h-full">
            {/* Links */}
            {/* TEACHER Links */}
            {role === "TEACHER" ? (
              <div className="space-y-2 flex-1">
                <NavLink
                  href="/teacher"
                  className="flex items-center gap-2 py-1 px-4 rounded-md transition-all cursor-pointer hover:bg-gray-200"
                  activeClassName="bg-gray-200"
                >
                  <DashboardIcon />
                  <p className="font-semibold text-[#283618]">Dashboard</p>
                </NavLink>
                <NavLink
                  href=""
                  className="flex items-center gap-2 py-1 px-4 rounded-md transition-all cursor-pointer hover:bg-gray-200"
                  activeClassName="bg-gray-200"
                >
                  <DashboardIcon />
                  <p className="font-semibold text-[#283618]">
                    User Management
                  </p>
                </NavLink>
                <NavLink
                  href=""
                  className="flex items-center gap-2 py-1 px-4 rounded-md transition-all cursor-pointer hover:bg-gray-200"
                  activeClassName="bg-gray-200"
                >
                  <DashboardIcon />
                  <p className="font-semibold text-[#283618]">
                    Paper Management
                  </p>
                </NavLink>
                <NavLink
                  href=""
                  className="flex items-center gap-2 py-1 px-4 rounded-md transition-all cursor-pointer hover:bg-gray-200"
                  activeClassName="bg-gray-200"
                >
                  <DashboardIcon />
                  <p className="font-semibold text-[#283618]">Messenger</p>
                </NavLink>
                <NavLink
                  href=""
                  className="flex items-center gap-2 py-1 px-4 rounded-md transition-all cursor-pointer hover:bg-gray-200"
                  activeClassName="bg-gray-200"
                >
                  <DashboardIcon />
                  <p className="font-semibold text-[#283618]">Search Paper</p>
                </NavLink>
              </div>
            ) : (
              // Admin Links
              <div className="space-y-2 flex-1">
                <NavLink
                  href="/admin"
                  className="flex items-center gap-2 py-1 px-4 rounded-md transition-all cursor-pointer hover:bg-gray-200"
                  activeClassName="bg-gray-200"
                >
                  <DashboardIcon />
                  <p className="font-semibold text-[#283618]">Dashboard</p>
                </NavLink>
                <NavLink
                  href="/admin/school-management"
                  className="flex items-center gap-2 py-1 px-4 rounded-md transition-all cursor-pointer hover:bg-gray-200"
                  activeClassName="bg-gray-200"
                >
                  <DashboardIcon />
                  <p className="font-semibold text-[#283618]">
                    School Management
                  </p>
                </NavLink>
                <NavLink
                  href="/admin/user-management"
                  className="flex items-center gap-2 py-1 px-4 rounded-md transition-all cursor-pointer hover:bg-gray-200"
                  activeClassName="bg-gray-200"
                >
                  <DashboardIcon />
                  <p className="font-semibold text-[#283618]">
                    User Management
                  </p>
                </NavLink>
                <NavLink
                  href="/admin/research-management"
                  className="flex items-center gap-2 py-1 px-4 rounded-md transition-all cursor-pointer hover:bg-gray-200"
                  activeClassName="bg-gray-200"
                >
                  <DashboardIcon />
                  <p className="font-semibold text-[#283618]">
                    Research Management
                  </p>
                </NavLink>
              </div>
            )}

            {/* Footer */}
            <div className="mt-auto space-y-2">
              <div className="flex items-center gap-2 hover:bg-gray-200 cursor-pointer py-1 px-4 rounded-md transition-all">
                <DashboardIcon />
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
                    src="https://github.com/shadcn.png"
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
