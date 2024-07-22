"use client";
import React from "react";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { FaAlignLeft } from "react-icons/fa6";
import MobileMenu from "@/components/(users)/admin/mobileMenu";

const UserManagement = () => {
  return (
    <div>
      {" "}
      <Sheet>
        <SheetTrigger asChild>
          <Button className="flex lg:hidden mb-4" variant="ghost" size={"icon"}>
            <FaAlignLeft />
          </Button>
        </SheetTrigger>
        <MobileMenu />
      </Sheet>
    </div>
  );
};

export default UserManagement;
