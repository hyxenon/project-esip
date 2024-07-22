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
    <div className="hidden lg:flex flex-col items-center px-2 py-2 border-r-2 border-gray-200 shadow-2xl">
      <div className="flex items-center mb-6">
        <Image src={logo} alt="logo" className="w-[80px]" />
        <p className="text-xl font-bold">
          <span className="text-[#293618]">PROJECT</span>{" "}
          <span className="text-[#BC6C25]">E-SIP</span>
        </p>
      </div>
      {/* Nav Links */}
      <div className="flex flex-col w-full h-full">
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
        <div className="mt-auto space-y-2 w-full">
          <div
            className="flex items-center gap-2 hover:bg-gray-200 cursor-pointer py-1 px-4 rounded-md transition-all"
            onClick={() => signOut()}
          >
            <DashboardIcon />
            <p className="font-semibold text-[#283618]">Log out</p>
          </div>
          <UserInformation />
        </div>
      </div>
    </div>
  );
};

const UserInformation = () => {
  const { data: session } = useSession();

  return (
    <div className="flex items-center gap-3 p-2 rounded-md transition-all hover:bg-gray-200 cursor-pointer">
      <Avatar className="w-10 h-10">
        <AvatarImage
          src={session?.user?.image || "https://github.com/shadcn.png"}
          alt={session?.user?.name || "User Avatar"}
        />
        <AvatarFallback>{session?.user?.name?.charAt(0) || "U"}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <p className="text-sm font-semibold text-[#283618]">
          {session?.user?.name}
        </p>
        <p className="text-xs text-gray-600">{session?.user?.email}</p>
        <p className="text-xs text-gray-500">
          {session?.user?.role
            ?.toLowerCase()
            .replace(/^\w/, (c) => c.toUpperCase())}
        </p>
      </div>
    </div>
  );
};

export default SideNav;
