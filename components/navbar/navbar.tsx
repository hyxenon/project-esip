"use client";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { FaAlignLeft } from "react-icons/fa6";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { ModeToggle } from "../ui/mode-toggle";
import { usePathname } from "next/navigation";
import ProfileIcon from "./profileIcon";

const routes = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Users",
    href: "/teacher/users",
  },
  {
    label: "Schools",
    href: "/schools",
  },
];

const Navbar = ({ session }: { session: any }) => {
  const pathname = usePathname();

  if (
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/new-verification" ||
    pathname === "/reset-password"
  ) {
    return;
  }

  return (
    <nav className="flex px-4 lg:px-12 py-6 border-b items-center">
      <Sheet>
        <SheetTrigger asChild>
          <Button className="flex lg:hidden" variant="ghost" size={"icon"}>
            <FaAlignLeft />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[300px]" side="left">
          <SheetHeader>
            <SheetTitle>MNHS E-Library</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col items-start mt-4">
            {routes.map((link, index) => (
              <Button variant="link" key={index}>
                <Link href={link.href}>{link.label}</Link>
              </Button>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      <div>
        <Button variant="ghost">
          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
            MNHS E-Library
          </h3>
        </Button>
      </div>
      <div className="hidden lg:flex">
        {routes.map((link, index) => (
          <Link key={index} href={link.href}>
            <Button variant="link">{link.label}</Button>
          </Link>
        ))}
      </div>
      <div className="ml-auto flex items-center space-x-4">
        <ModeToggle />
        {session == null ? (
          <Link href={"/login"}>
            <Button>Login</Button>
          </Link>
        ) : (
          <ProfileIcon profileImg={session.user.image} />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
