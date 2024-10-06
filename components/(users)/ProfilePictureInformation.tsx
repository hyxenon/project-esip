"use client";
import { Button } from "../ui/button";
import { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { SingleImageDropzone } from "./admin/school-management/SingleImageDropzone";
import { Progress } from "../ui/progress";
import { useToast } from "../ui/use-toast";
import { changeProfilePicture } from "@/actions/userManagement";
import { Session } from "next-auth";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarImage } from "../ui/avatar";

interface ProfilePictureInformationProps {
  imgURL: string;
  session: Session;
}

const ProfilePictureInformation = ({
  imgURL,
  session,
}: ProfilePictureInformationProps) => {
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();
  const [progress, setProgress] = useState<number>(0);
  const [isProfilePictureChange, setIsProfilePictureChange] =
    useState<boolean>(false);
  const { toast } = useToast();

  return (
    <div className="space-y-2 flex flex-col items-center">
      {!isProfilePictureChange ? (
        <Avatar>
          <AvatarImage
            className="h-28 w-28 rounded-full"
            src={
              imgURL
                ? imgURL
                : `https://api.dicebear.com/6.x/initials/svg?seed=${session.user?.name}`
            }
          />
        </Avatar>
      ) : (
        <>
          <SingleImageDropzone
            width={100}
            height={100}
            value={file}
            onChange={(file) => {
              setFile(file);
            }}
          />
          <Progress value={progress} className="w-[200px] mt-2" />
          <p className="text-sm ">{progress}%</p>
          <Button
            variant={"outline"}
            size={"sm"}
            className="mt-2 hover:bg-[#606C38] hover:text-white"
            type="button"
            onClick={async () => {
              if (file) {
                const res = await edgestore.publicFiles.upload({
                  file,
                  options: {
                    temporary: true,
                  },
                  onProgressChange: (progressData) => {
                    setProgress(progressData);
                  },
                });

                const lastUrl = await changeProfilePicture(
                  session.user?.id!,
                  res.url
                );

                if (lastUrl) {
                  await edgestore.publicFiles.delete({
                    url: lastUrl,
                  });
                }

                setIsProfilePictureChange(false);
                toast({
                  title: "Image Uploaded Successfully!",
                });
              }
            }}
          >
            Upload
          </Button>
        </>
      )}
      {!isProfilePictureChange ? (
        <Button
          onClick={() => setIsProfilePictureChange(true)}
          size={"sm"}
          variant={"outline"}
        >
          Change Profile Picture
        </Button>
      ) : (
        <Button
          onClick={() => setIsProfilePictureChange(false)}
          size={"sm"}
          variant={"outline"}
        >
          Cancel
        </Button>
      )}
    </div>
  );
};

export default ProfilePictureInformation;
