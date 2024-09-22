import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface RecentUserCardProps {
  name: string;
  image: string;
  email: string;
}

const RecentUserCard = ({ name, image, email }: RecentUserCardProps) => {
  return (
    <div className="flex items-center gap-4">
      <Avatar className="hidden h-9 w-9 sm:flex">
        <AvatarImage src={image} alt="Avatar" />
        <AvatarFallback>{name[0]}</AvatarFallback>
      </Avatar>
      <div className="grid gap-1">
        <p className="text-sm font-medium leading-none">{name}</p>
        <p className="text-sm text-muted-foreground">{email}</p>
      </div>
    </div>
  );
};

export default RecentUserCard;
