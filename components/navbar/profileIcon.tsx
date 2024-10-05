import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { CiLogout } from "react-icons/ci";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const ProfileIcon = () => {
  const { data: session } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage
            src={
              session?.user?.image
                ? session.user.image
                : "https://github.com/shadcn.png"
            }
            alt="@shadcn"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuLabel className="text-xs text-gray-600">
          <p>{session?.user?.name}</p>
          <p>{session?.user?.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={"/profile"}>
          <DropdownMenuItem className="cursor-pointer">
            Profile
          </DropdownMenuItem>
        </Link>

        <DropdownMenuItem>
          <div
            onClick={() => signOut()}
            className="flex items-center justify-between w-full cursor-pointer"
          >
            Log Out <CiLogout color="red" />
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileIcon;
