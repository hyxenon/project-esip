"use client";
import { FaSchool, FaUser } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { GiArchiveResearch } from "react-icons/gi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NavLink from "@/components/navbar/NavLink";
import { signOut, useSession } from "next-auth/react";
import { CiLogout } from "react-icons/ci";
import Link from "next/link";

interface SideNavProps {
  role?: string;
}

const SideNav = ({ role }: SideNavProps) => {
  return (
    <div className="hidden lg:flex flex-col items-center px-4 bg-[#283618] py-2">
      <div className="flex items-center mb-6 mt-6">
        {/* <Image src={logo} alt="logo" className="w-[80px]" /> */}
        <p className="text-xl font-bold">
          <span className="text-[#FEFAE0]">PROJECT</span>{" "}
          <span className="text-[#DDA15E]">E-SIP</span>
        </p>
      </div>
      {/* Nav Links */}
      <div className="flex flex-col w-full h-full">
        {/* Links */}

        {/* ADMIN LINKS */}
        {role === "ADMIN" && (
          <div className="space-y-4 mt-4 flex-1">
            <NavLink
              href="/admin"
              className="flex items-center gap-2 py-1 px-2 rounded-md transition-all cursor-pointer hover:underline"
              activeClassName="bg-[#FEFAE0] text-[#283618]"
            >
              <MdDashboard className="" />
              <p className="font-semibold ">Dashboard</p>
            </NavLink>
            <NavLink
              href="/admin/school-management"
              className="flex items-center gap-2 py-1 px-2 rounded-md cursor-pointer hover:underline transition-all"
              activeClassName="bg-[#FEFAE0] text-[#283618]"
            >
              <FaSchool className="" />
              <p className="font-semibold">School Management</p>
            </NavLink>
            <NavLink
              href="/admin/user-management"
              className="flex items-center gap-2 py-1 px-2 rounded-md transition-all cursor-pointer hover:underline"
              activeClassName="bg-[#FEFAE0] text-[#283618]"
            >
              <FaUser className="" />
              <p className="font-semibold">User Management</p>
            </NavLink>
            <NavLink
              href="/admin/research-management"
              className="flex items-center gap-2 py-1 px-2 rounded-md transition-all cursor-pointer hover:underline"
              activeClassName="bg-[#FEFAE0] text-[#283618]"
            >
              <GiArchiveResearch className="" />
              <p className="font-semibold">Research Management</p>
            </NavLink>
          </div>
        )}

        {/* Footer */}
        <div className="mt-auto space-y-2 w-full">
          <div
            className="flex items-center gap-2  cursor-pointer py-1 px-4 rounded-md transition-all  text-[#FEFAE0] hover:underline"
            onClick={() => signOut()}
          >
            <CiLogout />
            <p className="font-semibold ">Log out</p>
          </div>
          <UserInformation />
        </div>
      </div>
    </div>
  );
};

export const UserInformation = () => {
  const { data: session } = useSession();

  return (
    <Link href={"/profile"}>
      <div className="flex items-center gap-3 p-2 rounded-md cursor-pointer">
        <Avatar className="w-10 h-10">
          <AvatarImage
            src={
              session?.user?.image ||
              `https://api.dicebear.com/6.x/initials/svg?seed=${session?.user?.name}`
            }
            alt={session?.user?.name || "User Avatar"}
          />
          <AvatarFallback>
            {session?.user?.name?.charAt(0) || "U"}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="text-sm font-semibold text-[#FEFAE0]">
            {session?.user?.name}
          </p>
          <p className="text-xs font-light text-[#FEFAE0]">
            {session?.user?.email}
          </p>
          <p className="text-xs font-light text-[#FEFAE0]">
            {session?.user?.role
              ?.toLowerCase()
              .replace(/^\w/, (c) => c.toUpperCase())}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default SideNav;
