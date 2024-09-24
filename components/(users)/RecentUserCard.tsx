import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface RecentUserCardProps {
  name: string;
  image: string;
  email: string;
  createdAt: Date;
}

const RecentUserCard = ({
  name,
  image,
  email,
  createdAt,
}: RecentUserCardProps) => {
  const formattedDate = createdAt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-9 w-9 sm:flex">
        <AvatarImage src={image} alt="Avatar" />
        <AvatarFallback>{name[0]}</AvatarFallback>
      </Avatar>
      <div className="grid gap-1">
        <p className="text-sm font-medium leading-none">{name}</p>
        <p className="text-sm text-muted-foreground">{email}</p>
        <p className="text-xs text-gray-500">Joined on {formattedDate}</p>
      </div>
    </div>
  );
};

export default RecentUserCard;
