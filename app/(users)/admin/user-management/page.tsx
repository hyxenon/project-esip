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
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { getSchools } from "@/actions/schoolManagement";
import { CaretSortIcon } from "@radix-ui/react-icons";

interface SchoolModel {
  label: string;
  value: string;
  image: string | null;
}

const UserManagement = () => {
  const [schools, setSchools] = useState<SchoolModel[]>([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    const fetchSchool = async () => {
      try {
        const res = await getSchools();
        const formattedSchools = res.message.map((school) => ({
          label: school.schoolName,
          value: school.id,
          image: school.image,
        }));
        setSchools(formattedSchools);
      } catch (error) {
        console.error("Error fetching schools:", error);
        // Handle error state if needed
      }
    };

    fetchSchool();
  }, []);

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

      {schools && (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="justify-between"
            >
              {value
                ? schools.find((school) => school.value === value)?.label
                : "Select school..."}
              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className=" p-0">
            <Command>
              <CommandList>
                <CommandInput placeholder="Search school..." className="h-9" />
                <CommandEmpty>No school found.</CommandEmpty>
                <CommandGroup>
                  {schools.map((school) => (
                    <CommandItem
                      key={school.value}
                      value={school.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
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
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          value === school.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      )}

      {/* Tabs */}
      <div className="flex gap-8 mt-8">
        <UserTabs />
      </div>
    </div>
  );
};

export default UserManagement;
