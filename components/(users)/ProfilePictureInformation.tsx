"use client";

import Image from "next/image";
import { Button } from "../ui/button";

interface ProfilePictureInformationProps {
  imgURL: string;
}

const ProfilePictureInformation = ({
  imgURL,
}: ProfilePictureInformationProps) => {
  return (
    <div className="space-y-2 flex flex-col items-center">
      <Image
        src={imgURL}
        alt="profile picture"
        width={60}
        height={60}
        className="rounded-full"
      />
      <Button size={"sm"} variant={"outline"}>
        Change Profile Picture
      </Button>
    </div>
  );
};

export default ProfilePictureInformation;
