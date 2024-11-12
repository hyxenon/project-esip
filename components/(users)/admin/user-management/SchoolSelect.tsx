"use client";
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
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SchoolModel } from "../school-management/SchoolForm";
import { useRouter } from "next/navigation";

interface SchoolModelSelect {
  label: string;
  value: string;
  image: string | null;
  id: string;
}

interface SchoolSelectProps {
  schoolsData: SchoolModel[];
  managementType: string;
}

const SchoolSelect = ({ schoolsData, managementType }: SchoolSelectProps) => {
  const [open, setOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] =
    useState<SchoolModelSelect | null>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const router = useRouter();
  const [schools, setSchools] = useState<SchoolModelSelect[]>([]);

  useEffect(() => {
    if (selectedSchool) {
      if (selectedSchool.id === "all") {
        if (managementType === "user") {
          router.push(`/admin/user-management`);
        } else {
          router.push(`/admin/research-management`);
        }
      } else {
        if (managementType === "user") {
          router.push(`/admin/user-management?id=${selectedSchool.id}`);
        } else {
          router.push(`/admin/research-management?id=${selectedSchool.id}`);
        }
      }
    }
  }, [selectedSchool, router, managementType]);

  useEffect(() => {
    const fetchSchool = async () => {
      try {
        const formattedSchools = schoolsData.map((school) => ({
          label: school.schoolName,
          value: school.schoolName,
          image: school.image,
          id: school.id,
        }));
        setSchools([
          { label: "All School", value: "All School", image: null, id: "all" },
          ...formattedSchools,
        ]);
      } catch (error) {
        console.error("Error fetching schools:", error);
      }
    };

    fetchSchool();
  }, [schoolsData]);

  return (
    <div className="flex items-center space-x-4 mt-4">
      <p className="text-sm text-muted-foreground">School</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          asChild
          className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
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
                        schools.find((priority) => priority.value === value) ||
                          null
                      );
                      setOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-4">
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
  );
};

export default SchoolSelect;
