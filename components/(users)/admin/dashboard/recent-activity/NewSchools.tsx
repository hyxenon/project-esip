"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const NewSchools = () => {
  return (
    <Card className="border-[#B0B0B0]">
      <CardHeader>
        <CardTitle>Recent Schools</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
        <div className="flex items-center gap-4">
          <Avatar className="hidden h-9 w-9 sm:flex">
            <AvatarImage
              src="https://files.edgestore.dev/i3fk8xebtpfydpdd/publicFiles/_public/b4722228-59d2-45a7-8d83-99b9ff19382c.jfif"
              alt="Avatar"
            />
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">
              Munoz National High School
            </p>
            <p className="text-sm text-muted-foreground">mnhs@gmail.com</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Avatar className="hidden h-9 w-9 sm:flex">
            <AvatarImage
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Dr_Jose_Rizal.jpg/220px-Dr_Jose_Rizal.jpg"
              alt="Avatar"
            />
            <AvatarFallback>JL</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">
              Jose Rizal High School
            </p>
            <p className="text-sm text-muted-foreground">joserizal@gmail.com</p>
          </div>
        </div>
        <div className="flex items-center gap-4 ">
          <Avatar className="hidden h-9 w-9 sm:flex">
            <AvatarImage src="/avatars/03.png" alt="Avatar" />
            <AvatarFallback>IN</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">
              San Jose High School
            </p>
            <p className="text-sm text-muted-foreground">sjc@gmail.com</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Avatar className="hidden h-9 w-9 sm:flex">
            <AvatarImage src="/avatars/04.png" alt="Avatar" />
            <AvatarFallback>WK</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">
              Cabanatuan High School
            </p>
            <p className="text-sm text-muted-foreground">
              cabanatuan@gmail.com
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Avatar className="hidden h-9 w-9 sm:flex">
            <AvatarImage src="/avatars/05.png" alt="Avatar" />
            <AvatarFallback>SD</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">
              Talavera High School
            </p>
            <p className="text-sm text-muted-foreground">talavera@gmail.com</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewSchools;
