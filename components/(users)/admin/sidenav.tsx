"use client";
import Image from "next/image";
import logo from "../../../assets/authForm/authLogo.svg";
import { DashboardIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NavLink from "@/components/navbar/NavLink";
import { signOut, useSession } from "next-auth/react";

const SideNav = () => {
  const { data: session } = useSession();

  return (
    <div className="hidden lg:flex flex-col items-center px-4 py-2 border-r-2 border-gray-200 shadow-2xl">
      <div className="flex items-center">
        <Image src={logo} alt="logo" className="w-[80px]" />
        <p className="text-xl font-bold">
          <span className="text-[#293618]">PROJECT</span>{" "}
          <span className="text-[#BC6C25]">E-SIP</span>
        </p>
      </div>
      {/* Nav Links */}
      <div className="flex flex-col w-full mt-4 h-full">
        {/* Links */}
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
            <p className="font-semibold text-[#283618]">School Management</p>
          </NavLink>
          <NavLink
            href="/admin/user-management"
            className="flex items-center gap-2 py-1 px-4 rounded-md transition-all cursor-pointer hover:bg-gray-200"
            activeClassName="bg-gray-200"
          >
            <DashboardIcon />
            <p className="font-semibold text-[#283618]">User Management</p>
          </NavLink>
          <NavLink
            href="/admin/research-management"
            className="flex items-center gap-2 py-1 px-4 rounded-md transition-all cursor-pointer hover:bg-gray-200"
            activeClassName="bg-gray-200"
          >
            <DashboardIcon />
            <p className="font-semibold text-[#283618]">Research Management</p>
          </NavLink>
        </div>
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
            <div className="flex flex-col">
              <p>{session?.user?.name}</p>
              <p>{session?.user?.email}</p>
              <p>{session?.user?.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
