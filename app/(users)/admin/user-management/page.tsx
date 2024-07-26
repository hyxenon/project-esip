"use client";
import { useEffect, useState } from "react";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { FaAlignLeft } from "react-icons/fa6";
import MobileMenu from "@/components/(users)/admin/mobileMenu";
import TotalStudents from "@/components/(users)/admin/user-management/cards/TotalStudents";
import TotalTeachers from "@/components/(users)/admin/user-management/cards/TotalTeachers";
import UserTabs from "@/components/(users)/admin/user-management/UserTabs";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { getSchools } from "@/actions/schoolManagement";
import { useUserManagementContext } from "@/context/UserManagementContext";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";

interface SchoolModel {
  label: string;
  value: string;
  image: string | null;
  id: string;
}

const UserManagement = () => {
  const { state, dispatch } = useUserManagementContext();
  const [schools, setSchools] = useState<SchoolModel[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState<SchoolModel | null>(
    null
  );
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    const fetchSchool = async () => {
      try {
        const res = await getSchools();
        const formattedSchools = res.message.map((school) => ({
          label: school.schoolName,
          value: school.schoolName,
          image: school.image,
          id: school.id,
        }));
        setSchools([
          { label: "All School", value: "All", image: null, id: "all" },
          ...formattedSchools,
        ]);
      } catch (error) {
        console.error("Error fetching schools:", error);
        // Handle error state if needed
      }
    };

    fetchSchool();
  }, []);

  useEffect(() => {
    if (selectedSchool) {
      dispatch({ type: "SET_SELECTED_SCHOOL", payload: selectedSchool.id });
    }
  }, [selectedSchool, dispatch]);

  return (
    <div className="w-full h-screen px-4 md:px-8 py-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button className="flex lg:hidden mb-4" variant="ghost" size={"icon"}>
            <FaAlignLeft />
          </Button>
        </SheetTrigger>
        <MobileMenu />
      </Sheet>

      {/* Card Count */}
      <div className="flex gap-4 flex-wrap">
        <TotalTeachers />
        <TotalStudents />
      </div>

      <div className="flex items-center space-x-4 mt-4">
        <p className="text-sm text-muted-foreground">School</p>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="justify-start">
              {selectedSchool ? (
                <>
                  <div className="flex gap-1">
                    <Image
                      src={
                        selectedSchool.image === null
                          ? "https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1721383200&semt=sph"
                          : selectedSchool.image
                      }
                      alt="logo"
                      width={20}
                      height={10}
                    />{" "}
                    {selectedSchool.label}
                  </div>
                </>
              ) : (
                <>
                  <div className="flex gap-1">
                    <Image
                      src={
                        "https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1721383200&semt=sph"
                      }
                      alt="logo"
                      width={20}
                      height={10}
                    />{" "}
                    All School
                  </div>
                </>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            side={isDesktop ? "right" : "bottom"}
            className="p-0"
            align="start"
          >
            <Command>
              <CommandInput placeholder="Find School..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {schools.map((school) => (
                    <CommandItem
                      key={school.value}
                      value={school.value}
                      onSelect={(value) => {
                        setSelectedSchool(
                          schools.find(
                            (priority) => priority.value === value
                          ) || null
                        );
                        setOpen(false);
                      }}
                    >
                      <div className="flex gap-4">
                        <Image
                          alt="logo"
                          src={
                            school.image === null
                              ? "https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1721383200&semt=sph"
                              : school.image
                          }
                          width={20}
                          height={10}
                        />
                        {school.label}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Tabs */}
      <div className="flex gap-8 mt-8">
        <UserTabs selectedSchool={selectedSchool} />
      </div>
    </div>
  );
};

export default UserManagement;
