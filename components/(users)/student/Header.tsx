import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = ({ children, className }: HeaderProps) => {
  return (
    <div className="min-h-[92px] mt-2 flex-nowrap text-black flex w-full items-center justify-between gap-2 px-4">
      <div className="md:flex-1">
        <Image
          src={"/assets/icons/logo.svg"}
          alt="Logo"
          width={120}
          height={32}
          className="hidden"
        />
        <Image
          src={"/assets/icons/logo-icon.svg"}
          alt="Logo"
          width={32}
          height={32}
          className="hidden"
        />
      </div>
      {children}
    </div>
  );
};

export default Header;
